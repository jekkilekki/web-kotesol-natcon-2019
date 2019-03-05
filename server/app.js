const express = require( 'express' );
const http = require('http');
const reload = require( 'reload' );
const path = require( 'path' ); // from Node.js
const createError = require( 'http-errors' );
const bodyParser = require( 'body-parser' );
const routes = require( './routes' );
const configs = require( './config' );
const db = require('./lib/db');
const SpeakerService = require( './services/SpeakerService' );
const FeedbackService = require( './services/FeedbackService' );
const app = express();

const config = configs[app.get('env')];
const speakerService = new SpeakerService(config.data.speakers);
const feedbackService = new FeedbackService(config.data.feedback);

app.set( 'port', process.env.PORT || 3000 );

// Using Pug to create our Template files now (Express default)
app.set( 'view engine', 'pug' );
if ( app.get( 'env' ) === 'development' ) {
  app.locals.pretty = true; // make non-minimized HTML from Pug
}
app.set( 'views', path.join( __dirname, './views' ) );


app.locals.siteTitle = config.sitename;
// app.locals.allSpeakers = dataFile.speakers;

app.use((req, res, next) => {
  res.locals.renderTime = new Date();
  return next();
})
app.use( express.static( 'public' ) );
app.get( '/favicon.ico', (req, res, next) => {
  return res.sendStatus(204);
});

// Call this Middleware after static so it doesn't run for each static file like CSS
app.use(bodyParser.urlencoded({extended: true}));
app.use(async(req, res, next) => {
  try {
    const names = await speakerService.getSpeakersNames();
    // console.log(names);
    res.locals.speakerNames = names;

    const speakers = await speakerService.getSpeakersFullList();
    res.locals.speakers = speakers;

    return next();
  } catch(err) {
    return next(err);
  }
})

// Setup Routes
app.use( '/', routes({
  speakerService,
  feedbackService
}) );
app.use(( req, res, next ) => {
  return next( createError( 404, 'File not found' ) );
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status);
  return res.render('notfound');
});

const server = http.createServer(app);

// Connect to MongoDB
db.connect(config.database.dsn)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(port);
  })
  .catch((err) => {
    console.error(err);
  });

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});

app.listen( app.get( 'port' ), function() {
  console.log( 'Listening on port ' + app.get( 'port' ) ); 
});

reload( app );

module.export = app;
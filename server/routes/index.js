const express = require( 'express' );
const router = express.Router();

const speakersRoute = require( './speakers' );
const scheduleRoute = require( './schedule' );
const locationRoute = require( './location' );
const sponsorsRoute = require( './sponsors' );
const feedbackRoute = require( './feedback' );
const ticketsRoute = require( './tickets' );
const teamRoute = require( './team' );
const conductRoute = require( './conduct' );
const privacyRoute = require( './privacy' );
const chatRoute = require( './chat' );

module.exports = (param) => {

  const { speakerService } = param;

  router.get( '/', async (req, res, next ) => {
    try {
      const promises = [];
      promises.push(speakerService.getPlenaryDetails());
      promises.push(speakerService.getSpeakersShortList());
      promises.push(speakerService.getSpeakersFullList());

      const results = await Promise.all(promises);

      return res.render('index', {
        page: 'Home',
        pageId: 'home',
        plenary: results[0],
        speakerslist: results[1],
        speakersfull: results[2]
      });
    } catch(err) {
      return next(err);
    }
  });

  router.use( '/speakers', speakersRoute(param) );
  router.use( '/schedule', scheduleRoute(param) );
  router.use( '/location', locationRoute(param) );
  router.use( '/sponsors', sponsorsRoute(param) );
  router.use( '/feedback', feedbackRoute(param) );
  router.use( '/tickets', ticketsRoute(param) );
  router.use( '/team', teamRoute(param) );
  router.use( '/code-of-conduct', conductRoute(param) );
  router.use( '/privacy', privacyRoute(param) );
  router.use( '/chat', chatRoute(param) );

  return router;
}
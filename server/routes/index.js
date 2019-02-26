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
const chatRoute = require( './chat' );

module.exports = () => {
  router.get( '/', (req, res, next ) => {
    return res.render('index');
  });

  router.use( '/speakers', speakersRoute() );
  router.use( '/schedule', scheduleRoute() );
  router.use( '/location', locationRoute() );
  router.use( '/sponsors', sponsorsRoute() );
  router.use( '/feedback', feedbackRoute() );
  router.use( '/tickets', ticketsRoute() );
  router.use( '/team', teamRoute() );
  router.use( '/code-of-conduct', conductRoute() );
  router.use( '/chat', chatRoute() );

  return router;
}
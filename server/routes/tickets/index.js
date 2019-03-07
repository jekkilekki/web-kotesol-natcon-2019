const express = require( 'express' );
const router = express.Router();

module.exports = () => {
  router.get( '/', (req, res, next ) => {
    return res.render( 'tickets', {
      page: 'Tickets',
      pageId: 'tickets'
    });
  });

  return router;
}
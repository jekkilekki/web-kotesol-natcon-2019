const express = require( 'express' );
const router = express.Router();

module.exports = () => {
  router.get( '/', (req, res, next ) => {
    return res.render( 'privacy', {
      page: 'Privacy Policy',
      pageId: 'privacy'
    });
  });

  return router;
}
const express = require( 'express' );
const router = express.Router();

module.exports = (param) => {

  const { dataService } = param;

  router.get( '/', async (req, res, next ) => {
    try {
      const promises = [];
      promises.push(dataService.getTeam());

      const results = await Promise.all(promises);

      return res.render( 'team', {
        page: 'Team',
        pageId: 'team',
        team: results[0]
      });
    } catch(err) {
      return next(err);
    }
  });

  return router;
}
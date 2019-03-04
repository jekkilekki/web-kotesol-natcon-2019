const express = require( 'express' );
const router = express.Router();

module.exports = (param) => {

  const { speakerService } = param;

  router.get( '/', async (req, res, next ) => {
    try {
      const promises = [];
      promises.push(speakerService.getSpeakersShortList());
      promises.push(speakerService.getSpeakersFullList());

      const results = await Promise.all(promises);

      return res.render( 'speakers', {
        page: 'All Speakers',
        speakerslist: results[0],
        speakersfull: results[1]
      });
    } catch(err) {
      return next(err);
    }
  });

  router.get( '/:name', async (req, res, next) => {
    try {
      const promises = [];
      promises.push(speakerService.getSpeakerDetails(req.params.name));

      const results = await Promise.all(promises);

      if( ! results[0] ) {
        return next();
      }

      return res.render( 'speaker-single', {
        page: req.params.name,
        speaker: results[0]
      });
    } catch(err) {
      return next(err);
    }
  });

  return router;
}
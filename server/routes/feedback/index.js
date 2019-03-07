const express = require( 'express' );
const router = express.Router();

module.exports = (param) => {

  const { feedbackService } = param;

  router.get( '/', async (req, res, next) => {
    try {
      const feedbacklist = await feedbackService.getAllFeedback();
      return res.render( 'feedback', {
        page: 'Leave Your Feedback',
        pageId: 'feedback',
        feedbacklist,
        success: req.query.success
      });
    } catch(err) {
      return next(err);
    }
  });

  router.post( '/', async (req, res, next) => {
    try {
      const fbName = req.body.fbName.trim();
      const fbTitle = req.body.fbTitle.trim();
      const fbMsg = req.body.fbMsg.trim();
      const feedbacklist = await feedbackService.getAllFeedback();

      if( !fbName || !fbTitle || !fbMsg ) {
        return res.render( 'feedback', {
          page: 'Leave Your Feedback',
          pageId: 'feedback',
          error: true,
          fbName,
          fbTitle,
          fbMsg,
          feedbacklist
        });
      }
      await feedbackService.addFeedback(fbName, fbTitle, fbMsg);
      return res.redirect('/feedback?success=true');
    } catch(err) {
      return next(err);
    }
  });

  return router;
}
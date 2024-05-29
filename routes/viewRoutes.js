const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.post('/:currency', viewsController.setCurrency);

router.use(viewsController.getCurrency);
//router.post('/upload', viewsController.uploadImages);

router.get('/', viewsController.getOverview);
router.get('/search', viewsController.getSearch);
router.get('/q&a', viewsController.getQAndA);
router.get('/invest', viewsController.getInvest);
router.get('/about', viewsController.getAbout);
router.get('/blog', viewsController.getBlog);
router.get('/calendly', viewsController.getCalendly);
router.get('/pricing', viewsController.getPricing);
router.get('/privacy', viewsController.getPrivacy);
router.get('/terms-of-service', viewsController.getTermsOfService);
router.get('/site-map', viewsController.getSiteMap);

module.exports = router;

const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/search', viewsController.getSearch);
router.get('/q&a', viewsController.getQAndA);
router.get('/invest', viewsController.getInvest);
router.get('/about', viewsController.getAbout);
router.get('/blog', viewsController.getBlog);
router.get('/calendly', viewsController.getCalendly);
router.get('/contact-us-confirm', viewsController.getContactUsConfirm);
router.get('/pricing', viewsController.getPricing);
router.get('/privacy', viewsController.getPrivacy);
router.get('/terms-of-service', viewsController.getTermsOfService);
router.get('/site-map', viewsController.getSiteMap);

// Route to serve sitemap.xml
router.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, '../sitemap.xml'));
});

// Route to serve robots.txt
router.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../robots.txt'));
});

module.exports = router;

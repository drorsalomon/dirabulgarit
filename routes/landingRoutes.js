const express = require('express');
const landingController = require('../controllers/landingController');

const router = express.Router();

// Middleware to set `res.locals.lang` for this router
router.use((req, res, next) => {
  res.locals.lang = 'he';
  next();
});

router.get('/atlantis-aria-3', landingController.getAtlantisAria3);
router.get('/atlantis-euphoria', landingController.getAtlantisEuphoria);

module.exports = router;

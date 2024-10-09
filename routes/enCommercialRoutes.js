const express = require('express');
const commercialController = require('../controllers/commercialController');

const router = express.Router();

// Middleware to set `res.locals.lang` for this router
router.use((req, res, next) => {
  res.locals.lang = 'en';
  next();
});

router.get('/camelot-entertainment-center', commercialController.getCamelot);
router.get('/varsano-chic-apartments', commercialController.getVarsanoChic);
router.get('/samokov', commercialController.getSamokov);

module.exports = router;

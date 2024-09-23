const express = require('express');
const commercialController = require('../controllers/commercialController');

const router = express.Router();

router.get('/camelot-entertainment-center', commercialController.getCamelot);
router.get('/varsano-chic-apartments', commercialController.getVarsanoChic);
router.get('/samokov', commercialController.getSamokov);

module.exports = router;

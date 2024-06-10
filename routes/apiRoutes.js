const express = require('express');
const apiController = require('../controllers/apiController');
const currencyService = require('../services/currencyService');
//const imageService = require('../services/imageService');

const router = express.Router();

router.post('/calendly-webhook', apiController.getCalendlyLead);
router.post('/:currency', currencyService.setCurrency);
//router.post('/upload-images', imageService.uploadImages);

module.exports = router;

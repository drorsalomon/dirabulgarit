const express = require('express');
const apiController = require('../controllers/apiController');
const imageService = require('../services/imageService');

const router = express.Router();

router.post('/calendly-webhook', apiController.getCalendlyLead);
router.post('/upload-images', imageService.uploadImages);

module.exports = router;

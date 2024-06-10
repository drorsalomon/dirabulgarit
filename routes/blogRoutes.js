const express = require('express');
const blogController = require('../controllers/blogController');
const currencyService = require('../services/currencyService');

const router = express.Router();

router.use(currencyService.getCurrency);

router.get('/:slug', blogController.getBlog);

module.exports = router;

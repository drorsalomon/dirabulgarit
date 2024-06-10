const express = require('express');
const assetController = require('../controllers/assetController');
const currencyService = require('../services/currencyService');

const router = express.Router();

router.use(currencyService.getCurrency);

router.get('/search-results', assetController.renderSearchResults);
router.get('/:slug', assetController.getAsset);
router.post('/search/:sort/:type/:pageNumber/:resPerPage', assetController.getSearchResults);

module.exports = router;

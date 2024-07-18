const express = require('express');
const assetController = require('../controllers/assetController');

const router = express.Router();
console.log('enAsset Router');
router.get('/search-results', assetController.renderSearchResults);
router.get('/favorite-assets', assetController.renderFavoriteAssets);
router.get('/:slug', assetController.getAsset);
router.post('/search/:sort/:type/:pageNumber/:resPerPage', assetController.getSearchResults);
router.post('/get-favorite-assets', assetController.getFavoriteAssets);

module.exports = router;

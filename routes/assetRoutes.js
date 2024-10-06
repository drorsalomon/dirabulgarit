const express = require('express');
const path = require('path');
const assetController = require('../controllers/assetController');

const router = express.Router();

// Define a static route to serve PDFs from the 'public/pdf' directory
router.use('/pdf', express.static(path.join(__dirname, '..', 'public', 'pdf')));

router.get('/search-results', assetController.renderSearchResults);
router.get('/favorite-assets', assetController.renderFavoriteAssets);
router.get('/:slug', assetController.getAsset);
router.post('/search/:sort/:type/:pageNumber/:resPerPage', assetController.getSearchResults);
router.post('/get-favorite-assets', assetController.getFavoriteAssets);
router.post('/generate-pdf', assetController.generateAssetPDF);

module.exports = router;

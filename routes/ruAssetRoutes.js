const express = require('express');
const assetController = require('../controllers/assetController');

const router = express.Router();

// Middleware to set `res.locals.lang` for this router
router.use((req, res, next) => {
  res.locals.lang = 'ru';
  next();
});

router.get('/search-results', assetController.renderSearchResults);
router.get('/favorite-assets', assetController.renderFavoriteAssets);
router.get('/:slug', assetController.getAsset);
router.post('/search/:sort/:type/:pageNumber/:resPerPage', assetController.getSearchResults);
router.post('/get-favorite-assets', assetController.getFavoriteAssets);

module.exports = router;

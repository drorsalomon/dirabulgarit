const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

// Middleware to set `res.locals.lang` for this router
router.use((req, res, next) => {
  res.locals.lang = 'he';
  next();
});

router.get('/atlantis-aria-2', projectController.getAtlantisAria2);
router.get('/atlantis-aria-3', projectController.getAtlantisAria3);
router.get('/atlantis-euphoria', projectController.getAtlantisEuphoria);
router.get('/atlantis-barcode', projectController.getAtlantisBarcode);
router.get('/atlantis-barcode-2', projectController.getAtlantisBarcode2);
router.get('/atlas-azimuth', projectController.getAtlasAzimuth);

module.exports = router;

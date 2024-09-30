const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/atlantis-aria-2', projectController.getAtlantisAria2);
router.get('/atlantis-aria-3', projectController.getAtlantisAria3);
router.get('/atlantis-euphoria', projectController.getAtlantisEuphoria);
router.get('/atlantis-barcode', projectController.getAtlantisBarcode);
router.get('/atlas-azimuth', projectController.getAtlasAzimuth);

module.exports = router;

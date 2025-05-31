const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

// Middleware to set `res.locals.lang` for this router
router.use((req, res, next) => {
  res.locals.lang = 'he';
  next();
});

// router.get('/atlantis-aria-2', projectController.getAtlantisAria2);
// router.get('/atlantis-aria-3', projectController.getAtlantisAria3);
// router.get('/atlantis-euphoria', projectController.getAtlantisEuphoria);
// router.get('/atlantis-barcode', projectController.getAtlantisBarcode);
// router.get('/atlantis-barcode-2', projectController.getAtlantisBarcode2);
// router.get('/villa-margarita', projectController.getVillaMargarita);
// router.get('/mellia-florance', projectController.getMelliaFlorance);
// router.get('/mountain-view-residence', projectController.getMountainResidence);
// router.get('/vitosha-mountain-view', projectController.getMountainView);
// router.get('/mountain-view-boutique', projectController.getMountainBoutique);
router.get('/atlas-azimuth', projectController.getAtlasAzimuth);
router.get('/fort-noks-premier-suites', projectController.getFortNoksSuites);
router.get('/green-fort-suites', projectController.getGreenFortSuites);
router.get('/premier-fort-beach', projectController.getPremierFortBeach);
router.get('/prestige-fort-beach', projectController.getPrestigeFortBeach);
router.get('/nessebar-fort-residence', projectController.getNessebarFortResidence);
router.get('/enkibuild-lighthouse', projectController.getEnkibuildLighthouse);
router.get('/sinemorets-villas', projectController.getSinemoretsVillas);

module.exports = router;

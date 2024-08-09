const express = require('express');
const landingController = require('../controllers/landingController');

const router = express.Router();

router.get('/atlantis-aria-3', landingController.getAtlantisAria3);
router.get('/atlantis-euphoria', landingController.getAtlantisEuphoria);

module.exports = router;

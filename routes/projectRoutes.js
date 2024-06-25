const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/atlantis-aria-3', projectController.getAtlantisAria3);
router.get('/atlantis-euphoria', projectController.getAtlantisEuphoria);

module.exports = router;

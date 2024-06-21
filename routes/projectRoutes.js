const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/atlantis-aria-3', projectController.getAtlantisAria3);

module.exports = router;

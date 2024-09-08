const express = require('express');
const commercialController = require('../controllers/commercialController');

const router = express.Router();

router.get('/camelot-entertainment-center', commercialController.getCamelot);

module.exports = router;

const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/:slug', blogController.getBlog);

module.exports = router;

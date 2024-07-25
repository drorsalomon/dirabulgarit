const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.post('/get-blogs/:pageNumber/:resPerPage', blogController.getBlogs);
router.get('/', blogController.renderBlogs);
router.get('/:slug', blogController.getBlog);

module.exports = router;

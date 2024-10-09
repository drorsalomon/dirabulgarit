const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// Middleware to set `res.locals.lang` for this router
router.use((req, res, next) => {
  res.locals.lang = 'he';
  next();
});

router.post('/get-blogs/:pageNumber/:resPerPage', blogController.getBlogs);
router.get('/', blogController.renderBlogs);
router.get('/:slug', blogController.getBlog);

module.exports = router;

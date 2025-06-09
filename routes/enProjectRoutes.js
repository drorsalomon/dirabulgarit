const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

// Middleware to set `res.locals.lang` for this router
router.use((req, res, next) => {
  res.locals.lang = 'en';
  next();
});

router.get('/:slug', projectController.getProjectBySlug);

module.exports = router;

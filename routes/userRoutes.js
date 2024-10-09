const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Middleware to set `res.locals.lang` for this router
router.use((req, res, next) => {
  res.locals.lang = 'he';
  next();
});

router.post('/webinar-registration/:userName/:userPhone/:userEmail/:userIsSubscribed', userController.webinarRegisterUser);
router.get('/webinar-registered', userController.webinarRegistered);

module.exports = router;

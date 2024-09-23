const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/webinar-registration/:userName/:userPhone/:userEmail/:userIsSubscribed', userController.webinarRegisterUser);
router.get('/webinar-registered', userController.webinarRegistered);

module.exports = router;

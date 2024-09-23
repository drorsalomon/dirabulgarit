const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Utils = require('../utils/utils');
const Email = require('../utils/email');

exports.webinarRegisterUser = catchAsync(async (req, res, next) => {
  try {
    const user = {
      name: req.params.userName,
      phone: req.params.userPhone,
      email: req.params.userEmail,
      subscribed: req.params.userIsSubscribed,
    };

    await User.create(user);

    await new Email(user).sendWebinarWelcome();

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Clean the error message by extracting just the validation message
      const messages = Object.values(error.errors).map((err) => err.message);
      const cleanedMessage = messages.join('. ');

      res.status(400).json({
        status: 'error',
        message: cleanedMessage,
      });
    } else if (error.code === 11000) {
      res.status(400).json({
        status: 'error',
        message: 'מספר הטלפון או כתובת האימייל כבר רשומים במערכת',
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'לא ניתן כרגע לבצע את הפעולה',
      });
    }
  }
});

exports.webinarRegistered = catchAsync(async (req, res) => {
  res.status(200).render(`${res.locals.lang}/webinarConfirm`, {
    title: 'Camelot Entertainment Center',
  });
});

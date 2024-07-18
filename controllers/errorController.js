const AppError = require('../utils/appError');

const sendErrorDev = (err, req, res) => {
  console.error('ERROR 💥', err);
  console.log(err.message);
  console.log(err.name);
  return res.status(err.statusCode).render(`${res.locals.lang}/error`, {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // If the error is operational (caused by the app logic)... the 'isOperational' variable is specified in the appError class
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // If the error is a bug in the app we want to log the error for review and send the user a generic message
  // Send generic message
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render(`${res.locals.lang}/error`, {
    title: 'Something went wrong!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // If we are in development mode get as much info about the error
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
    // If we are in production mode only partially expose some info to the user about the error
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'MongoError' && err.message.includes('email_1 dup key:')) err = handleEmailExistsError();
    sendErrorProd(err, req, res);
  }
};

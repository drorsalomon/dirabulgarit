const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'יש להכניס שם'],
    trim: true,
    maxlength: [150, 'An user name must have less or equal then 150 characters'],
  },
  phone: {
    type: String,
    required: [true, 'יש להכניס מספר טלפון'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'יש להכניס אימייל'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'אנא הכניסו כתובת אימייל תקינה'], // Validator form correct email pattern.
  },
  subscribed: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

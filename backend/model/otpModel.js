const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 40,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  /*
    otp:{
        type: String,
        required: true
    },
    */
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, // 120 giây = 2 phút
  },
});
const Otps = mongoose.model('otps', otpSchema);
module.exports = Otps;

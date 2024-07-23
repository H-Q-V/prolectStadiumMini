const mongoose = require("mongoose");
const otpForgotSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 40,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    
    otp:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 180  // 180 giây = 3 phút
    }
});
const OtpForgot = mongoose.model('otpForgot', otpForgotSchema);
module.exports = OtpForgot;
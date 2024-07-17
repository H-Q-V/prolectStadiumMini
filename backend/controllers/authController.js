const Customer = require("../model/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Otps = require('../model/otpModel.js');
const randomstring = require('randomstring');
const sendEmail = require('../utils/sendEmail');
require("dotenv").config();
let refreshTokens = [];
function generateOTP() {
  return randomstring.generate({
      length: 6,
      charset: 'numeric'
  });
}
const authController = {
  
  //register
  registerCustomer: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const otp = generateOTP();
      if (username.length < 6) {
        return res.status(400).json({ success: false,message: "Tên tối thiểu 6 ký tự" });
      }

      // Check password length
      if (password.length < 8) {
        return res.status(400).json({ success: false,message: "Mật khẩu tối thiểu 8 ký tự" });
      }

      // Check email format
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false,message: "Email nhập sai" });
      }
      
      // create new customer
      const newCustomer = await new Customer({
        username: username,
        email: email,
        password: hashed,
       // otp:otp,
      });
      const customer = await newCustomer.save();

      // Generate and send OTP
      const newOTP = new Otps({ email: email, otp });
      await newOTP.save();
      await sendEmail({
        to: email,
        subject: 'Your OTP',
        message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      });
      res.status(200).json({ message: "Customer registered successfully. OTP sent to email." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GENERATE ACCESS TOKEN
  generateAccessToken: (customer) => {
    return jwt.sign(
      {
        id: customer.id,
        admin: customer.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" }
    );
  },
  //GENERATE REFRESH TOKEN
  generateRefreshToken: (customer) => {
    return jwt.sign(
      {
        id: customer.id,
        admin: customer.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "360d" }
    );
  },

  // login
  loginCustomer: async (req, res) => {
    try {
      const customer = await Customer.findOne({ username: req.body.username });
      if (!customer) {
        return res.status(404).json("Tên người dùng không đúng");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        customer.password
      );
      if (!validPassword) {
        return res.status(404).json("Mật khẩu không đúng");
      }

      if (customer && validPassword) {
        const accessToken = authController.generateAccessToken(customer);
        const refreshToken = authController.generateRefreshToken(customer);
        refreshTokens.push(refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        const { password, ...others } = customer._doc;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      console.log("🚀 ~ loginCustomer: ~ err:", err);
      return res.status(500).json(err);
    }
  },
  // Redis
  requestRefreshToken: async (req, res) => {
    //Take refresh token from customer
    const refreshToken = req.cookies.refreshToken;
    // res.status(200).json(refreshToken);
    if (!refreshToken) return res.status(401).json("you are not authenticated");
    if (!refreshTokens.include(refreshToken)) {
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, customer) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAccessToken(customer);
      const newRefreshToken = authController.generateRefreshToken(customer);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  customerLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logged out successful");
  },
  verifyOTP: async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ success: false, error: 'Invalid email format' });
        }
        const existingOTP = await Otps.findOneAndDelete({ email, otp });
        if (existingOTP) {
            // OTP is valid
            res.status(200).json({ success: true, message: 'OTP verification successful' });
        } else {
            // OTP is invalid
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
   }
};
//STORE TOKEN
//1) LOCAL STORAGE
//XSS
//2) HTTPONLY COOKIES:
//CRSF -> SAMESITE
//3) REDUX STORE -> ACCESSTOKEN
// HTTPONLY COOKIES -> REFRESHTOKEN
module.exports = authController;

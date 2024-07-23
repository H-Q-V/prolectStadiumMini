const Customer = require("../model/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Otps = require("../model/otpModel.js");
const OtpForget = require("../model/otpForgotModel.js");
const randomstring = require("randomstring");
const sendEmail = require("../utils/sendEmail");

require("dotenv").config();
let refreshTokens = [];
function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}
const authController = {
  //register
  registerCustomer: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (username.length < 6) {
        return res
          .status(400)
          .json({ success: false, message: "Tên tối thiểu 6 ký tự" });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({ success: false, message: "Mật khẩu tối thiểu 8 ký tự" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Email nhập sai" });
      }

      const emailCustomer = await Customer.findOne({ email: email });
      if (emailCustomer) {
        return res
          .status(400)
          .json({ success: false, message: "Nhập trùng email" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const otp = generateOTP();

      // Tạo người dùng tạm thời với OTP
      const tempCustomer = new Otps({
        username: username,
        email: email,
        password: hashed,
        otp: otp,
      });
      await tempCustomer.save();

      // Gửi mã OTP qua email
      await sendEmail({
        to: email,
        subject: "Your OTP",
        message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      });

      res.status(200).json({
        message: "OTP sent to email. Please verify to complete registration.",
      });
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
      const customer = await Customer.findOne({ email: req.body.email });
      if (!customer) {
        return res.status(404).json("Email nhập không đúng");
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
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
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

  customerForgot: async (req, res) => {
    try {
      const { email } = req.body;
      const otp = generateOTP();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Nhập không đúng định dạng email" });
      }
      const emailForgot = await Customer.findOne({ email: email });
      if (!emailForgot) {
        return res
          .status(400)
          .json({ success: false, message: "Nhập email không đúng" });
      }
      const newOTP = new OtpForget({ email: email, otp });

      await newOTP.save();
      await sendEmail({
        to: email,
        subject: "Your OTP for forgotten password",
        message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      });
      res.status(200).json({
        message: "OTP sent to email. Please verify to complete registration.",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  verifyOTP: async (req, res, next) => {
    try {
      const { otp } = req.body;

      const otpCustomer = await Otps.findOne({ otp: otp });
      if (!otpCustomer) {
        return res
          .status(400)
          .json({ success: false, message: "Nhập sai Otp" });
      }
      const existingOTP = await Otps.findOneAndDelete({ otp });

      if (existingOTP) {
        const newCustomer = new Customer({
          username: existingOTP.username,
          email: existingOTP.email,
          password: existingOTP.password,
        });
        await newCustomer.save();

        res
          .status(200)
          .json({ success: true, message: "OTP verification successful" });
      } else {
        res.status(400).json({ success: false, error: "Invalid OTP" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  verifyForgotOTP: async (req, res, next) => {
    try {
      const { otp } = req.body;

      if (!otp) {
        return res
          .status(400)
          .json({ status: false, message: "OTP không được để trống" });
      }

      console.log(`Verifying OTP: ${otp}`);

      const otpRecord = await OtpForget.findOne({ otp: otp });
      if (!otpRecord) {
        console.log("OTP không đúng hoặc đã hết hạn");
        return res.status(400).json({ status: false, message: "Nhập sai OTP" });
      }
      //const existingOTP = await OtpForget.findOneAndDelete({otp});
      return res
        .status(200)
        .json({ status: false, message: "OTP verification successful" });
    } catch (err) {
      console.error("Error in verifyForgotOTP:", err);
      return res
        .status(500)
        .json({ status: false, message: "Đã xảy ra lỗi", error: err.message });
    }
  },

  updatePasswordForgot: async (req, res) => {
    try {
      const { email } = req.body;
      const { password } = req.body;
      console.log(`Updating password for email: ${email}`);

      const CustomerForgot = await Customer.findOne({ email });
      if (!CustomerForgot) {
        console.log("Người dùng không tồn tại");
        return res
          .status(400)
          .json({ status: false, message: "Người dùng không tồn tại" });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({ status: false, message: "Mật khẩu tối thiểu 8 ký tự" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      CustomerForgot.password = hashed;
      await CustomerForgot.save();

      console.log(`Password updated successfully for email: ${email}`);
      return res
        .status(200)
        .json({ status: true, message: "Cập nhật mật khẩu thành công" });
    } catch (err) {
      console.error("Error in updatePasswordForgot:", err);
      return res
        .status(500)
        .json({ status: false, message: "Đã xảy ra lỗi", error: err.message });
    }
  },

  verifyForgotOTP: async (req, res, next) => {
    try {
      const { otp, password } = req.body;

      const otpforgot = await OtpForget.findOneAndDelete({ otp: otp });
      if (!otpforgot) {
        return res.status(400).json({ status: false, message: "Nhập sai Otp" });
      }
      const CustomerForgot = await Customer.findById(req.params.id);
      if (!CustomerForgot) {
        return res
          .status(400)
          .json({ status: false, message: "Người dùng không tồn tại" });
      }
      if (password.length < 8) {
        return res
          .status(400)
          .json({ status: false, message: "Nhập tối thiểu 8 ký tự" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      // const {password} = req.body;
      if (otpforgot) {
        // await CustomerForgot.updateOne({$set:hashed});
        CustomerForgot.password = hashed;
        await CustomerForgot.save();
        return res
          .status(200)
          .json({ status: true, message: "Cập nhật mật khẩu thành công" });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Cập nhật dữ liệu thất bại" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
//STORE TOKEN
//1) LOCAL STORAGE
//XSS
//2) HTTPONLY COOKIES:
//CRSF -> SAMESITE
//3) REDUX STORE -> ACCESSTOKEN
// HTTPONLY COOKIES -> REFRESHTOKEN
module.exports = authController;

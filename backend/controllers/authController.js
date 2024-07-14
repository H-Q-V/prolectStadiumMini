const Customer = require("../model/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
let refreshTokens = [];
const authController = {
  //register
  registerCustomer: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create new customer
      const newCustomer = await new Customer({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      const customer = await newCustomer.save();
      res.status(200).json(customer);
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
};
//STORE TOKEN
//1) LOCAL STORAGE
//XSS
//2) HTTPONLY COOKIES:
//CRSF -> SAMESITE
//3) REDUX STORE -> ACCESSTOKEN
// HTTPONLY COOKIES -> REFRESHTOKEN
module.exports = authController;

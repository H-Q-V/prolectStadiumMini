const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();
//register
router.post("/register", authController.registerCustomer);
//login
router.post("/login", authController.loginCustomer);
//refresh
router.post("/refresh", authController.requestRefreshToken);

//forgot
router.post("/forgot", authController.customerForgot);

//log out
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.customerLogout
);

//verify-otp
router.post("/verify-otp", authController.verifyOTP);

//verifyForgotOtp
router.post("/verify-forgot-otp/:id", authController.verifyForgotOTP);
module.exports = router;

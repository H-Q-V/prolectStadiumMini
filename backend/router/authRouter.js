const authController = require("../controllers/authController");
//const middlewareController = require("../controllers/middlewareController");
const middlewareController = require("../middleware/middleware");


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
router.post("/verify-forgot-otp", authController.verifyForgotOTP);

//update password forgot
router.post("/update-password-forgot", authController.updatePasswordForgot);

router.post(
  "/add-picture",
  middlewareController.verifyToken,
  authController.addPicture
);
module.exports = router;

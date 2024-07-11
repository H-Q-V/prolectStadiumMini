const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();
//register
router.post("/register", authController.registerCustomer);
//login
router.post("/login", authController.loginCustomer);
//reresh
router.post("/refresh", authController.requestRefreshToken);
//log out
router.post("/logout", middlewareController.verifyToken ,authController.customerLogout);
module.exports = router;
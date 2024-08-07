const revenueController = require("../controllers/revenueController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();
// Route chỉ dành cho admin
router.get('/revenue/monthly/:year', middlewareController.verifyTokenAndAdminAuth, revenueController.getMonthlyRevenue);
router.get('/revenue/yearly', middlewareController.verifyTokenAndAdminAuth, revenueController.getYearlyRevenue);

module.exports = router;
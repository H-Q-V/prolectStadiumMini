const router = require("express").Router();
const revenueRecordController = require("../controllers/revenueRecordController");
const middlewareController = require("../controllers/middlewareController");
router.get(
  "/getRevenues",
  middlewareController.verifyToken,
  middlewareController.authorize(["Admin"]),
  revenueRecordController.getRevenues
);

router.get(
  "/getRevenue",
  middlewareController.verifyToken,
  middlewareController.authorize(["Admin"]),
  revenueRecordController.getRevenue
);
router.get(
  "/getRevenueOwner",
  middlewareController.verifyToken,
  middlewareController.authorize(["StadiumOwner"]),
  revenueRecordController.getRevenueOwner
);

router.get(
  "/getRevenuesOwner",
  middlewareController.verifyToken,
  middlewareController.authorize(["StadiumOwner"]),
  revenueRecordController.getRevenuesOwner
);

module.exports = router;

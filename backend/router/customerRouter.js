const customerController = require("../controllers/customerController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();
// get all customer
router.get("/getAllCustomer", customerController.getAllCustomer);

router.put(
  "/updateCustomer/:id",
  middlewareController.verifyToken,
  middlewareController.authorize(["admin"]),
  customerController.updateCustomer
);

// delete customer
router.delete(
  "/deleteCustomer/:id",
  middlewareController.verifyToken,
  middlewareController.authorize(["admin"]),
  customerController.deleteCustomer
);
//router.delete("/deleteCustomer/:id", customerController.deleteCustomer);

module.exports = router;

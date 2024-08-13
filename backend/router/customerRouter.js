const customerController = require("../controllers/customerController");
//const middlewareController = require("../controllers/middlewareController");
const middlewareController = require("../middleware/middleware");

const router = require("express").Router();

router.post(
  "/addUsers",
  middlewareController.verifyToken,
  middlewareController.authorize(["Admin"]),
  customerController.addUsers
);
// get all customer
router.get(
  "/getAllCustomer",
  middlewareController.verifyToken,
  customerController.getAllCustomer
);

router.put(
  "/updateCustomer/:id",
  middlewareController.verifyToken,
  middlewareController.authorize(["Admin"]),
  customerController.updateCustomer
);

// delete customer
router.delete(
  "/deleteCustomer/:id",
  middlewareController.verifyToken,
  middlewareController.authorize(["Admin"]),
  customerController.deleteCustomer
);
//router.delete("/deleteCustomer/:id", customerController.deleteCustomer);
//router.post("/addAccountBank/:idCustomer", middlewareController.verifyToken, customerController.addAccountBank);

//router.put("/updateAccountBank/:id", middlewareController.verifyToken, customerController.updateAccountBank);

//router.delete("/deleteAccountBank/:id", middlewareController.verifyToken, customerController.deleteAccountBank);
module.exports = router;

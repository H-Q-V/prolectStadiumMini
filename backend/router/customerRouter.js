const customerController = require("../controllers/customerController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();
// get all customer
router.get("/getAllCustomer", middlewareController.verifyToken, customerController.getAllCustomer);

// delete customer
router.delete("/deleteCustomer/:id", middlewareController.verifyTokenAndAdminAuth, customerController.deleteCustomer);
//router.delete("/deleteCustomer/:id", customerController.deleteCustomer);
//router.post("/addAccountBank/:idCustomer", middlewareController.verifyToken, customerController.addAccountBank);

//router.put("/updateAccountBank/:id", middlewareController.verifyToken, customerController.updateAccountBank);

//router.delete("/deleteAccountBank/:id", middlewareController.verifyToken, customerController.deleteAccountBank);
module.exports = router;
const bookPitchController = require("../controllers/bookPitchController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.post(
  "/bookPitch/:stadiumID/:stadiumStyleID",
  middlewareController.verifyToken,
  bookPitchController.bookPitch
);

router.get("/getAllBookPitches", bookPitchController.getAllBookPitches);

router.get(
  "/getCustomerBookPitches",
  middlewareController.verifyToken,
  bookPitchController.getCustomerBookPitches
);

router.delete("/deleteBookPitches/:id", middlewareController.verifyToken, bookPitchController.deleteBookPitchs);

router.put("/updateBookPitches/:id", middlewareController.verifyToken, bookPitchController.updateBookPitch);

router.get("/payBookPitches/:idGetCustomerBookPitches", middlewareController.verifyToken, bookPitchController.payBookPitches);

module.exports = router;

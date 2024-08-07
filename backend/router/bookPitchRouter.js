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

router.get(
  "/getStadiumOwnerBookings",
  middlewareController.verifyToken,
  middlewareController.authorize(["StadiumOwner"]),
  bookPitchController.getStadiumOwnerBookings
);
router.delete(
  "/deleteBookPitches/:id",
  middlewareController.verifyToken,
  bookPitchController.deleteBookPitchs
);

router.put(
  "/updateBookPitches/:id",
  middlewareController.verifyToken,
  bookPitchController.updateBookPitch
);

module.exports = router;

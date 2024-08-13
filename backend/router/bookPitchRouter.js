const bookPitchController = require("../controllers/bookPitchController");
//const middlewareController = require("../controllers/middlewareController");
const middlewareController = require("../middleware/middleware");

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
  "/getAnBookPitches",
  middlewareController.verifyToken,
  bookPitchController.getAnBookPitch
);
router.delete(
  "/deleteBookPitches/:id",
  middlewareController.verifyToken,
  bookPitchController.deleteBookPitchs
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

router.delete(
  "/cancelpayment/",
  middlewareController.verifyToken,
  bookPitchController.cancelpayment
);

router.get("/getFreeTime/:idStadium", 
middlewareController.verifyToken, 
bookPitchController.getFreeTime
);

module.exports = router;

const bookPitchController = require("../controllers/bookPitchController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.post(
  "/bookPitch/:stadiumID/:stadiumStyleID",
  middlewareController.verifyToken,
  bookPitchController.bookPitch
);

router.get("/getAllBookPitches", bookPitchController.getAllBookPitches);

// router.get(
//   "/getCustomerBookPitches",
//   middlewareController.verifyToken,
//   bookPitchController.getCustomerBookPitches
// );

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


router.get("/getAnBookPitches", middlewareController.verifyToken, bookPitchController.getAnBookPitch);

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


router.get("/getFreeTime/:stadiumID", middlewareController.verifyToken, bookPitchController.getFreeTime);



module.exports = router;

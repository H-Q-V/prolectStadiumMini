const bookPitchController = require("../controllers/bookPitchController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.post(
  "/bookPitch/:stadiumID/:stadiumStyleID",
  middlewareController.verifyToken,
  bookPitchController.bookPitch
);

router.get("/getAllBookPitches", bookPitchController.getAllBookPitches);

router.get("/getAnBookPitches/:id",middlewareController.verifyToken, bookPitchController.getAnBookPitches);

router.delete("/deleteBookPitches/:id", middlewareController.verifyToken, bookPitchController.deleteBookPitchs);

router.post("/monthly_booking/:stadiumID/:stadiumStyleID", middlewareController.verifyToken, bookPitchController.monthlyBooking);

router.post("/week_booking/:stadiumID/:stadiumStyleID", middlewareController.verifyToken, bookPitchController.weeklyBooking);


module.exports = router;

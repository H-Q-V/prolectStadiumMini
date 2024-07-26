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

router.post("/monthly_booking/:stadiumID/:stadiumStyleID", middlewareController.verifyToken, bookPitchController.monthlyBooking);

router.post("/week_booking/:stadiumID/:stadiumStyleID", middlewareController.verifyToken, bookPitchController.weeklyBooking);


module.exports = router;

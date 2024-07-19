const bookPitchController = require("../controllers/bookPitchController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.post(
  "/bookPitch",
  middlewareController.verifyToken,
  bookPitchController.bookPitch
);

router.get("/getAllBookPitches", bookPitchController.getAllBookPitches);
module.exports = router;

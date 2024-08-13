const router = require("express").Router();
//const middlewareController = require("../controllers/middlewareController");
const middlewareController = require("../middleware/middleware");

const commentController = require("../controllers/commentController");
router.post(
  "/createComment/:stadiumID",
  middlewareController.verifyToken,
  commentController.createComment
);

router.get("/getComments/:stadiumID", commentController.getComments);
module.exports = router;

const stadiumOwnerController = require("../controllers/stadiumOwnerController");
const router = require("express").Router();

router.post("/post", stadiumOwnerController.addStadiumOwner);

router.get("/getAll", stadiumOwnerController.getAllStadiumOwner);

router.get("/getAn/:id", stadiumOwnerController.getAnStadiumOwner);

router.put("/Put/:id",stadiumOwnerController.UpdateStaiumOwner);

router.delete("/Delete/:id",stadiumOwnerController.DeleteStadiumOwner);

module.exports = router;
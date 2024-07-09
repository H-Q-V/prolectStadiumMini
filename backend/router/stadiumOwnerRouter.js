const stadiumOwnerController = require("../controllers/stadiumOwnerController");
const router = require("express").Router();

router.post("/createStadiumOwner", stadiumOwnerController.addStadiumOwner);

router.get("/getAllStadiumOwner", stadiumOwnerController.getAllStadiumOwner);

router.get("/getAnStadiumOwner/:id", stadiumOwnerController.getAnStadiumOwner);

router.put("/putStadiumOwner/:id",stadiumOwnerController.UpdateStaiumOwner);

router.delete("/deleteStadiumOwner/:id",stadiumOwnerController.DeleteStadiumOwner);

module.exports = router;
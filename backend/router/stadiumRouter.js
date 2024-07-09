const stadiumController = require("../controllers/stadiumController");
const router = require("express").Router();

//add stadium
router.post("/createStadium", stadiumController.addStadium);

//get all author
router.get("/getAllStadium", stadiumController.getAllStadium);
router.get("/getAnStadium/:id", stadiumController.getAStadium);
router.put("/updateStadium/:id", stadiumController.updateStadium);

router.delete("/:id", stadiumController.deleteStadium);

module.exports = router;

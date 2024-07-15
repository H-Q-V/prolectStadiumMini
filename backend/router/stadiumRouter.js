const stadiumController = require("../controllers/stadiumController");
const router = require("express").Router();

//add stadium
router.post("/createStadium", stadiumController.addStadium);

//get all stadium
router.get("/getAllStadium", stadiumController.getAllStadium);

router.get("/getAnStadium/:id", stadiumController.getAnStadium);

router.put("/updateStadium/:id", stadiumController.updateStadium);

router.delete("/deleteStadium/:id",stadiumController.deleteStadium);

router.get("/searchStadium",stadiumController.searchStadium);
// router để thêm stadiumstyle
router.post("/createStadiumStyle/:id",stadiumController.addStadiumStyle);

router.get("/getAllStadiumStyle/:id",stadiumController.getAllStadiumStyle);

router.get("/getAnStadiumStyle/:id/:idStadiumStyle", stadiumController.getAnStadiumStyle);

router.put("/updateStadiumStyle/:id/:stadiumStyleId",stadiumController.updateStadiumStyle);

router.delete("/deleteStadiumStyle/:stadiumStyleId", stadiumController.deleteStadiumStyle);

module.exports = router;
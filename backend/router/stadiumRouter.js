const stadiumController = require("../controllers/stadiumController");
//const { upload,uploadImage } = require("../uploadImage/uploadImage");
//const cloudinary = require("./uploadImage/uploadImage")
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

//add stadium
//router.post("/createStadium", stadiumController.addStadium, upload.single('img'), uploadImage);
router.post(
  "/createStadium",
  middlewareController.verifyToken,
  middlewareController.authorize(["StadiumOwner", "Admin"]),
  stadiumController.addStadium
);

//get all stadium
router.get("/getAllStadium", stadiumController.getAllStadium);

router.get(
  "/getAllStadiumsByOwner",
  middlewareController.verifyToken,
  middlewareController.authorize(["StadiumOwner", "Admin"]),
  stadiumController.getAllStadiumsByOwner
);

router.get("/getAnStadium/:id", stadiumController.getAnStadium);

router.put("/updateStadium/:id", stadiumController.updateStadium);

router.delete(
  "/deleteStadium/:id",
  middlewareController.verifyToken,
  middlewareController.authorize(["StadiumOwner", "Admin"]),
  stadiumController.deleteStadium
);

router.get("/searchStadium", stadiumController.searchStadium);
// router để thêm stadiumstyle
router.post(
  "/createStadiumStyle",
  middlewareController.verifyToken,
  middlewareController.authorize(["StadiumOwner", "Admin"]),
  stadiumController.addStadiumStyle
);

router.get("/getAllStadiumStyle/:id", stadiumController.getAllStadiumStyle);

router.get(
  "/getAnStadiumStyle/:id/:idStadiumStyle",
  stadiumController.getAnStadiumStyle
);

router.put(
  "/updateStadiumStyle/:stadiumStyleID",
  middlewareController.verifyToken,
  middlewareController.authorize(["StadiumOwner", "Admin"]),
  stadiumController.updateStadiumStyle
);

router.delete(
  "/deleteStadiumStyle/:stadiumStyleId",
  middlewareController.verifyToken,
  middlewareController.authorize(["StadiumOwner", "Admin"]),
  stadiumController.deleteStadiumStyle
);

module.exports = router;

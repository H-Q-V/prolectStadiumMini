const teamController = require("../controllers/teamController");
//const middlewareController = require("../controllers/middlewareController");
const middlewareController = require("../middleware/middleware");

const router = require("express").Router();


router.post("/addTeam",
middlewareController.verifyToken,
teamController.addTeam
);

router.put("/updateTeam", 
middlewareController.verifyToken, 
teamController.updateTeam
);

router.delete("/deleteTeam", 
middlewareController.verifyToken, 
middlewareController.authorize(["Customer", "Admin"]), 
teamController.deleteTeam
);

router.get("/searchTeam", 
middlewareController.verifyToken, 
teamController.searchTeam
);

router.post("/Send-Invitation/:idTeam", 
middlewareController.verifyToken, 
teamController.sendAnInvitation);

router.get("/Get-Invitation",
middlewareController.verifyToken,
teamController.getAnInvitation);

router.post("/Receives-Invitation",
middlewareController.verifyToken,
teamController.receivesAnInvitation
);

router.delete("/Delete-Invitation",
middlewareController.verifyToken,
teamController.deleteAnInvitation
);

module.exports = router;
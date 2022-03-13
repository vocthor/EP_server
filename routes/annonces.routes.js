const router = require("express").Router();
const annoncesController = require("../controllers/annonces.controller");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/addAnnonce", annoncesController.addAnnonce);
router.post("/updateAnnonces", annoncesController.updateAnnonces);
router.post("/deleteAnnonce", annoncesController.deleteAnnonce);

module.exports = router;
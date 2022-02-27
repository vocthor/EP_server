const router = require("express").Router();
const annoncesController = require("../controllers/annonces.controller");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/addAnnonces", annoncesController.addAnnonce);


module.exports = router;
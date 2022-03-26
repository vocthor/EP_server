const router = require("express").Router();
const TpController = require("../controllers/tp.controller");

router.post("/SallesTpLibres", TpController.SallesTpLibres);

module.exports = router;

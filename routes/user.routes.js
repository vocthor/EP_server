const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/create", authController.createUser);

module.exports = router;

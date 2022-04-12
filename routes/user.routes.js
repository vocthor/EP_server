const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/create", authController.createUser);
router.post("/getUser", authController.getUser);
router.post("/modifPrenom", authController.modifPrenom);
router.post("/modifNom", authController.modifNom);
router.post("/modifPseudo", authController.modifPseudo);
router.post("/modifEmail", authController.modifEmail);

/* Fonction qui permets de recup les données associées à un token d'user
appelée avec /getUserData     */
router.post("/getUserData", validateToken, (req, res) => {
  res.send(req.body);
});

module.exports = router;

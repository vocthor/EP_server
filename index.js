const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const config = require("./config/db");
const userRoutes = require("./routes/user.routes");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("./middlewares/AuthMiddleware");

app.use(cors());
app.use(express.json());

/* Crée la connection à la BD */
const db = mysql.createConnection(config.databaseOptions);

// app.use("/", userRoutes);
/* Fonction qui permets d'insérer un utilisateur dans la BD à partir de données reçues du front,
    appelée avec /create    */
app.post("/create", (req, res) => {
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const pseudo = req.body.pseudo;
  const id = req.body.id;
  if (prenom == "" || nom == "" || pseudo == "") {
    res.send("Invalid fields");
  } else {
    db.query(
      "INSERT INTO users (id,prenom,nom,pseudo) VALUES (?,?,?,?)",
      [id, prenom, nom, pseudo],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values inserted");
        }
      }
    );
  }
});

/* Fonction qui permets de vérifier si l'id reçu du front est bien présent dans la BD et si oui
retourne un token qui va ensuite sur le front être stocké dans le session storage pour permettre
l'authentification. Si l'id n'est pas présent retourne un objet avec un message d'erreur.
appelée avec /getUser   */
app.post("/getUser", (req, res) => {
  const id = req.body.id;
  db.query("SELECT * FROM users WHERE id= ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length > 0) {
        const accessToken = sign(
          {
            prenom: result[0].prenom,
            nom: result[0].nom,
            pseudo: result[0].pseudo,
            id: result[0].id,
          },
          "secret message"
        );
        res.send({
          accessToken: accessToken,
        });
      } else {
        res.send({ error: "Id no present in the db" });
      }
    }
  });
});

/* Fonction qui permets de recup les données associées à un token d'user
appelée avec /getUserData     */
app.post("/getUserData", validateToken, (req, res) => {
  res.send(req.body);
});

/* Message qui s'affiche lorsqu'on lance le back */
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

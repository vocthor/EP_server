const config = require("../config/db");
const mysql = require("mysql");
const { sign } = require("jsonwebtoken");

/* Crée la connexion à la BD */
const db = mysql.createConnection(config.databaseOptions);

module.exports.addAnnonce = (req, res) => {
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const pseudo = req.body.pseudo;
  if (prenom == "" || nom == "" || pseudo == "") {
    res.send("Invalid fields");
  } else {
    db.query(
      "INSERT INTO annonces (id_annonce, id_owner, annonce, contact) VALUES (?,?,?,?)",
      [prenom, nom, pseudo],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values inserted");
        }
      }
    );
  }
};

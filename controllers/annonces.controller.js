const config = require("../config/db");
const mysql = require("mysql");
const { sign } = require("jsonwebtoken");

/* Crée la connexion à la BD */
const db = mysql.createConnection(config.databaseOptions);

module.exports.addAnnonce = (req, res) => {
  const id_annonce = req.body.id_annonce;
  const id_owner = req.body.id_owner;
  const text = req.body.text;
  const contact = req.body.contact;

  if (id_annonce == "" || id_owner == "" || text == "") {
    res.send("Invalid fields");
  } else {
    db.query(
      "INSERT INTO annonces (id_annonce, id_owner, annonce, contact) VALUES (?,?,?,?)",
      [id_annonce, id_owner, text, contact],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error during insertion");
        } else {
          res.send("Values inserted");
        }
      }
    );
  }
};

module.exports.updateAnnonces = (req, res) => {
  db.query("SELECT * FROM annonces",[], (err, result) => {
    // console.log(result);
    res.send(result);
  });
};

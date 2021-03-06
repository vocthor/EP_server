const config = require("../config/db");
const mysql = require("mysql");
const { sign } = require("jsonwebtoken");

/* Crée la connexion à la BD */
const db = mysql.createConnection(config.databaseOptions);

/**
 * Ajouter une Annonce dans la table annonce
 * @param {*} req
 * @param {*} res
 */
module.exports.addAnnonce = (req, res) => {
  const id_annonce = req.body.id_annonce;
  const id_owner = req.body.id_owner;
  const text = req.body.text;
  const contact = req.body.contact;
  const anon = req.body.anon;
  const date = new Date().toISOString().slice(0, 10);

  if (id_annonce == "" || id_owner == "" || text == "") {
    res.send("Invalid fields");
  } else {
    db.query(
      "INSERT INTO annonces (id_annonce, id_owner, text_annonce, contact_annonce, anon, date_annonce) VALUES (?,?,?,?,?,?)",
      [id_annonce, id_owner, text, contact, anon, date],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error during insertion");
        } else {
          console.log(
            "Annonce ajoutée : " +
              [id_annonce, id_owner, text, contact, anon, date]
          );
          res.send("Values inserted");
        }
      }
    );
  }
};

/**
 * Renvoyer l'ensemble de la table annonce au front end pour les afficher
 * @param {*} req
 * @param {*} res
 */
module.exports.retrieveAnnonces = (req, res) => {
  db.query(
    "SELECT id_annonce, id_owner, text_annonce, contact_annonce, nom, prenom, anon \
   FROM annonces, users \
   WHERE users.id=annonces.id_owner",
    [],
    (err, result) => {
      // console.log(result);
      res.send(result);
    }
  );
};

/**
 * Supprimer une annonce si l'on en est le propriétaire
 * @param {*} req
 * @param {*} res
 */
module.exports.deleteAnnonce = (req, res) => {
  const id_annonce = req.body.id_annonce;
  const id_logged = req.body.id_logged;
  const role = req.body.role;
  // On vérifie aussi côté backEnd
  if (role == "admin" || role == "moderator") {
    db.query(
      "DELETE FROM annonces \
      WHERE id_annonce= ?",
      [id_annonce],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error during delete");
        } else {
          res.send("Value deleted");
        }
      }
    );
  } else {
    db.query(
      "DELETE FROM annonces \
    WHERE id_annonce= ? AND id_owner = ?",
      [id_annonce, id_logged],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error during delete");
        } else {
          res.send("Value deleted");
        }
      }
    );
  }
  // C'est moche mais tant pis
};

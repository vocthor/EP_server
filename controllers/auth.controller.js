const config = require("../config/db");
const mysql = require("mysql");
const { sign } = require("jsonwebtoken");

/* Crée la connexion à la BD */
const db = mysql.createConnection(config.databaseOptions);

/* Fonction qui permets d'insérer un utilisateur dans la BD à partir de données reçues du front,
    appelée avec /create    */
module.exports.createUser = (req, res) => {
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const pseudo = req.body.pseudo;
  const id = req.body.id;
  if (prenom == "" || nom == "" || pseudo == "") {
    res.send("Invalid fields");
  } else {
    db.query(
      // le db ici n'est défini nul part
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
};

/* Fonction qui permets de vérifier si l'id reçu du front est bien présent dans la BD et si oui
retourne un token qui va ensuite sur le front être stocké dans le session storage pour permettre
l'authentification. Si l'id n'est pas présent retourne un objet avec un message d'erreur.
appelée avec /getUser   */
module.exports.getUser = (req, res) => {
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
};

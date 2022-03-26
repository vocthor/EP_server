const config = require("../config/db");
require("dotenv").config({ path: "../config/.env" });
const mysql = require("mysql");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");

/* Crée la connexion à la BD */
const db = mysql.createConnection(config.databaseOptions);

/* Crée la connexion au serveur de mail */

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.GMAIL_USERNAME, //set these in your .env file
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
  },
});

/* Fonction qui permets d'insérer un utilisateur dans la BD à partir de données reçues du front,
    appelée avec /create    */
module.exports.createUser = (req, res) => {
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const pseudo = req.body.pseudo;
  const id = req.body.id;
  const email = req.body.email;
  if (prenom == "" || nom == "" || pseudo == "") {
    //vérification que les champs ne soient pas vide
    res.send("Invalid fields");
  } else if (email.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) == -1) {
    //vérification validité de l'email
    res.send("Invalid fields");
  } else {
    db.query(
      "INSERT INTO users (id,prenom,nom,pseudo,email) VALUES (?,?,?,?,?)",
      [id, prenom, nom, pseudo, email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values inserted");
          //On prépare le mail de vérification
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Account created",
            text:
              "Bonjour,\nNous confirmons la création de votre compte sur le panneau d'affichage intéractif du bâtiment informatique, en espérant que cela vous sera utile " +
              prenom +
              " " +
              nom,
          };
          //On envoie le mail
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      }
    );
  }
};

/* Fonction qui permets de modifier le prenom d'un utilisateur    */
module.exports.modifPrenom = (req, res) => {
  const prenom = req.body.prenom;
  const id = req.body.id;
  const email = req.body.email;
  if (prenom == "") {
    //vérification que les champs ne soient pas vide
    res.send("Invalid fields");
  } else {
    db.query(
      "UPDATE users SET prenom='" + prenom + "' WHERE id='" + id + "'",
      [true],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values inserted");
          //On prépare le mail de vérification
          const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: email,
            subject: "Prénom modifié",
            text:
              "Bonjour,\nNous confirmons la modification de votre prénom par " +
              prenom,
          };
          //On envoie le mail
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      }
    );
  }
};

/* Fonction qui permets de modifier le nom d'un utilisateur    */
module.exports.modifNom = (req, res) => {
  const nom = req.body.nom;
  const id = req.body.id;
  const email = req.body.email;
  if (nom == "") {
    //vérification que les champs ne soient pas vide
    res.send("Invalid fields");
  } else {
    db.query(
      "UPDATE users SET nom='" + nom + "' WHERE id='" + id + "'",
      [true],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values inserted");
          //On prépare le mail de vérification
          const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: email,
            subject: "Nom modifié",
            text:
              "Bonjour,\nNous confirmons la modification de votre Nom par " +
              nom,
          };
          //On envoie le mail
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      }
    );
  }
};

/* Fonction qui permets de modifier le pseudo d'un utilisateur    */
module.exports.modifPseudo = (req, res) => {
  const pseudo = req.body.pseudo;
  const id = req.body.id;
  const email = req.body.email;
  if (pseudo == "") {
    //vérification que les champs ne soient pas vide
    res.send("Invalid fields");
  } else {
    db.query(
      "UPDATE users SET pseudo='" + pseudo + "' WHERE id='" + id + "'",
      [true],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values inserted");
          //On prépare le mail de vérification
          const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: email,
            subject: "Pseudo ENT modifié",
            text:
              "Bonjour,\nNous confirmons la modification de votre pseudo ENT par " +
              pseudo,
          };
          //On envoie le mail
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      }
    );
  }
};

/* Fonction qui permets de modifier l'email d'un utilisateur    */
module.exports.modifEmail = (req, res) => {
  const id = req.body.id;
  const nouvemail = req.body.nouvemail;
  const email = req.body.email;
  if (nouvemail.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) == -1) {
    //vérification validité de l'email
    res.send("Invalid fields");
  } else {
    db.query(
      "UPDATE users SET email='" + nouvemail + "' WHERE id='" + id + "'",
      [true],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values inserted");
          //On prépare le mail de vérification
          const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: email + "," + nouvemail,
            subject: "Adresse mail modifiée",
            text:
              "Bonjour,\nNous confirmons la modification de votre adresse mail " +
              email +
              " par " +
              nouvemail,
          };
          //On envoie le mail
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
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
            email: result[0].email,
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

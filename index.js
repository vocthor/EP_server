const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const pool = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "users",
});

app.post("/create", (req, res) => {
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const pseudo = req.body.pseudo;

  pool.query(
    "INSERT INTO users (prenom,nom,pseudo) VALUES (?,?,?)",
    [prenom, nom, pseudo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

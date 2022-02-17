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

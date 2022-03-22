/* Récupération des données de ADE Campus, on récupère le contenu du fichier ICS dans ADE.txt */

const fs = require("fs");
const request = require("request");

module.exports = function download(url, dest, cb) {
  // on créé un stream d'écriture qui nous permettra
  // d'écrire au fur et à mesure que les données sont téléchargées
  const file = fs.createWriteStream(dest);

  // on lance le téléchargement
  const sendReq = request.get(url);

  // on vérifie la validité du code de réponse HTTP
  sendReq.on("response", (response) => {
    if (response.statusCode !== 200) {
      return cb("Response status was " + response.statusCode);
    }
  });

  // au cas où request rencontre une erreur
  // on efface le fichier partiellement écrit
  // puis on passe l'erreur au callback
  sendReq.on("error", (err) => {
    fs.unlink(dest);
    cb(err.message);
  });

  // écrit directement le fichier téléchargé.
  sendReq.pipe(file);

  // lorsque le téléchargement est terminé
  // on appelle le callback
  file.on("finish", () => {
    // close étant asynchrone,
    // le cb est appelé lorsque close a terminé
    file.close(cb);
  });

  // si on rencontre une erreur lors de l'écriture du fichier
  // on efface le fichier puis on passe l'erreur au callback
  file.on("error", (err) => {
    // on efface le fichier sans attendre son effacement
    // on ne vérifie pas non plus les erreur pour l'effacement
    fs.unlink(dest, cb);
    cb(err.message);
  });
};

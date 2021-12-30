const { verify } = require("jsonwebtoken");

/* 
Cette fonction sert à vérifier que le token est valide et permets
de récupérer les infos associées au token dans req.body qui peut ensuite
être utilisé dans le back. C'est une fonction avec un next, donc dans le back on 
l'appelle et si le next arrive alors ça passe à la fonction suivante apres la virgule */
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  console.log(accessToken);

  if (!accessToken) res.send({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "secret message");
    req.body = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    res.send({ error: err });
  }
};

module.exports = { validateToken };

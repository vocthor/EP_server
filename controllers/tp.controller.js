const fs = require("fs");
const readline = require("readline");
cours = [];

async function processLineByLine() {
  cours = [];
  const fileStream = fs.createReadStream("./resources/ADE.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let i = 0;
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let reg1;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (line == "BEGIN:VEVENT") {
      i++;
      cours[i] = new Object();
    }
    match = line.match(/^(.*?)(:)(.*)/);
    if (RegExp.$1 != null) {
      reg1 = RegExp.$1;
      if (reg1 == "DTSTART") cours[i].dtstart = RegExp.$3;
      if (reg1 == "DTEND") cours[i].dtend = RegExp.$3;
      if (reg1 == "SUMMARY") cours[i].summary = RegExp.$3;
      if (reg1 == "LOCATION") {
        cours[i].location = RegExp.$3;
      }
    }
  }
  //console.log(RegExp.$1 + " : " + RegExp.$2 + i);

  //On regarde s'il y a plusieurs salles pour un seul cours, on le fait plusieurs fois dans le
  //cas ou il y a 4 ou 5 salles d'affectées
  cours.forEach((element) => {
    if (element.location != null) {
      if (/(.*),(.*)/.test(element.location)) {
        element.location.match(/(.*),(.*)/);
        element.location = RegExp.$1;
        ajout = new Object();
        ajout.dtend = element.dtend;
        ajout.dtstart = element.dtstart;
        ajout.summary = element.summary;
        ajout.location = RegExp.$2;
        cours.push(ajout);
      }
    }
  });
  cours.forEach((element) => {
    if (element.location != null) {
      if (/(.*),(.*)/.test(element.location)) {
        element.location.match(/(.*),(.*)/);
        element.location = RegExp.$1;
        ajout = new Object();
        ajout.dtend = element.dtend;
        ajout.dtstart = element.dtstart;
        ajout.summary = element.summary;
        ajout.location = RegExp.$2;
        cours.push(ajout);
      }
    }
  });
  cours.forEach((element) => {
    if (element.location != null) {
      if (/(.*),(.*)/.test(element.location)) {
        element.location.match(/(.*),(.*)/);
        element.location = RegExp.$1;
        ajout = new Object();
        ajout.dtend = element.dtend;
        ajout.dtstart = element.dtstart;
        ajout.summary = element.summary;
        ajout.location = RegExp.$2;
        cours.push(ajout);
      }
    }
  });
  cours.forEach((element) => {
    if (element.location != null) {
      if (/(.*),(.*)/.test(element.location)) {
        element.location.match(/(.*),(.*)/);
        element.location = RegExp.$1;
        ajout = new Object();
        ajout.dtend = element.dtend;
        ajout.dtstart = element.dtstart;
        ajout.summary = element.summary;
        ajout.location = RegExp.$2;
        cours.push(ajout);
      }
    }
  });

  return cours;
}

module.exports.SallesTpLibres = (req, res) => {
  processLineByLine().then((ress) => {
    res.send(ress);
  });
};

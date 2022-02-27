const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./routes/user.routes");
const annoncesRoutes = require("./routes/annonces.routes");
const download = require("./utils/download");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", annoncesRoutes);

/* Télécharge le contenu de ADE dans ADE.txt*/

download(
  "http://edt.insa-rennes.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=1030,1029,1015,1009,829,967,1051,889&projectId=22&calType=ical&firstDate=2021-08-30&lastDate=2022-07-03",
  "./resources/ADE.txt",
  (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Téléchargement terminé !");
  }
);

/* Message qui s'affiche lorsqu'on lance le back */
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const audnroutes = require("./routes/audnroutes")

//servidor
const app = express();


//middleware
app.use(bodyParser.json());

//colocar rutas
app.use('/api', audnroutes)

// levantar servidor
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Servidor levantado en el puerto 8000");
});
const express = require("express");
const routes = express.Router();
const { getSongsAndArtists } = require("../controllers/audncontrollers")

//Obtener Canciones y Artistas

routes.get("/songartist", getSongsAndArtists);



//export
module.exports = routes;
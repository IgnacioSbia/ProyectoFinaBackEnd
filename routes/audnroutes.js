const express = require("express");
const routes = express.Router();
const { getSongsAndArtists, getSongByArtist } = require("../controllers/audncontrollers")

//Obtener Canciones y Artistas

routes.get("/songartist", getSongsAndArtists);

//Obtener canciones de un artista por ID QUERY
routes.get('/songbyartist', getSongByArtist)

//export
module.exports = routes;
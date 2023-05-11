const express = require("express");
const routes = express.Router();
const { getSongsAndArtists, getSongByArtist, getSongByGenre } = require("../controllers/audncontrollers")

//Obtener Canciones y Artistas

routes.get("/songartist", getSongsAndArtists);

//Obtener canciones de un artista por ID QUERY
routes.get('/songbyartist', getSongByArtist)

// obtener canciones de un genero por ID QUERY
routes.get('/songbygenre', getSongByGenre)

//export
module.exports = routes;
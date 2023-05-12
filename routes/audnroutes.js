const express = require("express");
const routes = express.Router();
const { getSongsAndArtists, getSongByArtist, getSongByGenre, getSongsAndArtists20, postPlaylist } = require("../controllers/audncontrollers")

//Obtener Canciones y Artistas
routes.get("/songartist", getSongsAndArtists);
routes.get("/songartist20", getSongsAndArtists20);

//Obtener canciones de un artista por ID QUERY
routes.get('/songbyartist', getSongByArtist)

//Obtener canciones de un genero por ID QUERY
routes.get('/songbygenre', getSongByGenre)

//Crear playlist
routes.post('/playlist', postPlaylist);

//export
module.exports = routes;
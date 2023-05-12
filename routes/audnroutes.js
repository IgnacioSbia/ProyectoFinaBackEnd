const express = require("express");
const routes = express.Router();
const { getSongsAndArtists, getSongByArtist, getSongByGenre, getSongsAndArtists20, regUser, getUser, loginTo } = require("../controllers/audncontrollers");
const { verifyToken } = require("../Middlewares/authUser");

//Obtener Canciones y Artistas

routes.get("/songartist", getSongsAndArtists);
routes.get("/songartist20", getSongsAndArtists20);

//Obtener canciones de un artista por ID QUERY
routes.get('/songbyartist', getSongByArtist)

// obtener canciones de un genero por ID QUERY
routes.get('/songbygenre', getSongByGenre)
//GetUsuarios
routes.get('/userlist',verifyToken, getUser)
//Registrarse
routes.post('/register', regUser)
//Login
routes.post('/login',loginTo)


//export
module.exports = routes;
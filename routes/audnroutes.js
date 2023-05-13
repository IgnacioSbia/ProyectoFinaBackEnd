const express = require("express");
const routes = express.Router();

const { getSongsAndArtists, getSongByArtist, getSongByGenre, getSongsAndArtists20, regUser, getUser, loginTo, addSongToPlaylist, getPlaylistsofUser, postPlaylist, getGeneros } = require("../controllers/audncontrollers");
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
//AddSongToPlaylist
routes.post('/addSong',verifyToken,addSongToPlaylist)
//getPlaylists
routes.get('/playlistsuser',verifyToken,getPlaylistsofUser)
//createPlaylists
routes.post('/createPlaylist',verifyToken,postPlaylist)

//obtener lista de generos
routes.get('/generos', getGeneros);


//export
module.exports = routes;
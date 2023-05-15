const express = require("express");
const routes = express.Router();

const { getSongsAndArtists, getSongByArtist, getSongByGenre, getSongsAndArtists20, regUser, getUser, loginTo, addSongToPlaylist, getPlaylistsofUser, postPlaylist, getGeneros, getPlaylistsofUser2, getArtists, getSongByArtists, getPlalistByName, insertIntoPlaylistbyArtist, deletePlaylistSongs, getSongByPlaylistId, insertIntoPlaylistbyGenre, getUserbyId } = require("../controllers/audncontrollers");



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
//GetPlaylistsTest
routes.get('/artists', verifyToken,getArtists)
//createPlaylists
routes.post('/createPlaylist',verifyToken,postPlaylist)
//GetSongByArtist
routes.get('/songByArtists', verifyToken,getSongByArtists)
//obtener lista de generos
routes.get('/generos', verifyToken,getGeneros);
//GetPlaylistByName
routes.get('/playlistByName', verifyToken,getPlalistByName)
//insertIntoPlaylistbyArtist
routes.post('/inserIntoPlaylistByArtist', verifyToken,insertIntoPlaylistbyArtist)
//DeletePlaylistById
routes.delete('/deletePlaylistById',verifyToken,deletePlaylistSongs)
//GetPlaylistSongsByPlayListId
routes.get('/PlaylistSongs', verifyToken,getSongByPlaylistId)
//InsertIntoPlaylistByGenre
routes.post('/InsertByGenre', verifyToken,insertIntoPlaylistbyGenre)
//GetUserById
routes.get('/getUserbyId', verifyToken,getUserbyId)


//export
module.exports = routes;
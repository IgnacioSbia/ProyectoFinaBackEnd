const { defaults } = require("pg");
const knex = require("../Config/knexfile");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//Canciones y artistas
exports.getSongsAndArtists = async (req, res) => {
    try {
    const resultado = await knex.select('*').from("Song").innerJoin("Artists", 'Song.id_artist', 'Artists.id_artist');
    
    res.status(200).json({SongsArtists: resultado})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Canciones de un artista con QUERY

exports.getSongByArtist = async (req, res) => {
    const queryId = Number(req.query.id);
    try {
        const resultado = await knex.select('*').from("Song").innerJoin("Artists", 'Song.id_artist', 'Artists.id_artist').where('Artists.id_artist', queryId);
        res.status(200).json({resultado})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Obtener canciones por genero QUERY
exports.getSongByGenre = async (req, res) => {
    const queryId = Number(req.query.id);
    try {
        const resultado = await knex.select('*').from("Song").innerJoin("Genres", 'Genres.id_genre', 'Song.id_genre').where('Genres.id_genre', queryId);
        res.status(200).json({resultado})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Canciones y artistas limit 20
exports.getSongsAndArtists20 = async (req, res) => {
    try {
const resultado = await knex.select('*').from("Song").innerJoin("Artists", 'Song.id_artist', 'Artists.id_artist').limit(20).orderByRaw('RANDOM()');
    res.status(200).json({SongsArtists: resultado})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.regUser = async(req,res) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = {
        names: req.body.name,
        mail: req.body.mail,
        password: password
    }
    try{
        knex('User')
         .insert({
            user_name : newUser.names,
            mail : newUser.mail,
            pw : password
         })
         .then(res.json({mensaje: "success!"}))
         
         
    }catch(error){
        res.json({error:error.message})
    }   

}
exports.getUser = async(req,res)=>{
    try {
        const resultado = await knex.select('*').from("User");
        res.status(200).json({resultado})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.getGeneros = async (req, res) => {
try {
    const result = await knex.select("*").from("Genres")
    res.status(200).json({result})
} catch (error) {
      res.status(400).json({ error: error.message})
}
}

exports.loginTo = async(req, res)=>{

    const resultado = await knex.select('id_user','user_name','pw').from("User").where({
        user_name: req.body.name
    });
    
    try{
        if(await bcrypt.compare(req.body.password, resultado[0].pw)){
            const id_user = resultado[0].id_user
            const token = jwt.sign(
                {
                  name: resultado[0].user_name,
                  
                },
                process.env.TOKEN_SECRET
              );
              res.status(200).json({
                mensaje: "El usuario se ha logeado correctamente",
                token: token,
                id_user: id_user,
              });
              
        }else{
            res.json({message:'Not Alloweed'})
        }
    } catch(error){
        res.status(400).json({error:error.message})
    }
}
exports.addSongToPlaylist = async(req,res)=>{
    try{
       knex('PlaylistSongs')
         .insert({
            id_song: req.body.song,
            id_playlist: req.body.playlistid
         })
         .then(res.json({mensaje: "success!"}))
         
         
    }catch(error){
        res.json({error:error.message})
    }   
}

exports.getPlaylistsofUser = async(req,res)=>{
    try{
    const resultado = await knex.select('*').from("Playlists").innerJoin("User", 'Playlists.id_user', 'User.id_user').where('Playlists.id_user', req.query.iduser);
    const resultadoid = await knex.select('*').from("Playlists").where('Playlists.id_user', req.query.iduser);

    res.status(200).json({resultado, resultadoid})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
exports.getPlaylistsofUser2 = async(req,res)=>{
    try{
    const resultado = await knex.select('*').from("Playlists").where('Playlists.id_user', req.query.iduser);
   
    res.status(200).json({resultado})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//Creando una playlist

exports.postPlaylist = async (req, res) => {
    try {
      await knex("Playlists").insert(req.body);
      res.status(200).json({ message: "Ok" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

exports.getArtists = async(req,res)=>{
    try{
        const resultado = await knex.select('*').from('Artists');

        res.status(200).json({resultado})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
exports.getSongByArtists = async (req, res) => {
    const queryId = req.query.artist;
    try {
        const resultado = await knex.select('*').from("Song").innerJoin("Artists", 'Artists.id_artist', 'Song.id_artist').where('Artists.id_artist', queryId);
        res.status(200).json({resultado})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
exports.getPlalistByName = async(req,res) => {
    try{
        const resultado = await knex.select('id_playlist').from("Playlists").where('Playlists.playlist_name', req.query.playlistname);
       
        res.status(200).json({resultado})
        }catch(error){
            res.status(400).json({error: error.message})
        }
}
exports.insertIntoPlaylistbyArtist = async(req,res)=>{
    try{
     await  knex('Song')
          .select('*')
          .where('id_artist', req.body.artist)
          .then((result)=>{
            const songs = result.map((id) => ({ id_song: id.id_song, id_playlist: req.body.playlistid }));

            return knex('PlaylistSongs').insert(songs)
          })
          
          res.status(200).json({mensaje: "success!"})
          
          
     }catch(error){
        res.status(400).json({mensaje: "success!"})
     }   
}
exports.deletePlaylistSongs = async(req,res)=>{
    try{
      await knex('PlaylistSongs','Playlists')
            .where('id_playlist', req.body.idplaylist)
            .del()
    
        await knex('Playlists')
            .where('id_playlist', req.body.idplaylist)
            .del()
        .then(res.json({mensaje:"success!"}))

    }catch(error){
       res.status(400).json({mensaje:error.message})
    }
}
exports.getSongByPlaylistId = async(req,res)=>{
    try{
        const resultado = await knex.select('*').from("PlaylistSongs")
        .innerJoin("Song", 'Song.id_song', 'PlaylistSongs.id_song')
        .innerJoin("Artists",'Artists.id_artist', 'Song.id_artist')
        .where('PlaylistSongs.id_playlist', req.query.playlistid);
       
        res.status(200).json({resultado})
        }catch(error){
            res.status(400).json({error: error.message})
        }
}
exports.insertIntoPlaylistbyGenre = async(req,res)=>{
    try{
     await  knex('Song')
          .select('*')
          .where('id_genre', req.body.genreid)
          .then((result)=>{
            const songs = result.map((id) => ({ id_song: id.id_song, id_playlist: req.body.playlistid }));

            return knex('PlaylistSongs').insert(songs)
          })
          
          res.status(200).json({mensaje: "success!"})
          
          
     }catch(error){
        res.status(400).json({mensaje: error.message})
     }   
}
exports.getUserbyId = async(req, res)=>{
    try {
        const resultado = await knex.select('*').from("User").where('id_user', req.query.userid);
        res.status(200).json({resultado})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const knex = require("../config/knexfile");


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
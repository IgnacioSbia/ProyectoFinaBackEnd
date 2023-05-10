const knex = require("../config/knexfile");

exports.getSongsAndArtists = async (req, res) => {
    try {
const resultado = await knex.select('*').from("Song").innerJoin("Artists", 'Song.id_artist', 'Artists.id_artist');
    res.status(200).json({SongsArtists: resultado})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
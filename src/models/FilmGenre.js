const mongoose = require('../database')

const FilmGenreSchema = new mongoose.Schema({
    film: Film,
    genre: Genre;
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const FilmGenre = mongoose.model('FilmGenre', FilmGenreSchema)


module.exports = FilmGenre;

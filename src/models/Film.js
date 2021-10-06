const mongoose = require('../database')

const FilmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: true,
    },
    actors: [],
    directors: [],
    genre: [],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Film = mongoose.model('Film', FilmSchema)


module.exports = Film;

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
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: true
    }],
    directors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    }],
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Film = mongoose.model('Film', FilmSchema)


module.exports = Film;

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
    createUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Film = mongoose.model('film', FilmSchema)


module.exports = Film;

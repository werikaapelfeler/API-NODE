const mongoose = require('../database')

const FilmDirectorSchema = new mongoose.Schema({
    film: Film,
    actor: Actor;
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const FilmDirector = mongoose.model('FilmDirector', FilmDirectorSchema)


module.exports = FilmDirector;

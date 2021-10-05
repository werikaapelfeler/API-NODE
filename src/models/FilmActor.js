const mongoose = require('../database')

const FilmActorSchema = new mongoose.Schema({
    film: Film,
    actor: Actor;
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const FilmActor = mongoose.model('filmActor', FilmActorSchema)


module.exports = FilmActor;

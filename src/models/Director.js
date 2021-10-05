const mongoose = require('../database')

const DirectorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Director = mongoose.model('director', ActorSchema)


module.exports = Director;

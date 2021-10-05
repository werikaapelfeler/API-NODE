const mongoose = require('../database')

const ActorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Actor = mongoose.model('actor', ActorSchema)


module.exports = Actor;

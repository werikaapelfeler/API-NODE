const mongoose = require('../database')

const RatingSchema = new mongoose.Schema({
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Rating = mongoose.model('Rating', RatingSchema)


module.exports = Rating;

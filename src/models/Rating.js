const mongoose = require('../database')
import Film from '@models/Film';
import User from '@models/User';

const RatingSchema = new mongoose.Schema({
    user: {
        type: User,
        required: true
    },
    film: {
        type: Film,
        required: true
    },
    rating: {
          type: [0 | 1 | 2 | 3 | 4],
          required: true
      },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Rating = mongoose.model('rating', RatingSchema)


module.exports = Rating;

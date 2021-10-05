const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Rating = require('../models/Rating')

const router = express.Router()

//router.use(authMiddleware)

router.post('/rate', async (req, res) => {
    try {
        let { user, film, rating } = req.body

        const rate = new Rating({
            user: user,
            film: film,
            rating: rating
        });

        rate.save()

        return res.status(200).send({ rate })

    } catch (err) {
        return res.status(400).send({ error: "Error creating rating" })
    }

})


module.exports = app => app.use('/rating', router)

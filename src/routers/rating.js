const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Rating = require('../models/Rating')
const User = require('../models/User')


const router = express.Router()

router.use(authMiddleware)

router.post('/rate', async (req, res) => {
    try {
        let user = await User.findById(req.userId)
        if (user.role == 'user') {
            let { film, rating } = req.body

            const rate = new Rating({
                user: req.userId,
                film: film,
                rating: rating
            });

            rate.save()

            return res.status(200).send({ rate })
        } else {
            return res.status(401).send({ error: "User without permission" })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error creating rating" })
    }

})


module.exports = app => app.use('/rating', router)

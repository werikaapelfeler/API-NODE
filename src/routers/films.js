const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Film = require('../models/Film')
const Rating = require('../models/Rating')
const User = require('../models/User')

const router = express.Router()

router.use(authMiddleware)

router.get('/list/:search', async (req, res) => {
    try {
        let films = await Film.find({
            $or: [
                { "title": { $regex: '.*' + req.params.search + '.*' } },
                { "actors": { $regex: '.*' + req.params.search + '.*' } },
                { "directors": { $regex: '.*' + req.params.search + '.*' } },
                { "genre": { $regex: '.*' + req.params.search + '.*' } }
            ]
        })

        return res.send({ films })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error loading film" })
    }
})

router.get('/detalhe/:id', async (req, res) => {
    try {
        const film = await Film.findById(req.params.id)
        const ratings = await Rating.find({ film: req.params.id })
        let sumRating = 0
        ratings.map(result => {
            sumRating = sumRating + result.rating
        })
        let media = (sumRating / ratings.length)
        return res.send({ film, votos: media })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error loading film" })
    }
})

router.post('/create', async (req, res) => {
    try {
        let user = await User.findById(req.userId)
        if (user && user.role == 'admin') {

            let { title, synopsis, enabled, actors, directors, genre } = req.body

            const film = await Film.create({ title, synopsis, enabled, genre, actors, directors })

            await film.save()

            return res.send({ film })
        } else {
            return res.status(401).send({ error: "User without permission" })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error creating film" })
    }

})

router.put('/update/:id', async (req, res) => {
    try {
        let user = await User.findById(req.userId)
        if (user.role == 'admin') {
            let { title, synopsis, enabled, actors, directors, genre } = req.body

            const film = await Film.findByIdAndUpdate(req.params.id,
                {
                    title,
                    synopsis,
                    enabled,
                    genre: genre,
                    actors: actors,
                    directors: directors
                }, { new: true })

            await film.save()

            return res.send({ film })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error updating film" })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await Film.findByIdAndUpdate(req.params.id, { enabled: false }, { new: true })
        res.status(200).send({ msg: "Successfully deleted" })
    } catch (error) {
        res.status(400).send({ error: "Error deleting" })
    }
})

module.exports = app => app.use('/films', router)

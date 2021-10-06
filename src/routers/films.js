const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Film = require('../models/Film')
const Genre = require('../models/Genre')
const Rating = require('../models/Rating')

const router = express.Router()

router.use(authMiddleware)

router.get('/list', async (req, res) => {
    try {

        let { title, actor, director, genre } = req.body
        let filter = {}
        if (title) { filter["title"] = title }
        if (actor) { filter["actor"] = actor }
        if (director) { filter["director"] = director }
        if (genre) { filter["genre"] = genre }

        const films = await Film.find(filter).populate(['directors', 'actors', 'genre'])

        return res.send({ films })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error loading film" })
    }
})

router.get('/detalhe/:id', async (req, res) => {
    try {
        const film = await Film.findById(req.params.id).populate(['directors', 'actors', 'genre'])
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
        console.log(req.userId)
        let { title, synopsis, enabled, actors, directors, genre } = req.body

        const genreF = new Genre(genre)
        await genreF.save()

        const film = await Film.create({ title, synopsis, enabled, genre: genreF._id })

        await Promise.all(actors.map(async actor => {
            const actorF = new Actor({ ...actor })
            await actorF.save()
            film.actors.push(actorF)
        }))

        await Promise.all(directors.map(async director => {
            const directorF = new Director({ ...director })
            await directorF.save()
            film.directors.push(directorF)
        }))

        await film.save()

        return res.send({ film })

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error creating film" })
    }

})

router.put('/update/:id', async (req, res) => {
    try {
        let { title, synopsis, enabled, actors, directors, genre } = req.body

        const genreF = new Genre(genre)
        await genreF.save()

        const film = await Film.findByIdAndUpdate(req.params.id,
            {
                title,
                synopsis,
                enabled,
                genre: genreF._id
            }, { new: true })

        film.actors = []
        film.directors = []
        await Promise.all(actors.map(async actor => {
            const actorF = new Actor({ ...actor })
            await actorF.save()
            film.actors.push(actorF)
        }))

        await Promise.all(directors.map(async director => {
            const directorF = new Director({ ...director })
            await directorF.save()
            film.directors.push(directorF)
        }))

        await film.save()

        return res.send({ film })

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

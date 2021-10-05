const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Actor = require('../models/Actor')
const Film = require('../models/Film')

const router = express.Router()

//router.use(authMiddleware)

router.post('/create', async (req, res) => {
    try {
        let { title, synopsis, enabled, actors } = req.body

        const film = await Film.create({ title, synopsis, enabled })

        /*actors.map(actor => {
            const filmActor = new Actor({ ...actor, film: film._id })
            filmActor.save().then(actor => {
                film.actors.push(actor)
            })
        })*/

        return res.send({ film })

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error creating film" })
    }

})

router.put('/update/:id', async (req, res) => {
    try {
        let { title, synopsis, enabled, actors } = req.body

        const film = await Film.findByIdAndUpdate(req.params.id, { title, synopsis, enabled }, { new: true })
        await film.save()

        /*actors.map(actor => {
            const filmActor = new Actor({ ...actor, film: film._id })
            filmActor.save().then(actor => {
            film.actors.push(actor)
            })
        })*/
        res.status(200).send({ film: film, msg: "Successfully updating" })

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

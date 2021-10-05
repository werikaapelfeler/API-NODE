const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Actor = require('../models/Actor')
const Film = require('../models/Film')

const router = express.Router()

//router.use(authMiddleware)

router.get('/', (req, res) => {
    res.send({ ok: true, users: req.userId })
})

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

module.exports = app => app.use('/films', router)

const express = require('express')
const authMiddleware = require ('../middlewares/auth')

const router = express.Router()

router.use(authMiddleware)

router.get('/', (req, res) => {
    res.send({ ok: true, users: req.userId})
})

router.post('/create', (req, res) => {
    try {
        let {title, synopsis, enabled, filmActor } = req.body
        
    } catch {
        return res.status(400).send({error: "Error creating film"})
    }
    
})

module.exports = app => app.use('/films', router)

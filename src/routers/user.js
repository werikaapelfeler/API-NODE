const { default: consolaGlobalInstance } = require('consola')
const express = require('express')
const authMiddleware = require('../middlewares/auth')
const User = require('../models/User')
const router = express.Router()

router.use(authMiddleware)

router.put('/update/:id', async (req, res) => {
    try {
        const { name, email, role, enabled, password } = req.body

        const user = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            role,
            enabled,
            password
        }, { new: true })

        await user.save()
        res.status(200).send({ user: user, msg: "Successfully updating" })
    } catch (error) {
        res.status(400).send({ error: "Error updating" })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        let userToken = await User.findById(req.userId)
        if (userToken.role == 'admin') {
            await User.findByIdAndUpdate(req.params.id, { enabled: false }, { new: true })
            res.status(200).send({ msg: "Successfully deleted" })
        } else {
            res.status(401).send({ error: "User without permission" })
        }

    } catch (error) {
        res.status(400).send({ error: "Error deleting" })
    }
})

module.exports = app => app.use('/user', router)

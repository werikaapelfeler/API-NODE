const express = require('express')
const authMiddleware = require('../middlewares/auth')
const User = require('../models/User')
const router = express.Router()

router.use(authMiddleware)

router.put('/update/:id', async (req, res) => {
    try {
        const { name, email, role, active } = req.body

        const user = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            role,
            active
        }, { new: true })

        await user.save()
        res.status(200).send({ user: user, msg: "Successfully updating" })
    } catch (error) {
        res.status(400).send({ error: "Error updating" })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { active: false }, { new: true })
        res.status(200).send({ msg: "Successfully deleted" })
    } catch (error) {
        res.status(400).send({ error: "Error deleting" })
    }
})

module.exports = app => app.use('/admin', router)
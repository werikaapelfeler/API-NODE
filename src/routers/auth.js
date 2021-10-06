const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

async function userRegister(newUser, role, res) {
    try {
        const user = await User.create({ ...newUser, role: role })
        user.password = undefined
        return res.send({ user, token: generateToken({ id: user.id }) })
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Registragion Failed' })
    }

}

router.post("/register-user", async (req, res) => {
    await userRegister(req.body, "user", res);
});

router.post("/register-admin", async (req, res) => {
    await userRegister(req.body, "admin", res);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user)
        return res.status(400).send({ error: 'User not found' })

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password' })

    user.password = undefined
    res.send({ user, token: generateToken({ id: user.id }) })

})

module.exports = app => app.use('/auth', router)


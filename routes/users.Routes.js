const express = require('express')
const router = express.Router()

const { RegisterUSer, LoginUSer, LogoutUSer } = require('../controllers/users.controllers')

router.get('/', (req, res) => {
    res.render('home', {})
})
router.post('/register', RegisterUSer)
router.post('/login', LoginUSer)
router.get('/logout', LogoutUSer)

module.exports = router

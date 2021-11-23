const express = require('express')
const router = express.Router()

const productsRoutes = require('./products.Routes')
const userRoutes = require('./users.Routes')

router.use('/productos-test', productsRoutes)
router.use('/users', userRoutes)

module.exports = router

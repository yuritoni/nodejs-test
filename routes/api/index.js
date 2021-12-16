const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const product = require('./product')
const order = require('./order')
const payment = require('./payment')

router.use('/auth', [auth])
router.use('/user', [authMiddleware,user])
router.use('/product', [authMiddleware,product])
router.use('/order', [authMiddleware,order])
router.use('/payment', [authMiddleware,payment])

module.exports = router
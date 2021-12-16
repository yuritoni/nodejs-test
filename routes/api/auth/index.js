const router = require('express').Router()
const controller = require('./auth.controller')
const authMiddleware = require('../../../middlewares/auth')
const utils = require('../../../middlewares/utils')


router.post('/register',[utils.validateEmail,controller.register] )
router.post('/login', controller.login)

router.use('/check', authMiddleware)
router.get('/check', controller.check)

module.exports = router
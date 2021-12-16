

const router = require('express').Router()
const controller = require('./product.controller')

router.get('', controller.list)
router.get('/product/:id', controller.getById)

router.post('', controller.create)
router.patch('/:id', controller.patchById)
router.delete('/:id', controller.removeById)

module.exports = router
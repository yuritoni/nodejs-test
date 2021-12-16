//const orderRoutes = require('./order.controller');
//const productRoutes = require('./products_route')

const router = require('express').Router()
const controller = require('./payment.controller')

router.get('', controller.list)
router.get('/:id', controller.findById)
router.post('', controller.create)
router.patch('/:id', controller.patchById)
router.delete('/:id', controller.removeById)

module.exports = router
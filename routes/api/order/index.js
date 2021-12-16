//const orderRoutes = require('./order.controller');
//const productRoutes = require('./products_route')


const router = require('express').Router()
const controller = require('./order.controller')

router.get('/', controller.list)
router.get('/:id', controller.findById)
router.get('/getByUser/:id', controller.listbyUser)
router.post('', controller.create)
router.patch('/:id', controller.patchById)
router.delete('/:id', controller.removeById)

module.exports = router
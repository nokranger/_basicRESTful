//--------------This is nodemodule---------------//
const express = require('express')
const route = express.Router()


//--------------This is model---------------//

const checkAuth = require('../middleware/check-auth')

//--------------This is controller---------------//
const OrdersController = require('../controllers/orders')


// handle incoming get request to orders
route.get('/',checkAuth,OrdersController.orders_get_all)
route.post('/',checkAuth,OrdersController.orders_create_orders)
route.get('/:orderId',checkAuth,OrdersController.orders_get_orders)
route.delete('/:orderId',checkAuth,OrdersController.orders_delete_orders)
module.exports = route

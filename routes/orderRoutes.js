const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const isAuth = require('../middleware/auth');

orderRouter.get('/api/orders', isAuth, orderController.Orders_get);
orderRouter.post('/api/create-order', isAuth, orderController.createOrder_post);
orderRouter.get('/api/orders/:id', isAuth, orderController.getOrderById);
orderRouter.patch('/api/order-status/:id', isAuth, orderController.updateOrderStatus);

module.exports = orderRouter;
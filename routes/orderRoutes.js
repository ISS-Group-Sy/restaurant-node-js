const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const isAuth = require('../middleware/auth');

orderRouter.post('/api/create-order', isAuth, orderController.createOrder_post);

module.exports = orderRouter;
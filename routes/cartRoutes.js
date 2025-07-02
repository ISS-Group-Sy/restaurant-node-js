const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');
const isAuth = require('../middleware/auth');

cartRouter.post('/api/add-to-cart', isAuth, cartController.addToCart_post);

module.exports = cartRouter;
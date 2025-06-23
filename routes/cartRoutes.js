const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');
const isAuth = require('../middleware/auth');

cartRouter.get('/api/cart-items', isAuth, cartController.CartItems_get);
cartRouter.post('/api/add-to-cart', isAuth, cartController.addToCart_post);
cartRouter.patch('/api/update-cart', isAuth, cartController.updateCard_patch);

module.exports = cartRouter;
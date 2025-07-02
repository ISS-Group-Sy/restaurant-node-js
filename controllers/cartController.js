const MenuItem = require('../models/menu_item');
const Cart = require('../models/cart');
const CartItem = require('../models/cart_item');

module.exports.addToCart_post = async (req, res) => {
    try {
        const userId = req.user.id;
        const {menu_item_id, quantity, unit_price} = req.body;
        const menuItem = await MenuItem.findById(menu_item_id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found'});
        }
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be a positive integer' });
        }
        let cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
            cart = await Cart.create({ user_id: userId });
        }
        let cartItem = await CartItem.findOne({ cart_id: cart._id, menu_item_id: menuItem._id});
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }
        else {
            cartItem = await CartItem.create({
                cart_id: cart._id,
                menu_item_id: menuItem._id,
                quantity,
                unit_price
            });
        }
        res.status(201).json( {message: 'cart item added', cartItem: cartItem} );
    }
    catch(err) {
        res.status(500).json({ 
            message: 'Failed to add item to cart',
            error: err.message,
        });
    }
}
const Order = require('../models/order');
const OrderItems = require('../models/order_item');

module.exports.createOrder_post = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = req.body.items;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    let total_price = 0;

    for (const item of items) {
      if (
        !item.menu_item_id ||
        typeof item.quantity !== 'number' ||
        typeof item.unit_price !== 'number' ||
        item.quantity < 1 ||
        item.unit_price < 0
      ) {
        return res.status(400).json({ message: 'Invalid item format or values' });
      }

      total_price += item.quantity * item.unit_price;
    }

    const order = await Order.create({
      user_id: userId,
      total_price,
      status: 'pending',
    });

    const orderItems = items.map(item => ({
      order_id: order._id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
    }));

    const savedOrderItems = await OrderItems.insertMany(orderItems);

    res.status(201).json({
      message: 'Order created successfully',
      order: order,
      items: savedOrderItems,
    });

  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message }); 
  }
};

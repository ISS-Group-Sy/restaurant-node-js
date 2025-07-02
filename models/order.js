const mongoose = require('mongoose');

// crate order schema 
const ordeeSchema = new mongoose.Schema({
     user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
        min: [0, 'The total price cannot be negative number'],
    },
    status: {
        type: String,
    }
}, { timestamps});

module.exports = mongoose.model('Order', orderSchema);
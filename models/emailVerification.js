const mongoose = require('mongoose');

const emailVerfictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'User',
        required: true,
    },
    otpCode: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('EmailVerfiction', emailVerfictionSchema);
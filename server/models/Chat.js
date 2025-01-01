const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    latestMessage: { //Reference to the latest message
        type: mongoose.Schema.ObjectId,
        ref: 'Message',
    },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
const mongoose = require('mongoose');
const messageSchema = require('./Message');

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
    messages: [messageSchema],
    lastMessage: { 
        type: String, 
        default: ''  // Stores a preview of the most recent message
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Chat', chatSchema);

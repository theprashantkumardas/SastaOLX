
//   Message Schema

//   This schema defines the structure for storing individual messages exchanged in a chat.
//   Each message is associated with a specific chat and a sender. The schema includes the
//   following fields:
//   
//   @property {ObjectId} chatId - The ID of the chat the message belongs to. References the Chat model.
//   @property {ObjectId} sender - The ID of the user who sent the message. References the User model.
//   @property {String} content - The content of the message.
//   @property {Date} createdAt - The timestamp when the message was created. Defaults to the current date and time.
//  
//   Stores the individual messages exchanged in a chat.

const mongoose = require('mongoose');

//Define the message Schema
const messageSchema = new mongoose.Schema({
    sender: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

//Export the message model based on the schema
module.exports = messageSchema
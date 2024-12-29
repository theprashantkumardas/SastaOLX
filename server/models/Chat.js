// # Chat schema for MongoDB
// Defines the participants (buyer and seller) and stores the message IDs.

const mongoose = require('mongoose');
const User = require('./User');

//Define the chat Schema

const chatSchema = new mongoose.Schema({ // Define the chat schema
    participants: [ // Array of participant IDs
        {
            type: mongoose.Schema.ObjectId, // Reference to the User model
            ref: User, // Name of the User model
            required: true, // The participants field is mandatory
        }
    ],
    message: [ // Array of message IDs
        {                                    // Each message is stored as a reference
            type: mongoose.Schema.ObjectId,  // Reference to the Message model
            ref: 'Message',                  // Name of the Message model
            
        }
    ],
    lastMessage: {         // Last message in the chat
        type: String,
        default: 'No messages yet'
    },
    updatedAT: {           // Timestamp for the last update
        type: Date,
        default: Date.now  // Default value is the current date and time
    }
});

//Export the chat model based on the schema
module.exports = mongoose.model('Chat', chatSchema);
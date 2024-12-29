// # Handles chat-related logic (e.g., sending/receiving messages)

const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

// Create a new chat between buyer and seller
exports.createChat = async (req, res) => {              
    const { buyerId, sellerId } = req.body;

    try {                                               
        // Check if chat already exists
        let chat = await Chat.findOne({
            participants: { $all: [buyerId, sellerId] },        // Find chat with both buyer and seller
        });

        if (!chat) {
            chat = new Chat({ participants: [buyerId, sellerId] });  // Create new chat if it doesn't exist
            await chat.save();
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create chat' });
    }
};

// Fetch all chats for a user
exports.getUserChats = async (req, res) => {
    const userId = req.params.userId;  // Get the user ID from the request

    try {
        const chats = await Chat.find({ participants: userId })
            .populate('participants', 'name email')
            .populate('messages');

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats' });
    }
};

// Send a new message
exports.sendMessage = async (req, res) => {
    const { chatId, senderId, content } = req.body;  // Get chat ID, sender ID, and message content from the request

    try {
        // Create a new message
        const message = new Message({ chatId, sender: senderId, content });
        await message.save();

        // Update chat with the new message
        const chat = await Chat.findById(chatId);
        chat.messages.push(message._id);
        chat.lastMessage = content;
        chat.updatedAt = Date.now();
        await chat.save();

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
};
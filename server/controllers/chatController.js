const Chat = require('../models/Chat');
const Message = require('../models/Message');

const initiateChat = async (req, res) => {
    try {
        const { buyerId, productId } = req.body;
        const sellerId = req.user._id; // Assuming logged-in user is the seller.

        // Check if chat already exists
        let chat = await Chat.findOne({ buyer: buyerId, seller: sellerId, product: productId });
        const product = await Product.findById(productId);
        product.chatId = chat._id;
        await product.save();
        
        if (!chat) {
            // Create a new chat if it doesn't exist
            chat = new Chat({
                buyer: buyerId,
                seller: sellerId,
                product: productId,
                messages: [],
            });
            await chat.save();
        }

        res.status(200).json({ chatId: chat._id }); // Return the chatId
    } catch (error) {
        res.status(500).json({ error: 'Failed to initiate chat.' });
    }
};


// Fetch all chats for the logged-in seller
const getSellerChats = async (req, res) => {
    try {
        const sellerId = req.user._id; // Assuming req.user contains the logged-in user
        const chats = await Chat.find({ seller: sellerId })
            .populate('buyer', 'name') // Populate buyer's name
            .populate('product', 'name') // Populate product name
            .populate('messages', 'content timestamp') // Include last messages
            .sort({ 'messages.timestamp': -1 }); // Sort by last message timestamp

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats.' });
    }
};

// Fetch messages for a specific chat
const getMessagesForChat = async (req, res) => {
    try {
        const { chatId } = req.params;

        // Validate `chatId`
        if (!chatId) {
            return res.status(400).json({ error: 'Chat ID is required.' });
        }

        const chat = await Chat.findById(chatId).populate('messages.sender', 'name email').populate('messages');  // Populating sender informationpopulate('messages');

        if (!chat) {
            return res.status(404).json({ error: 'Chat not found.' });
        }

        res.status(200).json(chat.messages);
    } catch (error) {
        console.error(error); // Added logging to debug errors
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
};

// Send a message in a chat
const sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { content } = req.body;

        if (!chatId) {
            return res.status(400).json({ error: 'Chat ID is required.' });
        }

        const sender = req.user._id;

        const newMessage = {
            sender,
            content,
            timestamp: new Date(),
        };

        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { messages: newMessage } }, // Add new message
            { new: true }
        );

        if (!chat) {
            return res.status(404).json({ error: 'Chat not found.' });
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error); // Added logging to debug errors
        res.status(500).json({ error: 'Failed to send message.' });
    }
};

module.exports = {initiateChat, getSellerChats, getMessagesForChat, sendMessage };

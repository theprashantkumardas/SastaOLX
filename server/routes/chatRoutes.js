const express = require('express');
const { 
    initiateChat,
    getSellerChats, 
    getMessagesForChat, 
    sendMessage 
} = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure user is authenticated

const router = express.Router();

// Route to get all chats for the logged-in seller
router.get('/seller-chats', authMiddleware, getSellerChats);

// Route to fetch all messages for a specific chat
router.get('/:chatId/messages', authMiddleware, getMessagesForChat);

// Route to send a message in a specific chat
router.post('/:chatId/messages', authMiddleware, sendMessage);

// Route to Initiate a Chat (Added this line)
router.post('/', authMiddleware, initiateChat);

module.exports = router;

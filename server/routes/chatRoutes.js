// # API routes for chat system

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route to create a chat
router.post('/create', chatController.createChat);

// Route to get chats for a user
router.get('/:userId', chatController.getUserChats);

// Route to send a message
router.post('/message', chatController.sendMessage);

module.exports = router;

const { Server } = require('socket.io');
const Chat = require('../models/Chat');

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000', // frontend URL
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Join a chat room based on the chatId
        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });

        // Listen for new messages
        socket.on('sendMessage', async ({ chatId, senderId, content }) => {
            const message = { sender: senderId, content };

            try {
                const chat = await Chat.findById(chatId);
                chat.messages.push(message);
                await chat.save();

                // Emit the new message to all clients in the chat room
                io.to(chatId).emit('receiveMessage', message);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = { setupSocket };

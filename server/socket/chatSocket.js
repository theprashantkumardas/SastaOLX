// # Manages WebSocket events

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Join a chat room
        socket.on('joinRoom', (chatId) => {
            socket.join(chatId);
            console.log(`User joined room: ${chatId}`);
        });

        // Handle sending messages
        socket.on('sendMessage', ({ chatId, senderId, content }) => {
            io.to(chatId).emit('receiveMessage', { senderId, content });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

module.exports = socketHandler;

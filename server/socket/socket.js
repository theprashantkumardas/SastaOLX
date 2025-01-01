const { Server } = require('socket.io');
const Chat = require('../models/Chat');
const Message = require('../models/Message')
const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    });

    let connectedUsers = {};

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("setup", (userData) => {
            connectedUsers[userData._id] = socket.id;
            socket.join(userData._id);

        })

         socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });


       socket.on('sendMessage', async ({ chatId, senderId, content }) => {
        try {
                const message = new Message({
                    chatId,
                    sender:senderId,
                    content,
                });

                await message.save();

                  const chat = await Chat.findByIdAndUpdate(
                    chatId,
                    {
                        latestMessage: message._id,
                    },
                    {new: true}
                 );
                // Emit the new message to all clients in the chat room
                const messageWithSender = await Message.findById(message._id).populate('sender', 'name email')
               
                chat.users.forEach(user => {
                  if(user._id === senderId) return;
                  if(connectedUsers[user._id]){
                      socket.to(connectedUsers[user._id]).emit("receiveMessage", messageWithSender)
                    }
                })


            } catch (error) {
                console.error('Error saving message:', error);
            }
        });
    
        socket.on('disconnect', () => {
              Object.keys(connectedUsers).forEach(key => {
                if(connectedUsers[key] === socket.id){
                    delete connectedUsers[key]
                }
            })
            console.log('User disconnected');
        });
    });
};

module.exports = { setupSocket };
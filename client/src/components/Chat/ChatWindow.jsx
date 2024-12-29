import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatWindow = ({ chat, userId, socket }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch messages when a chat is selected
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/chat/${chat._id}/messages`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        // Join Socket.IO room for this chat
        socket.emit('joinRoom', chat._id);

        // Listen for incoming messages
        socket.on('receiveMessage', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [chat._id, socket]);

    const sendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const messageData = {
                chatId: chat._id,
                senderId: userId,
                content: newMessage,
            };

            // Save message to backend
            const response = await axios.post(`http://localhost:7000/api/chat/message`, messageData);

            // Emit the message via Socket.IO
            socket.emit('sendMessage', { ...messageData });

            // Update messages locally
            setMessages((prev) => [...prev, response.data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`mb-2 p-2 rounded-lg ${
                            message.sender === userId ? 'bg-blue-100 self-end' : 'bg-gray-200'
                        }`}
                    >
                        <p>{message.content}</p>
                        <p className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>

            {/* Input Field */}
            <div className="p-4 border-t flex items-center">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border rounded-lg p-2 mr-2"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;

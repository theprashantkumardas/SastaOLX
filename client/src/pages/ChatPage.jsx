import React, { useState, useEffect } from 'react';
import ChatList from '../components/Chat/ChatList';
import ChatWindow from '../components/Chat/ChatWindow';
import io from 'socket.io-client';

const socket = io('http://localhost:7000'); // Connect to backend Socket.IO server

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null); // Track the currently selected chat
    const [userId, setUserId] = useState(''); // Replace with user ID from auth (e.g., context or API)

    useEffect(() => {
        // Fetch authenticated user's ID here (replace mock data)
        setUserId('63f6d3bc3e8b2b001a6baf12'); // Example user ID
    }, []);

    return (
        <div className="flex h-screen">
            {/* Chat List Sidebar */}
            <div className="w-1/3 bg-gray-100 border-r overflow-y-auto">
                <ChatList userId={userId} setSelectedChat={setSelectedChat} />
            </div>

            {/* Chat Window */}
            <div className="w-2/3">
                {selectedChat ? (
                    <ChatWindow
                        chat={selectedChat}
                        userId={userId}
                        socket={socket}
                    />
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;

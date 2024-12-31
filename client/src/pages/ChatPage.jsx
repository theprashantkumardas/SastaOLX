import React, { useState, useEffect } from 'react';
import ChatList from '../components/Chat/ChatList';
import ChatWindow from '../components/Chat/ChatWindow';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null); // Stores the currently selected chat
  const [userId, setUserId] = useState(null); // Logged-in user's ID

  useEffect(() => {
    // Simulate fetching logged-in user's ID from authentication
    const fetchUserId = async () => {
        try {
          const response = await fetch('/api/auth/user'); // Adjust to match your auth route
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          const data = await response.json();
          console.log('Fetched user ID:', data._id);
          setUserId(data._id);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle the error, such as setting a fallback state or notifying the user
        }
    };
    fetchUserId();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left-side Chat List */}
      <div className="w-1/3 border-r">
        <ChatList userId={userId} onSelectChat={setSelectedChat} />
      </div>

      {/* Right-side Chat Window */}
      <div className="w-2/3">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} userId={userId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a chat to view messages
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

import React, { useState, useEffect } from 'react';
import ChatList from '../components/Chat/ChatList';
import ChatWindow from '../components/Chat/ChatWindow';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null); // Stores the currently selected chat
  const [userId, setUserId] = useState(null); // Logged-in user's ID
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate fetching logged-in user's ID from authentication
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setUserId(user._id);
      console.log(userId);
      setLoading(false);
    } else {
       console.log("user not found")
       setLoading(false);
    }
    console.log("user id ", userId)
  }, [userId]);

  return (
    <div className="flex h-screen">
      {/* Left-side Chat List */}
      <div className="w-1/3 border-r">
          {loading ? (<p>Loading...</p>):(<ChatList userId={userId} onSelectChat={setSelectedChat} />)}

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
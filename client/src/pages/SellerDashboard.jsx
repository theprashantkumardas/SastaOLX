import React, { useState, useEffect } from "react";
import axios from "axios";

const SellerDashboard = () => {
  const [chats, setChats] = useState([]); // List of chats
  const [selectedChat, setSelectedChat] = useState(null); // Currently selected chat
  const [messages, setMessages] = useState([]); // Messages of selected chat
  const [newMessage, setNewMessage] = useState(""); // Input for new message

  // Fetch chats on component mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/chats"); // Endpoint for chats
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, []);

  // Fetch messages for selected chat
  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:7000/api/messages/${selectedChat.chatId}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedChat]);

  // Send a message
  const sendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      try {
        const response = await axios.post("http://localhost:7000/api/messages", {
          chatId: selectedChat.chatId,
          content: newMessage,
        });
        setMessages((prev) => [...prev, response.data]); // Update messages
        setNewMessage(""); // Clear input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar - Chat List */}
      <div className="w-1/3 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        {chats.map((chat) => (
          <div
            key={chat.chatId}
            className={`p-4 border rounded mb-2 cursor-pointer ${
              selectedChat?.chatId === chat.chatId ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            <h3 className="text-lg font-semibold">{chat.buyerName || chat.sellerName}</h3>
            <p className="text-gray-600 text-sm">{chat.productName}</p>
            <p className="text-gray-500 text-xs">{chat.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* Right Side - Chat Window */}
      <div className="w-2/3 flex flex-col p-4">
        {selectedChat ? (
          <>
            {/* Product Details */}
            <div className="mb-4 p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold">{selectedChat.productName}</h2>
              <p className="text-gray-600">{selectedChat.productDescription}</p>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto bg-gray-50 p-4 rounded shadow">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded ${
                    msg.senderId === selectedChat.sellerId
                      ? "bg-blue-200 self-end"
                      : "bg-gray-200 self-start"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-500">{msg.timestamp}</p>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="mt-4 flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">Select a chat to start messaging</p>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;

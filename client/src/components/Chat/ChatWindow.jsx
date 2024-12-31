import React, { useEffect, useState } from 'react';

const ChatWindow = ({ chat, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log("Chat data:", chat);
    if (!chat || !chat._id) {
        console.error("Invalid chat data:", chat);
        return;
    }

    // Fetch messages for the selected chat
    const fetchMessages = async () => {
        try {
            const response = await fetch(`/api/chats/${chat._id}/messages`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            console.log(data)
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };
    fetchMessages();
  }, [chat]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const response = await fetch(`/api/chats/${chat._id}/messages`, { //// Problematic line
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ content: newMessage }),
    });

    if (response.ok) {
      const sentMessage = await response.json();
      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`mb-2 ${
              message.sender === userId ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.sender === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

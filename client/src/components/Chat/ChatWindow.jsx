import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:7000");

const ChatWindow = ({ chat, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!chat || !chat._id) {
            console.error("Invalid chat data:", chat);
            return;
        }

       socket.emit("joinChat", chat._id);

    }, [chat]);
    
    useEffect(() => {
        if(!chat) return;

         // Fetch messages for the selected chat
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:7000/api/chat/${chat._id}/messages`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const data = await response.json();
                console.log("Fetched Messages:", data);
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
     }, [chat])

    useEffect(() => {
           socket.on("receiveMessage", (message) => {
                setMessages((prev) => [...prev, message])
           })
           return () => {
               socket.off("receiveMessage")
           }
    }, [messages])



  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chat) return;
    try {
            const response = await fetch(`http://localhost:7000/api/chat/${chat._id}/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ content: newMessage }),
            });

            if (response.ok) {
                const sentMessage = await response.json();
                    socket.emit("sendMessage", {
                        chatId: chat._id,
                        senderId: userId,
                        content: sentMessage.content
                    })
                setNewMessage('');
            }
     } catch(error) {
        console.log("error sending message", error);
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
              message.sender._id === userId ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                  message.sender._id === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
                 {message.sender.name} : {message.content}
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
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:7000");

const ChatList = ({ userId, onSelectChat }) => {
  const [chats, setChats] = useState([]);

    useEffect(() => {
      if(!userId) return;
        socket.emit("setup", { _id: userId });
    },[userId])

  useEffect(() => {
    // Fetch seller chats
    const fetchChats = async () => {
      if(!userId) return;
        try {
           
           
          const response = await fetch('http://localhost:7000/api/chat/seller-chats', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch chats');
          }
          const data = await response.json();
          console.log('Fetched chats:', data); // Debugging
          setChats(data);
        } catch (error) {
          console.error('Error fetching chats:', error);
        }
      };
    fetchChats();
  }, [userId]);

  return (
    <div className="h-full overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="p-4 border-b cursor-pointer hover:bg-gray-100"
          onClick={() => {
            console.log('Selected chat:', chat);
            onSelectChat(chat)
          }}
        >
          <h3 className="font-semibold">{chat.buyer.name}</h3>
          <p className="text-sm text-gray-500">{chat.product.name}</p>
             {chat.latestMessage && <p className="text-sm text-gray-500">{chat.latestMessage.sender.name} : {chat.latestMessage.content}</p>}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
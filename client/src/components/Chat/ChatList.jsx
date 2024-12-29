import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatList = ({ userId, setSelectedChat }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/chat/${userId}`);
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, [userId]);

    return (
        <div>
            <h2 className="text-xl font-bold p-4">Chats</h2>
            <ul>
                {chats.map((chat) => (
                    <li
                        key={chat._id}
                        className="p-4 border-b cursor-pointer hover:bg-gray-200"
                        onClick={() => setSelectedChat(chat)}
                    >
                        {chat.participants.map((user) => user._id !== userId && user.name).join(', ')}
                        <p className="text-gray-500 text-sm">{chat.lastMessage}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;

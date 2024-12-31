import React from 'react';
import {   useNavigate, useLocation } from 'react-router-dom';

const ProductDetail = () => {
    const navigate = useNavigate();
    // const { id } = useParams(); // Get product ID from URL
    const { state } = useLocation();
    const { product, userId } = state || {}; // Retrieve product and userId

    if (!product) {
        return <p>Product details not available.</p>; // Handle missing product
    }

    const handleChat = () => {
        navigate(`/chat/${product.chatId}`, { state: { chatId: product.chatId, userId } });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <button
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleChat}
            >
                Chat with Seller
            </button>
        </div>
    );
};

export default ProductDetail;

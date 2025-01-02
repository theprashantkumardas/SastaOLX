import React, { useEffect, useState } from 'react';
import {   useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const navigate = useNavigate();
    // const { id } = useParams(); // Get product ID from URL
    const { state } = useLocation();
    const { product } = state || {}; // Retrieve product and userId
    // const { product, userId: userIdFromProductList } = state || {}; // Retrieve product and userId
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if(storedUser) {
           const user = JSON.parse(storedUser);
           setUserId(user._id);
           console.log(user._id);
        } else {
            console.log("User Not found");
        }
        setLoading(false);
    }, []);

    if (!product) {
        return <p>Product details not available.</p>; // Handle missing product
    }

    const handleChat = async () => {
        if(!product) return console.log("No product found");
          try {
                console.log('Sending request with: ', {buyerId: userId, productId: product._id}) // added log

                const response = await axios.post(`http://localhost:7000/api/chat`, {
                    buyerId: userId,
                    productId: product._id
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if(response.data.chatId){
                        navigate(`/chat`, { });
                } else {
                        console.log("Couldnt create chat");
                }
          } catch (error) {
               console.log(error)
          }
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
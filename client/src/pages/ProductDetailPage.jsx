import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Fotter/Fotter";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { product } = state || {}; // Retrieve product data from state
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user._id);
      console.log(user._id);
      console.log(userId)
    } else {
      console.log("User not found");
    }
  }, []);

  useEffect(()=>{
    console.log("User ID after setUserId Product Detail", userId);  // This is asynchronous, and logs after change.
  }, [userId])

  if (!product) {
    return <p>Product details not available.</p>; // Handle missing product
  }

  const handleChat = async () => {
    if (!product) return console.log("No product found");
    try {
      console.log("Sending request with: ", {
        buyerId: userId,
        productId: product._id,
      }); // Debugging log

      const response = await axios.post(
        `http://localhost:7000/api/chat`,
        {
          buyerId: userId,
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.chatId) {
        navigate(`/chat`);
      } else {
        console.log("Couldn't create chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/cart/add-to-cart', {
            userId: userId,       // Change localStorage to userId
            productId: product._id,
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.status === 200) {
            alert('Product added to cart');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Could not add to cart');
    }
};

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-4 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="flex flex-col space-y-4 p-4">
            <img
              src={product.image || "https://flowbite.com/docs/images/products/apple-watch.png"}
              alt={product.name}
              className="w-full rounded-lg shadow-lg p-3"
            />
            <div className="flex space-x-4 overflow-x-auto">
              {[...Array(4)].map((_, index) => (
                <img
                  key={index}
                  src={product.image || "https://via.placeholder.com/100"}
                  alt={`Gallery ${index + 1}`}
                  className="w-20 h-20 rounded-lg object-cover cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm mb-4 text-orange-900">(122 reviews)</p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description ||
                "A high-quality product made with precision and care."}
            </p>
            <p className="text-3xl text-green-600 font-semibold mb-4">
              ${product.price}
            </p>
            
            <div className="mb-6">
              <span className="text-lg font-semibold">Select Size: </span>
              <div className="flex space-x-2 mt-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="border px-4 py-2 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className=" flex items-center gap-2" >
            <button
              onClick={handleAddToCart}
              className="w-full h-14 bg-black text-white py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add to Cart
            </button>
            <button
              onClick={handleChat}
              className="w-full h-14 bg-black text-white py-3 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Chat with Seller
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8">
            <p className="text-sm text-gray-500">
              100% Original product.
            </p>
            <p className="text-sm text-gray-500">
            Easy return and exchange policy within 7 days.
            </p>
            <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, recusandae?            
            </p>

          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
//         <div className="flex flex-col md:flex-row">
//           {/* Product Image */}
//           <div className="md:w-1/2 flex justify-center">
//             <img
//               src="https://flowbite.com/docs/images/products/apple-watch.png" // Replace with actual image
//               alt={product.name}
//               className="rounded-lg w-full max-w-md object-cover"
//             />
//           </div>
//           {/* Product Details */}
//           <div className="md:w-1/2 md:pl-6 flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 {product.name}
//               </h2>
//               <p className="text-gray-600 mb-4">{product.description}</p>
//               <p className="mb-2">
//                 <span className="font-semibold">Category:</span>{" "}
//                 {product.category || "N/A"}
//               </p>
//               <p className="mb-4">
//                 <span className="font-semibold">Subcategory:</span>{" "}
//                 {product.subcategory || "N/A"}
//               </p>
//               <p className="text-2xl font-bold text-blue-600 mb-4">
                
//                 ${product.price}
//               </p>
//             </div>
//             <div className="mt-4 space-y-4">
//               <button
//                 className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onClick={handleChat}
//               >
//                 Chat with Seller
//               </button>
//               <button
//                 className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 onClick={handleAddToCart}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
};

export default ProductDetail;

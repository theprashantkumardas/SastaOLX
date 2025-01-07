import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null); // State for userId
  const navigate = useNavigate();

  // Assuming you have a way to retrieve the logged-in userId (JWT, localStorage, etc.)
  useEffect(() => {
    // Retrieve userId from authentication context or localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Example: assuming user data is saved in localStorage
    if (user) {
      setUserId(user._id);
      console.log(user._id);
      console.log(userId);
    } else {
      // Handle case when user is not logged in (redirect, show message, etc.)
      navigate('/login');
    }
  }, [navigate]);

  // useEffect(()=>{  // This is synchronous, and logs before change.
  useEffect(()=>{
    console.log("User Id after setUserId Cart Page", userId);
  }, [userId])



  useEffect(() => {
    if (userId) {
      console.log("user id inside use effect" ,userId);
      // Fetch cart items for this user from the backend
      axios
        .get(`http://localhost:7000/api/cart/${userId}`, {
            headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the header
              },
        })
        .then((response) => {
          setCartItems(response.data.addToCart); // Assuming the cart items are in addToCart
          console.log("cart data", response.data.addToCart);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
          
        });
    }
  }, [userId]);

  const handleRemoveItem = (productId) => {
    // Remove item from cart (send request to backend)
    axios
    .delete(`http://localhost:7000/api/cart/remove/${userId}/${productId}`,{
        headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the header
          },
    })
      .then((response) => {
        setCartItems(cartItems.filter(item => item.productId.toString() !== productId));
      })
      .catch((error) => {
        console.error('Error removing item:', error);
      });
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty. Add some items to your cart!</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.productId?.imageUrl ||
                      'https://flowbite.com/docs/images/products/apple-watch.png'
                    }
                    alt={item.productId?.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.productId?.name}</h2>
                    <p className="text-gray-600">{item.productId?.description || 'No description available.'}</p>
                    <p className="text-gray-800 font-semibold">${item.productId?.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                  <button
                    onClick={() => handleRemoveItem(item.productId._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/3 p-4 border rounded-lg shadow-md bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">
                $
                {cartItems
                  .reduce((total, item) => total + item.productId?.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Shipping Fee</span>
              <span className="font-semibold">$10.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-4">
              <span>Total</span>
              <span>
                $
                {(
                  cartItems.reduce(
                    (total, item) => total + item.productId?.price * item.quantity,
                    0
                  ) + 10
                ).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

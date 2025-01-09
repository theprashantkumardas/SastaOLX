import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faTruckFast, faGift } from '@fortawesome/free-solid-svg-icons';

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch the latest products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token
        const response = await axios.get(
          "http://localhost:7000/api/product/get-products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Set only the latest 3 products
        setProducts(response.data.slice(0, 3));
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response?.data || error.message
        ); // Log errors
        setMessage("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []); // Run once after the component mounts

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl mt-10 font-bold text-black mb-6">Latest Products</h2>
      {message && (
        <p className="text-center text-red-600 font-medium">{message}</p>
      )}
      {products?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 w-full">
          {products.map((product) => (
            <div
              key={product._id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-[24px]"
              onClick={() => handleProductClick(product)}
            >
              <img
                className="p-6 rounded-t-lg"
                src="https://flowbite.com/docs/images/products/apple-watch.png"
                alt={product.name}
              />
              <div className="px-5 pb-5">
                <h5 className="text-lg font-bold text-gray-900 mb-2">
                  {product.brand}
                </h5>
                <p className="text-xl font-semibold text-gray-700 mb-4">{product.name}</p>
                <div className="mt-4 flex items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                  <div className="ml-4 px-2 py-1 border border-gray-600 rounded text-green-600 font-semibold">
                    50% off
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm mt-4 gap-4">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faTruckFast} />
                    Free shipping
                  </div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faGift} />
                    Free gift
                  </div>
                </div>
                <div className="mt-4 flex flex-row items-center w-full gap-2">
                  <button
                    className="flex-grow bg-black text-white py-2 px-4 rounded-[36px] font-semibold text-center hover:bg-green-700 transition duration-200"
                    onClick={() => handleProductClick(product)}
                  >
                    View Deal
                  </button>
                  <button
                    className="w-[40px] h-[40px] rounded-full border border-black text-black flex items-center justify-center"
                  >
                    <FontAwesomeIcon className="w-4" icon={faCartPlus} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
};

export default HomeProducts;

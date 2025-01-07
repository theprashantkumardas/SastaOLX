import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user._id);
      console.log(user._id);
      console.log(userId);
    } else {
      console.log("User Not found");
      // setLoading(false);
    }
  }, []);

  // useEffect(()=>{  // This is synchronous, and logs before change.
  useEffect(()=>{
    console.log("User ID after setUserId", userId);  // This is asynchronous, and logs after change.
  }, [userId])

  // Fetch products from the server
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
        console.log("Fetched products:", response.data); // Log fetched products
        setProducts(response.data);
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
    navigate(`/product/${product._id}`, { state: { product, userId: userId } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-wrap justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center w-full">
        Product List
      </h2>
      {message && (
        <p className="text-center text-red-600 font-medium w-full">{message}</p>
      )}
      { products?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {products.map((product) => (
            <div
              key={product._id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-200"
              onClick={() => handleProductClick(product)} // Navigate to ProductDetail
            >
              <img
                className="p-8 rounded-t-lg"
                src="https://flowbite.com/docs/images/products/apple-watch.png"
                alt="Product"
              />
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                  {product.name}
                </h5>
                <div className="mt-2 mb-5">
                  <p className="text-gray-600">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 w-full">No products available</p>
      )}
    </div>
  );
};

export default ProductList;

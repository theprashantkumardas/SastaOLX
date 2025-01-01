import React, { useEffect, useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate(); // Hook for navigation
  
  // State to hold the product details
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  // Check for authentication on component load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register"); // Redirect to register if not authenticated
    }
  }, [navigate]);


  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`); // Debugging the input values
    setProduct({ ...product, [name]: value });
  };

  // Function to handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting product:", product); // Log product data before submitting
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      console.log("Token being sent:", token);
      
      const response = await axios.post(
        "http://localhost:7000/api/product/add",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        }
      );
      console.log("Response: ", response.data); // Log the response data
      setMessage("Product added successfully"); // Set the message to be displayed on successful product addition
    } catch (error) {
      console.error(
        "Error adding product: ",
        error.response?.data || error.message
      ); // Log the error
      setMessage("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows="4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Product
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
import React, { useState }  from "react";
import apiClient from "../api/apiClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Login component to login a user
const Login = () => {
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    //Handle form input change
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value})
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7000/api/auth/login', formData); //Send Logn data to the backend by binding with "formData"through the "login" api route
            setMessage("User logged in successfully"); //Set the message to be displayed on successful login
            localStorage.setItem('token', response.data.token); //Store the token in local storage
            localStorage.setItem('user', JSON.stringify(response.data.user)); //Store the user object in local storage
            
            // navigate("/shop");// Redirect to Add Product page
        } catch (error) {
            setMessage(error.response.data.message || "Login failed"); //Set the message to be displayed on failed login
        }

    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>

        {message && (
          <p className="text-center text-green-600 text-sm mt-4">{message}</p>
        )}
      </div>
      {message && <p>{message}</p>} {/* Show success or error message */}

    </div>

    );

};

export default Login;
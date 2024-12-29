import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  // State for storing user profile data
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
  });

  // State for handling form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // State for success/error messages

  useEffect(() => {
    // Fetch current user profile on component mount
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: "",
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
        setMessage("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for updating profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:7000/api/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message || "Profile updated successfully");
    } catch (error) {
      setMessage(error.response.data.message || "Failed to update profile");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          User Profile
        </h2>

        {/* Profile Details */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            {/* You can add profile image here later */}
            <div className="rounded-full w-24 h-24 bg-gray-300 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{user.name[0]}</span>
            </div>
          </div>
          <p className="text-center text-lg">{user.name}</p>
          <p className="text-center text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Update Profile Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </div>
        </form>

        {/* Display message */}
        {message && (
          <p className="text-center text-green-600 text-sm mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

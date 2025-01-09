import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Fotter/Fotter";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
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
          address: response.data.address,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
        setMessage("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      setMessage(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <>



      <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
        <div className="w-full flex items-center justify-around my-6" >
          <div className="flex items-center gap-4">
            <p>Home / </p>
            <p>Profile</p>
          </div>
          <p>Welcome <span className="text-red-500 mx-2">{formData.name}</span> </p>

        </div>

        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 border-r border-gray-300">
            <h2 className="text-lg font-semibold mb-4">My Account</h2>
            <ul className="space-y-4">
              <li className="text-red-500 font-medium cursor-pointer">My Profile</li>
              <li className="text-gray-600 hover:text-red-500 cursor-pointer">Address Book</li>
              <li className="text-gray-600 hover:text-red-500 cursor-pointer">My Payment Options</li>
              <li className="text-gray-600 hover:text-red-500 cursor-pointer">My Returns</li>
              <li className="text-gray-600 hover:text-red-500 cursor-pointer">My Cancellations</li>
            </ul>
          </div>

          {/* Profile Form */}
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold mb-6 text-red-500">Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>


              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 shadow-sm focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-md font-semibold">Password Changes</h3>

                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-black rounded-full hover:bg-red-600"
                >
                  Save Changes
                </button>
              </div>
            </form>

            {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Profile;

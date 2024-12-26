import React, { useState }  from "react";
import apiClient from "../api/apiClient";
import axios from "axios";

//Login component to login a user
const Login = () => {
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
        } catch (error) {
            setMessage(error.response.data.message || "Login failed"); //Set the message to be displayed on failed login
        }

    };

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email} 
                    onChange={handleChange}
                />
                
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password} 
                    onChange={handleChange}
                />
                
                <button type="submit">Login</button>

            </form>
            {message && <p>{message}</p>} {/* Show success or error message */}
        </div>
    );

};

export default Login;
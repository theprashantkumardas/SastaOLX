import React, { use, useState } from "react";
import apiClient  from "../api/apiClient";
import axios from "axios";

//Register component to register a new user
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    //Handle the form input
    const handleChange = (e) => {
        const {name, value} = e.target; //Extract field name and value
        setFormData({ ...formData, [name]: value}); //Update state with new value  -> to be visible on screen or text field

    };

    //Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); //Prevent page reload on form submit
        try {
            const response = await axios.post('http://localhost:7000/api/auth/register' , formData); //Send data to the backend by binding inside formData variable through the register api route
            setMessage("User registered successfully"); //Set the message to be displayed on successful registration
        } catch (error) {
            setMessage(error.response.data.message || "Registration failed"); //Set the message to be displayed on failed registration
        }
    };

    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>

                <input 
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange} 
                />

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

                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}  {/*show success and error message*/}
        </div>
    )


};

export default Register;
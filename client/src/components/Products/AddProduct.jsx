import React , { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    //State to hold the product details

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
    });
    const [message, setMessage] = useState('');

    //Function to handle imput change
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed: ${name} = ${value}`); // Debugging the input values
        setProduct({ ...product, [name]: value });
        // console.log("Updated ${e.target.name}: " , e.product.value);
    };

    //Function to handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting product:', product); // Log product data before submitting
        try {
            const token = localStorage.getItem('token'); //Retrieve token from local storage
            const response = await axios.post('http://localhost:7000/api/product/add', product, {
                headers: {
                    Authorization: `Bearer ${token}` //Pass the token in the header
                }
            });
            console.log("Response: " , response.data); //Log the response data
            setMessage("Product added successfully"); //Set the message to be displayed on successful product addition
        } catch (error) {
            console.error("Error adding product: ", error.response?.data || error.message); //Log the error 
            setMessage('Failed to add product');
        }
    };

    return (
        <div>
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={product.price}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={product.description}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Product</button>
          </form>
          {message && <p>{message}</p>}
        </div>
    );
};

export default AddProduct;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token
        const response = await axios.get('http://localhost:7000/api/product/get-products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched products:', response.data); // Log fetched products
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message); // Log errors
        setMessage('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []); // Run once after the component mounts

  return (
    <div>
      <h2>Product List</h2>
      {message && <p>{message}</p>}
      {products?.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;

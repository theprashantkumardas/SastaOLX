// This file handles the routes related to product management.

const express = require('express');
const { createProduct } = require('../controllers/productController');
const { getAllProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

//Route to create a new product (only accesseble to authenticated users)
router.post('/add' , authMiddleware , createProduct);
router.get('/get-products', authMiddleware, getAllProducts);


module.exports = router; // Exports the router to use in server.js


// This file handles the routes related to product management.

const express = require('express');
const { createProduct } = require('../controllers/productController');
const { getAllProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); 
const checkRole = require('../middleware/checkRoleMiddleware'); // Import checkRoleMiddleware

const router = express.Router();

// Route to create a new product (only accessible to authenticated users with 'seller' or 'both' roles)
router.post('/add', authMiddleware, checkRole(['seller', 'both']), createProduct);

// Route to get all products (accessible to all authenticated users)
router.get('/get-products', authMiddleware, getAllProducts);


module.exports = router; // Exports the router to use in server.js



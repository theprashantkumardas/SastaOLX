// This file handles the routes related to product management.

const express = require('express');
const { createProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

//Route to create a new product (only accesseble to authenticated users)
router.post('/product' , authMiddleware , createProduct);

module.exports = router; // Exports the router to use in server.js


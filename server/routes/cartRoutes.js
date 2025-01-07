const express = require('express');
const { addToCart, removeFromCart, getCartItems } = require('../controllers/cartControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//Route to add a product to the cart
router.post('/add-to-cart',authMiddleware, addToCart);

// Route to remove a product from the cart
router.delete('/remove/:userId/:productId',authMiddleware, removeFromCart);

// Route to get all products in the cart
router.get('/:userId', authMiddleware, getCartItems); 

module.exports = router; //Export the router to use in server.js

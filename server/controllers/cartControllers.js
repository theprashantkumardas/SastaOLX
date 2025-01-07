const User = require('../models/User'); // Import the User model

exports.addToCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        // Check if product already exists in the cart
        const existingProduct = user.addToCart.find(item => item.productId.toString() === productId);

        if (existingProduct) {
            // Increment quantity if product already in cart
            existingProduct.quantity += 1;
        } else {
            // Add new product to cart
            user.addToCart.push({ productId });
        }

        await user.save();
        res.status(200).send('Product added to cart');
    } catch (error) {
        res.status(500).send('Error adding to cart');
    
    }
};

exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        // Remove the product from the cart
        user.addToCart = user.addToCart.filter(item => item.productId.toString() !== productId);

        await user.save();
        res.status(200).send('Product removed from cart');
    } catch (error) {
        res.status(500).send('Error removing from cart');
    }
};

exports.getCartItems = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('addToCart.productId'); // addToCard is an array of objects with productId
        if (!user) return res.status(404).send('User not found');

        res.status(200).json({addToCart: user.addToCart});
    } catch (error) {
        res.status(500).send('Error fetching cart items');
    }
};
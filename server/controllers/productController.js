const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const { name, description, price, imageUrl, category, subcategory } = req.body;
    const { userId, role } = req.user;

    try {
        if (role !== 'seller' && role !== 'both') {
            return res.status(403).json({ message: "Access denied. Only sellers can create products." });
        }

        // Validate category
        const validCategories = [
            'electronics',
            'vehicles',
            'real-estate',
            'home-furniture',
            'fashion-beauty',
            'books-sports-hobbies',
            'jobs',
            'services',
            'pets-animals',
            'miscellaneous'
        ];

        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: "Invalid category selected" });
        }

        // Create the product object
        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            sellerId: userId,
            category,
            subcategory
        });

        await product.save();
        res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
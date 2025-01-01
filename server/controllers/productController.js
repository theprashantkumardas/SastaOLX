const Product = require('../models/Product')

exports.createProduct = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    const { userId, role } = req.user;

    try {
        if (role !== 'seller' && role !== 'both') {
            return res.status(403).json({ message: "Access denied. Only sellers can create products." });
        }

        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            sellerId: userId,
        });

        await product.save();
        res.status(201).json({ messsage: "Product created successfully", product });

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
// This file handles the logic for adding a new product to the platform.

const Product = require('../models/Product') //PRoduct model

//Create a new product

exports.createProduct = async( req, res ) => {
    const {name, description, price, imageUrl} = req.body;
    const { userId } = req.user; //This user ID from the authentication middleware

    try {
        //Create a new produc document
        const product = new Product({
            name ,
            description,
            price,
            imageUrl,
            sellerId: userId, //associate  product with the logged-in User
        });

        //Save the product to the database
        await product.save();

        //Return success message with the product data
        res.status(201).json({ messsage: "Product created successfully" , product});
    } catch (error) {
        res.status(500).json({ message: "Server Error"}); //Handle Server error
    }

};

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find(); // Fetch all products
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
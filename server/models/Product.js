const mongoose = require('mongoose'); //Import mongoose to interact with MongoDB

//Define the Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    sellerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// Create and export the Product model based on the Schema
module.exports = mongoose.model('Product', productSchema);
 //                                  |__> productSchema is exported in the name of "Product" variable


//ref: 'User': -> This is a reference to the User model. It links the product to the user who listed it.
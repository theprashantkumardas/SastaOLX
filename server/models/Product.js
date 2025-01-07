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
    },
    chatId: {
        type: mongoose.Schema.ObjectId, // Reference to the Chat model
        ref: 'Chat',
        
    },
    category: {
        type: String,
        required: true,
        enum: [
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
        ]
    },
    subcategory: {
        type: String,
        required: false // Optional field
    }
});

// Create and export the Product model based on the Schema
module.exports = mongoose.model('Product', productSchema);
 //                                  |__> productSchema is exported in the name of "Product" variable


//ref: 'User': -> This is a reference to the User model. It links the product to the user who listed it.
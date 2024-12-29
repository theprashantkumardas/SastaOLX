const mongoose = require('mongoose'); //Import mongoose to interact with MOngoDB

//Define the Schema for the User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'both'],  // Defines the possible roles
        default: 'buyer',  // Default role is buyer
    },
    profileImage: {  // Optional, if you want users to upload a profile image
        type: String,
        default: ''  // Default image URL or empty if no profile image is set
    }
});

//Create and export the user model based on the schema
module.exports = mongoose.model('User' , userSchema);


//mongoose.Schema: -> Defines the structure for the document (collection row) in MongoDB.
//required: true: -> Ensures that the field is mandatory during document creation.
//unique: true: -> Ensures that the email field is unique across users.
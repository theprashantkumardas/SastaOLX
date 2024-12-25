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
    }
});

//Create and export the user model based on the schema
module.exports = mongoose.model('User' , userSchema);


//mongoose.Schema: -> Defines the structure for the document (collection row) in MongoDB.
//required: true: -> Ensures that the field is mandatory during document creation.
//unique: true: -> Ensures that the email field is unique across users.
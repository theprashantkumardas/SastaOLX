// This file handles the logic for user registration and login.
const bcrypt = require('bcryptjs'); //For hashing password while saving to database
const jwt = require('jsonwebtoken'); //For generating JWT token
const User = require('../models/User') //User model

//Register a new user
exports.register = async(req, res) => {
    const { name, email, password, role } = req.body; // Included 'role' in the request body

    try {
        //Check if user is already exists 
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "Email already in use"}); 
        }

        //Hash the User's password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create a new user document with role
        const user = new User({ name, email, password: hashedPassword, role });

        //Wait till the User saved to database
        await user.save();

        // Generate a JWT token with userId and role
        const token = jwt.sign(
            { userId: user._id, role: user.role }, // Included role in the token payload
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        console.log("Token:", token);

        // Return the token and user ID as a response
        res.status(201).json({ token, userId: user._id, role: user.role });

    } catch(error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server Error"}); //Handle server errors

    }

};

//Log in an existing User
exports.login = async(req, res) => {
    const { email, password} = req.body;

    try{
        //Check if the uer exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"}); //If there is no such user
        }

        //Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials"}) //If password does not matches
        }

        // Generate a JWT token with userId and role
        const token = jwt.sign(
            { userId: user._id, role: user.role }, // Include role in the token payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the token, user ID, and role
        res.status(200).json({ token, userId: user._id, role: user.role });

    } catch(error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error"}); //Handle Server errors

    }
};


// bcrypt.hash(): -> Hashes the user's password before saving it to the database.
// jwt.sign(): -> Generates a JWT token to authenticate the user for future requests
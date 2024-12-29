const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs'); // Import bcrypt to hash passwords

//Get User Profile
exports.getUserProfile = async (req, res) => {

    try {
        // Fetch user profile based on userId from the request
        const user = await User.findById(req.user.userId); 
        if(!user){
            return res.status(404).json({ message: "User not found"});

        }
        

        res.status(200).json({
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage || '', // If no image, return empty string

        });
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    const { name, email, password, profileImage } = req.body;

    try {
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json({ message: "User not found"});
        }

        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;

        if(password){
            user.password = await bcrypt.hash(password, 10); // Hash password if provided
        }

        user.profileImage = profileImage || user.profileImage;

        await user.save(); // Save the updated user
        res.status(200).json({ message: "Profile updated successfully"});
        console.log("Profile update sucessfully");

    } catch (error) {
        res.status(500).json({ message: "Server Error"});
        console.log("Server Error");
    };
}

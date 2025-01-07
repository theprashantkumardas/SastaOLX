const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        // Send back the whole user object (except the password) and token
        res.status(201).json({ 
            token, 
            user: {
               _id: user._id,
               name: user.name,
               email: user.email,
               role: user.role,
            }
         });

        //  res.status(201).json({ token, userId: user._id, role: user.role , _id:user._id});

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        // Send back the whole user object (except the password) and token
        res.status(200).json({
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
           }
        });


        // res.status(200).json({ token, userId: user._id, role: user.role , _id: user._id });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
// This file handles the routes related to user authentication (register and login).

const express = require('express');
const { register , login } = require('../controllers/authController');
const router = express.Router(); //Initialize the router

//Route to register a new user
router.post('/register', register);

//Route to login an existing user
router.post('/login', login);

module.exports = router; //Export the router to use in server.js
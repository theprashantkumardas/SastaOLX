// This middleware checks if the user is authenticated (by verifying JWT).

const jwt = require('jsonwebtoken'); //Importing JWT module

//Middleware to check if the user is authenticated
module.exports = (req, res, next) => {
    // Extract token from the `Authorization` header
    const authHeader = req.headers.authorization; // Get the Authorization header
    const token = authHeader?.split(' ')[1]; // Split to extract the token part after 'Bearer'
    
    if(!token){
        return res.status(401).json({ message: "Authorization denied"}); //If no token is provided , denied acces

    }

    try {
        const decoded = jwt.verify(token, process.env.JWt_SECRET); //Verify the token with the secret key
        console.log("Decoded token:", decoded);
        req.user = { userId: decoded.userId };//Attach the decoded user data to the request object 
        next(); //Allow the next middleware or route handler to run

    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(500).json({ message: "Invalid token"}); //If token is invalid , deny access
        
    }
};
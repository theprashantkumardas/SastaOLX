// This middleware checks if the user is authenticated (by verifying JWT).

const jwt = require('jsonwebtoken'); //Importing JWT module

//Middleware to check if the user is authenticated
module.exports = (req, res, next) => {
    // Extract token from the `Authorization` header
    const authHeader = req.headers.authorization; // Get the Authorization header
    const token = authHeader?.split(' ')[1]; // Split to extract the token part after 'Bearer'
    
    // If no token is provided, deny access
    if(!token){
        return res.status(401).json({ message: "Authorization denied"}); //If no token is provided , denied acces

    }

    try {
        // Verify the token with the secret key and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verify the token with the secret key
        
        console.log("Decoded token:", decoded); // Log the decoded token (for debugging purposes)
        
        // Attach the decoded user data (userId and role) to the request object
        req.user = { 
            userId: decoded.userId,  // Add userId from the decoded token
            role: decoded.role       // Add role from the decoded token (new addition)
        };

        next(); //Allow the next middleware or route handler to run

    } catch (error) {
        console.error('Authentication error:', error.message); // Log errors if token verification fails
        res.status(500).json({ message: "Invalid token"}); //If token is invalid , deny access
        
    }
};
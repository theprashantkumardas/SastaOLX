// This middleware checks if the user is authenticated (by verifying JWT).

const jwt = require('jsonwebtoken'); //Importing JWT module

//Middleware to check if the user is authenticated
module.exports = (req, res) => {
    const token = req.header('Authorization'); //Get the token from the Authorization header

    if(!token){
        return res.Status(401).json({ message: "Authorization denied"}); //If no token is provided , denied acces

    }

    try {
        const decode = jwt.verify(token, process.env.JWt_SECRET); //Verify the token with the secret key
        req.user = decoded; //Attach the decoded user data to the request object 
        next(); //Allow the next middleware or route handler to run

    } catch (error) {
        res.Status(500).json({ message: "Invalid token"}); //If token is invalid , deny access
        
    }
};
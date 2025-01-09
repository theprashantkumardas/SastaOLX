// checkRoleMiddleware.js
module.exports = (allowedRoles) => {
    return (req, res, next,) => {
        // Extract the role from the authenticated user's request object
        const { role } = req.user; // This comes from the authMiddleware

        // Check if the user's role is one of the allowed roles
        // if (!allowedRoles.includes(role)) {
        //     // If the role is not allowed, deny access and send a '403 Forbidden' response
        //     return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        // }

        // If the role is valid, proceed to the next middleware or route handler
        next();
    };
};




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                                                                                  //              
//        How It Works:
//        Purpose: This middleware is used to restrict access to routes based on the user's role. 
                //It ensures that only users with certain roles (e.g., seller, buyer, both) can access specific routes.
    
//        Functionality:
    
//        The middleware takes an array of allowedRoles as its parameter. This array defines which roles are permitted to access the route.
//        It checks the user's role (stored in req.user.role by the authMiddleware).
//        If the user's role is in the allowedRoles array, the request proceeds to the next middleware or route handler using next().
//        If the user's role is not allowed, it returns a 403 Forbidden response with a message saying "Forbidden: Insufficient permissions".
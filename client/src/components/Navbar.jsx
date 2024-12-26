import React from "react";
import {Link} from "react-router-dom";

//Navbar for navigation between pages
const Navbar = () => {
    return(
        <nav>
            {/* Links to navigate between pages */}
            <Link to = "/">Home</Link>
            <Link to = "/register">Register</Link>
            <Link to = "/login">Login</Link>
        </nav>
    );
};

export default Navbar;
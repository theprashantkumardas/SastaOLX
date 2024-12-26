import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import ProductsPage from '../src/pages/ProductsPage';

// Main App Component
const App = () => {
    return(
        <Router>
            <Navbar/>
            <Routes>
                {/* These routes are for frontend navigation in top search bar */}
                <Route path="/" element = {<h1>Welcome to E_Commerce Platform</h1>} />
                <Route path="/register" element = {<Register/>} />
                <Route path="/login" element = {<Login/>} />
                <Route path="/products" element={<ProductsPage />} />

            </Routes>
        </Router>
    );

};

export default App;
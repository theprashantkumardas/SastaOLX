import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import ProductList from './components/Products/ProductList';
import AddProduct from './components/Products/AddProduct';
import Profile from './pages/Profile';
import ChatPage from './pages/ChatPage'; 

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
                <Route path="/add-product" element={<AddProduct/>} />
                <Route path="/shop" element={<ProductList/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </Router>
    );

};

export default App;
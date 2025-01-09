import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Import specific icon
import { Link } from 'react-router-dom';


const NavbarIcons = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref to detect clicks outside the dropdown


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className='flex space-x-4 items-center '>
            <Link to="/cart" >
                <FontAwesomeIcon icon={faCartShopping} />
            </Link>

            <div className='border border-black rounded-full w-6 h-6 flex items-center justify-center relative'>
                <Link >
                    <FontAwesomeIcon onClick={toggleDropdown} className='w-3' icon={faUser} />
                </Link>

                {/* Dropdown */}
                {isDropdownOpen && (
                    <div ref={dropdownRef} className="absolute right-0 mt-[240px] w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="flex items-center p-4 border-b border-gray-100">
                            {/* Logo */}
                            <img
                                src="https://via.placeholder.com/32"
                                alt="Logo"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text font-semibold">User Name</span>
                        </div>

                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/cart"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
                        >
                            My Cart
                        </Link>
                        <button
                            onClick={() => alert('Logged Out')}
                            className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}

            </div>

        </div>
    )
}

export default NavbarIcons
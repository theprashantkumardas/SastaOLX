import React from "react";


const Footer = () => {
    return (
        <div className="container mx-auto   py-8" >

            <div className="max-w-7xl my-6 sm:mx-auto   mx-2   bg-black  rounded-3xl mt-10 text-white flex items-center justify-center py-10">
                <h1 className="text-center font-bold text-3xl md:text-5xl">
                    Stay up to date with our latest collection
                </h1>
            </div>

            <footer className="bg-gray-100  py-10 px-4">

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800 justify-center">
                    {/* Logo and Description */}
                    <div>
                        <h2 className="text-2xl font-bold">SHOP.CO</h2>
                        <p className="mt-4 text-sm">
                            We have clothes that suit your style and which you're proud to wear. From women to men.
                        </p>
                        <div className="flex space-x-4 mt-4 ">
                            {/* Social Media Icons */}
                            <a
                                href="#"
                                className="w-8 h-8 flex  items-center justify-center bg-black text-white rounded-full"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full"
                            >
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="flex justify-around ">
                        <div className="">
                            <h3 className="font-bold text-lg">COMPANY</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><a href="#">About</a></li>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Works</a></li>
                                <li><a href="#">Career</a></li>
                            </ul>
                        </div>

                        {/* Help Links */}
                        <div>
                            <h3 className="font-bold text-lg">HELP</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><a href="#">Customer Support</a></li>
                                <li><a href="#">Delivery Details</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>


                    <div className="flex justify-around">
                        {/* FAQ Links */}
                        <div className="">
                            <h3 className="font-bold text-lg">FAQ</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><a href="#">Account</a></li>
                                <li><a href="#">Manage Deliveries</a></li>
                                <li><a href="#">Orders</a></li>
                                <li><a href="#">Payments</a></li>
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div>
                            <h3 className="font-bold text-lg">RESOURCES</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><a href="#">Free eBooks</a></li>
                                <li><a href="#">Development Tutorial</a></li>
                                <li><a href="#">How to - Blog</a></li>
                                <li><a href="#">Youtube Playlist</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="max-w-7xl mx-auto mt-8 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
                    <p>Shop.co © 2000-2023, All Rights Reserved</p>
                    {/* <div className="flex justify-center space-x-4 mt-4">
          <img
            src="visa-logo.png"
            alt="Visa"
            className="w-12"
          />
          <img
            src="paypal-logo.png"
            alt="PayPal"
            className="w-12"
          />
          <img
            src="mastercard-logo.png"
            alt="MasterCard"
            className="w-12"
          />
          <img
            src="apple-pay-logo.png"
            alt="Apple Pay"
            className="w-12"
          />
          <img
            src="google-pay-logo.png"
            alt="Google Pay"
            className="w-12"
          />
        </div> */}
                </div>
            </footer>
        </div>
    );
};

export default Footer;

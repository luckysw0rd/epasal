import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaDiscord } from 'react-icons/fa';
import logo from '../Assets/banau.png'; // Adjust the path to your logo image

const Footer = () => {
    return (
        <footer className="bg-[#141414] text-white py-10 px-4">
            <div className="max-w-[1200px] xl:max-w-screen-2xl mx-[60px] 2xl:mx-auto flex flex-col md:flex-row justify-between">
                <div className="flex-1 mb-1 md:mb-0 mr-8">
                    <img src={logo} alt="Company Logo" className="h-12 mb-2" />
                    <h3 className=" mt-5 text-lg xl:text-3xl font-bold">Shop At Banau</h3>
                    <p className="text-sm xl:text-lg mt-2">&copy; 2024 <a href="https://www.saikanepal.com" target="_blank" className=" underline hover:text-blue-300">Saika Nepal</a> All rights reserved.</p>
                </div>
                <h4 className="text-lg font-semibold border-b-2 md:border-r-2 border-[#FF7C1D] pb-2 mr-[60px] mb-4 inline-block w-80 md:w-0" > </h4>

                <div className="flex-1 hidden md:block mb-6 mt-5 md:mt-0 md:mb-0">
                    <h4 className="text-lg xl:text-2xl font-semibold border-b-2 border-[#FF7C1D] pb-2 mb-4 inline-block w-40">Features</h4>
                    <ul className="space-y-2 text-sm xl:text-lg">
                        <li>Ecommerce Building Platform</li>
                        <li>Unlimited Customization</li>
                        <li>Order Management</li>
                        <li>Shopping Made Easier</li>
                    </ul>
                </div>
                <div className="flex-1 mb-6 md:mb-0 mt-5 md:mt-0">
                    <h4 className="text-lg xl:text-2xl font-semibold border-b-2 border-[#FF7C1D] pb-2 mb-4 inline-block w-40">About Us</h4>
                    <ul className="space-y-2 text-sm xl:text-lg">
                        <li>
                            <Link to="/terms-and-conditions" target="_blank" className="hover:text-gray-400">
                                Terms and Conditions
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" target="_blank" className="hover:text-gray-400">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-1">
                    <h4 className="text-lg xl:text-2xl font-semibold border-b-2 border-[#FF7C1D] pb-2 mb-4 inline-block w-40">Contact Us</h4>
                    <p className="text-sm xl:text-lg">
                        Phone: (+977) 9702781000<br />
                        Email: shopatbanau@gmail.com<br />
                        Address: Imadol, Naya Basti, Mahalaxmi
                    </p>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://www.facebook.com/profile.php?id=61561384844442" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <FaFacebookF className="h-6 w-6 bg-orange-500 rounded-full p-1" />
                        </a>
                        <a href="https://www.instagram.com/shopatbanau/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <FaInstagram className="h-6 w-6 bg-orange-500 rounded-full p-1" />
                        </a>
                        <a href="https://discord.gg/4673CfDwqk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                            <FaDiscord className="h-6 w-6 bg-orange-500 rounded-full p-1" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

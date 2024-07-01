import React from 'react';
import Banau from '../Assets/banau.png'
const SliderNavbar = () => {
    return (
        <div className="bg-[#2D2D2D] mx-4 text-white flex items-center justify-between md:justify-center space-x-20 sm:space-x-[360px] p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center">
                <button className="text-white text-xl font-semibold hover:text-gray-300 transition-colors duration-300">
                    Start Selling with
                </button>
            </div>
            <div className="flex items-center">
                <img
                    src={Banau} // Replace with your logo path
                    alt="Logo"
                    className="h-10 w-auto ml-2"
                />
            </div>
        </div>
    );
};

export default SliderNavbar;

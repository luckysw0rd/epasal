import React, { useState } from 'react';
import { motion } from 'framer-motion';
import epasalbg from '../Assets/epasalbg.png';
import epasalmobile from '../Assets/epasalmobile.png';
import cart from "../Assets/trolley.json";
import Lottie from "lottie-react";
import { ReactTyped } from "react-typed";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
       
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 800);
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            className="flex justify-start pt-60 flex-col items-center h-screen"
            style={{
                backgroundImage: `url(${isMobile ? epasalmobile : epasalbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="  mr-10 justify-center w-full flex sm:flex-col md:flex-row h-40">
                <Lottie
                    className=' w-40 h-40'
                    animationData={cart}
                />
                <ReactTyped
                    className='text-black font-serif pt-12 text-2xl md:text-4xl lg:text-5xl font-bold'
                    strings={['Build Your Store']}
                    typeSpeed={140}
                    backSpeed={130}
                    loop
                    showCursor={true}
                    cursorChar="|"
                    smartBackspace={true}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-screen bg-[#FEFBF6] bg-opacity-75 pb-10 flex"
            >
                <form onSubmit={handleSubmit} className="flex px-2 md:px-0  flex-grow flex-col gap-2 md:flex-row items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full h-12 px-4 rounded-l-full border border-gray-300 focus:outline-none focus:border-indigo-500 text-lg mr-2"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-indigo-500 text-white py-3 px-6 md:rounded-r-full rounded-xl hover:bg-indigo-600 transition-colors text-lg"
                    >
                        Search
                    </motion.button>
                </form>
            </motion.div>
            <div className='flex flex-col md:flex-row gap-16' >

            </div>
        </div>
    );
};

export default SearchPage;

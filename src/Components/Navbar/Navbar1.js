import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import LeftSidebar from '../LeftSidebar/LeftSidebar';

const Navbar1 = ({
    setNewCategory,
    store,
    setStore,
    addCategory,
    removeCategory,
    color,
    previewMode,
    isSidebarOpen,
    newCategory,
    searchInput,
    setIsSidebarOpen,
    setSearchInput,
    setLogoFile,
}) => {
    const [scrolling, setScrolling] = useState(false);
    const [editableText, setEditableText] = useState("Ecom Template-2");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isSearchClicked, setIsSearchClicked] = useState(false); // State to manage search input visibility
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const leftSidebarProps = {
        isOpen: isSidebarOpen,
        onClose: () => setIsSidebarOpen(false),
        store,
        setStore,
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        console.log(isSidebarOpen);
    };

    const handleInputChange = (e) => {
        if (!previewMode) {
            setNewCategory(e.target.value);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const onDrop = (acceptedFiles) => {
        if (!previewMode) {
            const file = acceptedFiles[0];
            if (file) {
                setLogoFile(file);
                const reader = new FileReader();
                reader.onload = () => {
                    setStore(prevState => ({
                        ...prevState,
                        logo: reader.result,
                    }));
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleCartClick = () => {
        // Add your cart click functionality here
        console.log('Cart clicked');
    };

    const handleEditableTextChange = (e) => {
        setEditableText(e.target.value);
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleSearchIconClick = () => {
        setIsSearchClicked(!isSearchClicked); // Toggle search input visibility
    };

    return (
        <motion.nav
            className="flex px-6 py-4 bg-brown-700 text-white shadow-md fixed w-full z-20"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120 }}
            style={{ backgroundColor: color.navColor.backgroundnavColor }}
        >
            <div className="flex items-center mr-40">
                <button
                    style={{ color: color.navColor.storeNameTextColor }}
                    className="block focus:outline-none md:hidden mr-2"
                    onClick={toggleSidebar}
                >
                    <svg
                        className="h-6 w-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5h18a1 1 0 010 2H3a1 1 0 110-2zm0 6h18a1 1 0 010 2H3a1 1 0 110-2zm0 6h18a1 1 0 010 2H3a1 1 0 110-2z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div {...getRootProps()} className="cursor-pointer flex items-center">
                    <input {...getInputProps()} />
                    <img
                        src={store.logo || 'https://via.placeholder.com/50'}
                        alt="Logo"
                        className="h-8 mr-4"
                    />
                </div>
                {/* { !previewMode ? (
                    <input 
                        type="text" 
                        value={editableText} 
                        onChange={handleEditableTextChange} 
                        className="bg-transparent border-b border-white focus:outline-none text-xl font-bold"
                    />
                ) : (
                    <span className="text-xl font-bold">{editableText}</span>
                ) } */}
            </div>

            <div className={`md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                        <a href="#" className="hover:underline" onClick={toggleDropdown}>All Products ▼</a>
                        {isDropdownVisible && (
                            <div
                                className="absolute left-0 mt-2 w-48 shadow-lg"
                                style={{ backgroundColor: color.navColor.backgroundnavColor }}
                            >
                                {store.categories.map((category, index) => (
                                    <a key={index} href="#" className="block px-4 py-2 text-white hover:bg-gray-200 hover:text-black">
                                        {category.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    <a href="#" className="hover:underline">Featured</a>
                    <a href="#" className="hover:underline">Offers</a>
                    <div className={`relative flex items-center ${isSearchClicked ? 'block' : 'hidden'}`}>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            placeholder="Search"
                            className="bg-transparent border-b border-white focus:outline-none text-xl font-bold"
                        />
                        <FaSearch className="text-2xl cursor-pointer" onClick={handleSearchIconClick}/>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center justify-self-end space-x-4 mx-20">
                <div className="relative">
                    <a href="#" className="hover:underline" onClick={toggleDropdown}>All Products ▼</a>
                    {isDropdownVisible && (
                        <div
                            className="absolute left-0 mt-2 w-48 shadow-lg"
                            style={{ backgroundColor: color.navColor.backgroundnavColor }}
                        >
                            {store.categories.map((category, index) => (
                                <a key={index} href="#" className="block px-4 py-2 text-white hover:bg-gray-200 hover:text-black">
                                    {category.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <a href="#" className="hover:underline">Featured</a>
                <a href="#" className="hover:underline">Offers</a>
            </div>


            <div className="flex items-center space-x-4 relative pr-20">
                <div className="relative flex items-center hidden md:flex space-x-8">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        placeholder="Search"
                        className={`bg-transparent border-b border-white focus:outline-none text-xl font-bold ${isSearchClicked ? 'block' : 'hidden'}`} // Show or hide based on state
                    />
                    <FaSearch className="text-2xl cursor-pointer" onClick={handleSearchIconClick} />
                </div>

                <button onClick={handleCartClick}>
                    <FaShoppingCart className="text-2xl" />
                </button>
                <button className="px-4 ml-0 py-2 border border-[#948979] rounded hover:bg-white hover:text-brown-700">Sign up</button>
            </div>


            {/* {isSidebarOpen && <LeftSidebar leftSidebarProps={leftSidebarProps} leftSidebarType="LeftSidebar1" />} */}
        </motion.nav>
    );
};

export default Navbar1;


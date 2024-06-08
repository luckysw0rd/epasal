import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi'; // Import the hamburger icon

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
    const [isSearchClicked, setIsSearchClicked] = useState(false);
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
                        logo: {
                            ...prevState.logo,
                            logoUrl: reader.result
                        }
                    }));
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleCartClick = () => {
        console.log('Cart clicked');
    };

    const handleEditableTextChange = (e) => {
        setEditableText(e.target.value);
    };

    const handleSearchIconClick = () => {
        setIsSearchClicked(!isSearchClicked);
    };

    return (
        <motion.nav
            className={`flex items-center justify-between px-6 py-4 shadow-md fixed w-full z-20 transition-all duration-300 ${
                scrolling ? 'bg-brown-700' : 'bg-transparent'
            }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120 }}
            style={{
                backgroundColor: scrolling ? color.navColor.backgroundnavColor : 'transparent',
                color: color.navColor.storeNameTextColor,
            }}
        >
             <div className="flex items-center">
                    {previewMode ? (
                        store.logo && (
                            <img
                                src={store.logo.logoUrl}
                                alt="Logo"
                                className="h-8 mr-4"
                            />
                        )
                    ) : (
                        <div {...getRootProps()} className="cursor-pointer flex items-center">
                            <input {...getInputProps()} />
                            <img
                                src={store.logo.logoUrl || 'https://via.placeholder.com/50'}
                                alt="Logo"
                                className="h-8 mr-4"
                            />
                        </div>
                    )}
                <span className="text-xl font-bold">{store.name}</span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="hover:underline">All Products</a>
                <a href="#" className="hover:underline">Featured</a>
                <a href="#" className="hover:underline">Offers</a>
            </div>

            <div className={`flex items-center space-x-4 relative ${isSidebarOpen ? 'mr-12' : ''}`}>
                <div className="relative flex items-center hidden md:flex">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        placeholder="Search"
                        className={`bg-transparent border-b border-white focus:outline-none text-xl font-bold ${isSearchClicked ? 'block' : 'hidden'}`}
                    />
                    <FaSearch className="text-2xl cursor-pointer" onClick={handleSearchIconClick} />
                </div>
                <button onClick={handleCartClick}>
                    <FaShoppingCart className="text-2xl" />
                </button>
            </div>

            {isSidebarOpen && (
                <div
                    className="md:hidden fixed top-0 left-0 h-full w-64 text-white shadow-lg z-30"
                    style={{ backgroundColor: color.navColor.backgroundnavColor }}
                >
                    <div className="flex flex-col items-start space-y-4 p-4">
                        <div className="flex items-center mb-4">
                            {store.logo && (
                                <img
                                    src={store.logo.logoUrl}
                                    alt="Logo"
                                    className="h-8 mr-4"
                                />
                            )}
                            <span className="text-xl font-bold">{store.name}</span>
                        </div>
                        <a href="#" className="hover:underline">All Products</a>
                        <a href="#" className="hover:underline">Featured</a>
                        <a href="#" className="hover:underline">Offers</a>
                        <div className="relative flex items-center w-full">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                                placeholder="Search"
                                className="bg-transparent border-b border-white focus:outline-none text-xl font-bold w-full"
                            />
                            <FaSearch className="text-2xl cursor-pointer" onClick={handleSearchIconClick} />
                        </div>
                    </div>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar1;

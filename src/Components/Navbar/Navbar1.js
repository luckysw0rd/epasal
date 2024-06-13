import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import CartDropdown from './CartDropDown';

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
    setPreviewMode,
}) => {
    const [scrolling, setScrolling] = useState(false);
    const [editableText, setEditableText] = useState("Ecom Template-2");
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const location = useLocation();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Item 1',
            variant: [{ options: [{ price: 10, image: { imageUrl: 'https://via.placeholder.com/50' } }] }]
        },
        {
            id: 2,
            name: 'Item 2',
            variant: [{ options: [{ price: 20, image: { imageUrl: 'https://via.placeholder.com/50' } }] }]
        }
    ]);

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
                const reader = new FileReader
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
        setIsCartOpen(!isCartOpen);
        console.log(store.cart);  // Log the cart items to the console
    };

    const handleEditableTextChange = (e) => {
        setEditableText(e.target.value);
    };

    const handleSearchIconClick = () => {
        setIsSearchClicked(!isSearchClicked);
    };

    const deleteFromCart = (itemToDelete) => {
        setCartItems(cartItems.filter(item => item.id !== itemToDelete.id));
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
                fontFamily:store?.fonts?.Navbar,
                backgroundColor: scrolling ? color?.navColor?.backgroundnavColor : 'transparent',
                color: color.navColor.storeNameTextColor,
            }}
        >
            <div className="flex items-center">
                {!isSidebarOpen && (
                    <button
                        style={{ color: color.navColor.storeNameTextColor }}
                        className="block focus:outline-none md:hidden mr-2"
                        onClick={toggleSidebar}
                    >
                        <FiMenu className="h-6 w-6 fill-current" />
                    </button>
                )}
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

            <div className={`flex items-center space-x-4 relative ${isSidebarOpen ? 'mr-10' : 'lg:mr-20'}`}>
                <div className="hidden md:flex space-x-4 mr-8">
                    <a href="#" className="hover:underline">All Products</a>
                    <a href="#" className="hover:underline">Featured</a>
                    <a href="#" className="hover:underline">Offers</a>
                </div>
                <div className="relative flex items-center hidden md:flex">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        placeholder="Search"
                        className={`bg-transparent border-b border-black focus:outline-none placeholder-black placeholder:text-sm text-xl ${isSearchClicked ? 'block' : 'hidden'}`}
                    />
                    <FaSearch className="text-2xl cursor-pointer" onClick={handleSearchIconClick} />
                </div>
                <button onClick={handleCartClick} className="relative">
                    <FaShoppingCart className="text-2xl" />
                    {cartItems.length > 0 && (
                        <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 rounded-full text-white px-1 py-0.5 text-xs">
                            {cartItems.length}
                        </span>
                    )}
                </button>
                {isCartOpen && <CartDropdown items={cartItems} deleteFromCart={deleteFromCart} backgroundColor={color.navColor.backgroundnavColor} />} {/* Conditionally render the CartDropdown */}
                <button
                    onClick={null}
                    className="bg-transparent border border-black px-2 py-1 rounded text-black"
                >
                    Preview
                </button>
            </div>

            {isSidebarOpen && (
                <button
                    style={{ color: color.navColor.storeNameTextColor }}
                    className="block focus:outline-none md:hidden absolute right-6"
                    onClick={toggleSidebar}
                >
                    <FaTimes className="h-6 w-6 fill-current" />
                </button>
            )}

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
                                className="bg-transparent border-b border-white focus:outline-none placeholder-white text-xl w-full placeholder:text-sm"
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

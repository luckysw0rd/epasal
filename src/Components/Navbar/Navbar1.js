import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaShoppingCart } from 'react-icons/fa';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
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
    cart,
    cartCount,
    deleteFromCart
}) => {
    const [scrolling, setScrolling] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
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

        setCartOpen(!cartOpen)
        console.log('Cart clicked');
    };

    return (
        <motion.nav
            className="flex items-center justify-between px-6 py-4 bg-brown-700 text-white shadow-md fixed w-full z-20"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120 }}
            style={{ backgroundColor: color.navColor.backgroundnavColor }}
        >
            <div className="flex items-center">
                <div {...getRootProps()} className="cursor-pointer flex items-center">
                    <input {...getInputProps()} />
                    <img
                        src={store.logo || 'https://via.placeholder.com/50'}
                        alt="Logo"
                        className="h-8 mr-4"
                    />
                </div>
                <span className="text-xl font-bold">Ecom Template-2</span>
            </div>

            <div className="flex items-center space-x-28">
                <div className="flex items-center space-x-8">
                    <a href="#" className="hover:underline">All Products</a>
                    <a href="#" className="hover:underline">Featured</a>
                    <a href="#" className="hover:underline">Offers</a>
                    <a href="#" className="hover:underline">Offers</a>
                    <a href="#" className="hover:underline">Offers</a>

                </div>
                <button className="px-4 ml-0 py-2 border border-[#948979] rounded hover:bg-white hover:text-brown-700">Sign up</button>
                {cartOpen && <CartDropdown items={cart} deleteFromCart={deleteFromCart} />}
                <button onClick={handleCartClick}>
                    <FaShoppingCart className="text-2xl" />
                    <span className="ml-2">{cartCount}</span> {/* Display cart count */}

                </button>
                <div className="md:hidden box-border">
                    <button
                        style={{ color: color.navColor.storeNameTextColor }}
                        className="block focus:outline-none py-2"
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
                </div>
            </div>

            {isSidebarOpen && <LeftSidebar leftSidebarProps={leftSidebarProps} leftSidebarType="LeftSidebar1" />}
        </motion.nav>
    );
};

export default Navbar1;

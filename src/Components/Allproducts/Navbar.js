// Navbar component with deleteFromCart function implementation
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CartDropDown from './CartDropDown';
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = ({ color, store, addToCart, setStore }) => {
    const [scrolling, setScrolling] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const redirectToStore = () => {
        if (store && store.name) {
            window.location.href = `${process.env.REACT_APP_BASE_URL}/store/${store.name}`;
        }
    };

    // Function to delete item from cart
    const deleteFromCart = (product) => {
        const { product: name, price, selectedVariant } = product;

        // Find the index of the item in cart
        const existingCartItemIndex = store.cart.findIndex(item =>
            item.product === name &&
            item.price === price &&
            JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
        );

        // If item exists in cart
        if (existingCartItemIndex !== -1) {
            const updatedCart = [...store.cart];

            // Decrease quantity or remove item if count is 1
            if (updatedCart[existingCartItemIndex].count === 1) {
                updatedCart.splice(existingCartItemIndex, 1);
            } else {
                updatedCart[existingCartItemIndex] = {
                    ...updatedCart[existingCartItemIndex],
                    count: updatedCart[existingCartItemIndex].count - 1
                };
            }

            // Update React state
            setStore(prevState => ({
                ...prevState,
                cart: updatedCart,
                cartCount: prevState.cartCount - 1
            }));

            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            localStorage.setItem('cartCount', (store.cartCount - 1).toString());
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleCartDropdown = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <motion.nav
            className={`flex absolute top-0 items-center justify-between px-6 py-4 shadow-md fixed w-full z-20 transition-all duration-300 ${scrolling ? 'bg-brown-700' : 'bg-transparent'}`}
            style={{
                fontFamily: store?.fonts?.Navbar,
                backgroundColor: color?.navColor?.backgroundnavColor,
                color: color?.navColor?.storeNameTextColor,
            }}
        >
            <div className="flex items-center">
                {!isSidebarOpen && (
                    <button
                        style={{ color: color?.navColor?.storeNameTextColor }}
                        className="block focus:outline-none md:hidden mr-2"
                        onClick={toggleSidebar}
                    >
                        {/* <FiMenu className="h-6 w-6 fill-current" /> */}
                    </button>
                )}

                <div className="cursor-pointer flex items-center">
                    <img
                        src={store?.logo?.logoUrl || 'https://via.placeholder.com/50'}
                        alt="Logo"
                        className="h-8 mr-4"
                    />
                </div>
                <span
      className="text-xl font-bold cursor-pointer"
      onClick={redirectToStore}
    >
      {store?.name}
    </span>
            </div>

            <div className={`flex items-center space-x-4 relative ${isSidebarOpen ? 'mr-10' : 'lg:mr-20'}`}>
                <div className="hidden md:flex space-x-4 mr-8">
                    <a href="#" className="hover:underline">
                        All Products
                    </a>
                    <a href="#" className="hover:underline">
                        Featured
                    </a>
                    <a href="#" className="hover:underline">
                        Offers
                    </a>
                </div>

                <button className="focus:outline-none" onClick={toggleCartDropdown} aria-label="Open Cart">
                    <AiOutlineShoppingCart className=' mt-1 size-6 ' />

                    {store?.cart?.length > 0 && (
                        <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute -top-1 -right-1">
                            {store.cart.length}
                        </span>
                    )}
                </button>

                {isCartOpen && (
                    <CartDropDown
                        cart={store.cart}
                        addToCart={addToCart}
                        deleteFromCart={deleteFromCart} // Pass deleteFromCart here
                        backgroundColor={color?.navColor?.backgroundnavColor}
                        store={store}
                        setStore={setStore}
                    />
                )}
            </div>

            {isSidebarOpen && (
                <button
                    style={{ color: color?.navColor?.storeNameTextColor }}
                    className="block focus:outline-none md:hidden absolute right-6"
                    onClick={toggleSidebar}
                >
                    {/* <FaTimes className="h-6 w-6 fill-current" /> */}
                </button>
            )}

            {isSidebarOpen && (
                <div
                    className="md:hidden fixed top-0 left-0 h-full w-64 text-white shadow-lg z-30"
                    style={{ backgroundColor: color?.navColor?.backgroundnavColor }}
                >
                    <div className="flex flex-col items-start space-y-4 p-4">
                        <div className="flex items-center mb-4">
                            {store.logo && (
                                <img src={store?.logo?.logoUrl} alt="Logo" className="h-8 mr-4" />
                            )}
                            <span className="text-xl font-bold">{store?.name}</span>
                        </div>
                        <a href="#" className="hover:underline">
                            All Products
                        </a>
                        <a href="#" className="hover:underline">
                            Featured
                        </a>
                        <a href="#" className="hover:underline">
                            Offers
                        </a>
                    </div>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;

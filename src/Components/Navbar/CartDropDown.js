import React, { useEffect, useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import Checkout from '../CheckoutPage/CheckOutPage'; // Adjust path as necessary
import { useStore } from '../../Theme/Theme1/T1Context'; // Adjust path as necessary

const CartDropdown = ({ backgroundColor }) => {
    const { store, setStore } = useStore();
    const [showCheckout, setShowCheckout] = useState(false);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setStore({ ...store, cart: JSON.parse(savedCart) });
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(store.cart));
    }, [store.cart]);

    // Handle window beforeunload event to save cart data
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            localStorage.setItem('cart', JSON.stringify(store.cart));
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [store.cart]);

    // Increase quantity of an item in cart
    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...store.cart];
        updatedCart[index] = {
            ...updatedCart[index],
            count: updatedCart[index].count + 1
        };
        setStore({ ...store, cart: updatedCart });
    };

    // Decrease quantity of an item in cart
    const handleDecreaseQuantity = (index) => {
        if (store.cart[index].count > 1) {
            const updatedCart = [...store.cart];
            updatedCart[index] = {
                ...updatedCart[index],
                count: updatedCart[index].count - 1
            };
            setStore({ ...store, cart: updatedCart });
        }
    };

    // Remove item from cart
    const handleDeleteFromCart = (item) => {
        const updatedCart = store.cart.filter(cartItem => cartItem !== item);
        setStore({ ...store, cart: updatedCart });
    };

    // Show checkout modal
    const handleCheckout = () => {
        setShowCheckout(true);
    };

    // Close checkout modal
    const handleCloseCheckout = () => {
        setShowCheckout(false);
    };

    return (
        <div className="absolute right-0 w-64 shadow-lg rounded-lg py-2 z-30 transition-all duration-300" style={{ backgroundColor, top: '100%' }}>
            {store.cart.length === 0 ? (
                <p className="px-4 py-2">Your cart is empty</p>
            ) : (
                <div className="flex flex-col gap-3 p-2">
                    {store.cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-black pb-2 mb-2">
                            <div className='flex-1'>
                                <p className="font-medium">{item.product}</p>
                                <p>रु{item.price * item.count}</p>
                            </div>
                            <IoCloseCircleOutline size={20} onClick={() => handleDeleteFromCart(item)} />
                            <div className="flex items-center text-xl">
                                <button className="text-black focus:outline-none" onClick={() => handleDecreaseQuantity(index)}>-</button>
                                <span className="mx-2">{item.count}</span>
                                <button className="text-black focus:outline-none" onClick={() => handleIncreaseQuantity(index)}>+</button>
                            </div>
                        </div>
                    ))}
                    <button className="w-full bg-transparent hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mt-4 border border-black" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            )}
            {showCheckout && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <Checkout store={store} onClose={handleCloseCheckout} />
                </div>
            )}
        </div>
    );
};

export default CartDropdown;

import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import Checkout from '../CheckoutPage/CheckOutPage'; // Adjust path as necessary
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStore } from '../../Theme/Theme1/T1Context';
import { m } from 'framer-motion';

const CartDropdown = ({ backgroundColor }) => {
    const [showCheckout, setShowCheckout] = useState(false);
    const { store, setStore, addToCart, deleteFromCart } = useStore();

    // Fetch cart from localStorage when component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setStore(prevState => ({
            ...prevState,
            cart: storedCart,
            cartCount: storedCart.length
        }));
    }, [setStore]);

    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...store.cart];
        updatedCart[index] = {
            ...updatedCart[index],
            count: updatedCart[index].count + 1
        };
        setStore(prevState => ({
            ...prevState,
            cart: updatedCart,
            cartCount: updatedCart.length
        }));
    };

    const handleDecreaseQuantity = (index) => {
        const product = store.cart[index];
        if (product.count > 1) {
            deleteFromCart(product);
        }
    };

    const handleDeleteFromCart = (index) => {
        const product = store.cart[index];
        const updatedCart = store.cart.filter((_, i) => i !== index);
        setStore(prevState => ({
            ...prevState,
            cart: updatedCart,
            cartCount: prevState.cartCount - product.count
        }));
        deleteFromCart(product);
    };

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    const handleCloseCheckout = () => {
        setShowCheckout(false);
    };

    return (
        <div className="absolute right-0 w-64 md:w-[500px] md:h-[720px] shadow-lg rounded-lg py-2 z-30 transition-all duration-300" style={{ backgroundColor, top: '100%' }}>
            {store.cart.length === 0 ? (
                <p className="px-4 py-2">Your cart is empty</p>
            ) : (
                <div className="flex flex-col gap-3 p-5">
                    <div className='flex h-20 flex-row font-Roboto text-2xl font-semibold gap-3 w-full '>
                        Shopping Cart
                        <AiOutlineShoppingCart className=' mt-1 size-6 ' />
                    </div>
                    <h3>Number of Items</h3>
                    <div className='border rounded-md p-5 border-[#D7D7D7]'>
                        {store.cart.map((item, index) => (
                            <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0 w-20 h-20'>
                                        <img className='w-full h-full object-contain' src={item?.image.imageUrl || item?.image} alt={item.productName} />
                                    </div>
                                    <div className='ml-3'>
                                        <p className="font-medium">{item.productName}</p>
                                        <p>रु{item.price * item.count}</p>
                                        {/* <p className="text-xs text-gray-600">{item.selectedVariant[0]?.options.name}</p> */}
                                    </div>
                                </div>
                                <IoCloseCircleOutline size={20} onClick={() => handleDeleteFromCart(index)} />
                                <div className="flex items-center text-xl">
                                    <button className="text-black focus:outline-none" onClick={() => handleDecreaseQuantity(index)}>-</button>
                                    <span className="mx-2">{item.count}</span>
                                    <button className="text-black focus:outline-none" onClick={() => handleIncreaseQuantity(index)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-transparent hover:bg-gray-300 font-bold py-2 px-4 rounded mt-4 border" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            )}
            {showCheckout && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <Checkout cart={store.cart} onClose={handleCloseCheckout} deleteItem={handleDeleteFromCart} />
                </div>
            )}
        </div>
    );
};

export default CartDropdown;
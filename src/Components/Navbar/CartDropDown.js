import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import Checkout from '../CheckoutPage/CheckOutPage'; // Adjust path as necessary

const CartDropdown = ({ cart, deleteFromCart, backgroundColor }) => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [cartState, setCartState] = useState(cart);
    
    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...cartState];
        updatedCart[index] = {
            ...updatedCart[index],
            count: updatedCart[index].count + 1
        };
        setCartState(updatedCart);
    };

    const handleDecreaseQuantity = (index) => {
        if (cartState[index].count > 1) {
            const updatedCart = [...cartState];
            updatedCart[index] = {
                ...updatedCart[index],
                count: updatedCart[index].count - 1
            };
            setCartState(updatedCart);
        }
    };

    const handleDeleteFromCart = (item) => {
        const updatedCart = cartState.filter(cartItem => cartItem !== item);
        setCartState(updatedCart);
        deleteFromCart(item); // Call the prop function to delete item from cart
    };

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    const handleCloseCheckout = () => {
        setShowCheckout(false);
    };

    return (
        <div className="absolute right-0 w-64 shadow-lg rounded-lg py-2 z-30 transition-all duration-300" style={{ backgroundColor, top: '100%' }}>
            {cartState.length === 0 ? (
                <p className="px-4 py-2">Your cart is empty</p>
            ) : (
                <div className="flex flex-col gap-3 p-2">
                    {cartState.map((item, index) => (
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
                    <Checkout cart={cartState} onClose={handleCloseCheckout} deleteItem={handleDeleteFromCart}/>
                    
                </div>
            )}
        </div>
    );
};

export default CartDropdown;

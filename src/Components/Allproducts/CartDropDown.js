import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import CheckOutPage from './CheckoutPage';
import { FaShoppingCart } from "react-icons/fa";

const CartDropdown = ({ cart, addToCart, deleteFromCart, setStore, backgroundColor, store }) => {
    const [showCheckout, setShowCheckout] = useState(false);
    console.log(cart);
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

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    const handleCloseCheckout = () => {
        setShowCheckout(false);
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

    const handleDecreaseQuantity = (index) => {
        const product = store.cart[index];
        if (product.count > 1) {
            deleteFromCart(product);
        }
    };

    const calculateTotalPrice = () => {
        return store.cart.reduce((total, item) => total + item.price * item.count, 0);
    };

    return (
        <div className="absolute text-gray-900 font-Roboto top-8 right-0 mt-2  w-[400px] md:w-[500px] bg-[#FFFFFF] border border-gray-300 rounded-lg shadow-xl z-50">
            <div className="p-4">
                <h1 className='flex justify-center font-bold mb-10 items-center gap-2 text-gray-900 text-xl'> Your Shopping Cart
                    <FaShoppingCart />
                </h1>
                <div className=' bg-[#F9F9F9] p-5 rounded-lg' >
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200">
                            <img src={item?.selectedVariant[0]?.options?.image || item?.productImage} alt={item.productName} className="h-16 w-16 rounded object-cover" />
                            <div className="flex-1 ml-4">
                                <h4 className="text-md font-semibold text-gray-800">{item.productName}</h4>
                                <p className="text-xs font-bold text-gray-600">Rs {item.price}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="bg-gray-300 px-2 py-1 rounded-l hover:bg-gray-400 transition duration-200"
                                    onClick={() => handleDeleteFromCart(index)}
                                >
                                    -
                                </button>
                                <span className="px-3">{item.count}</span>
                                <button
                                    className="bg-gray-300 px-2 py-1 rounded-r hover:bg-gray-400 transition duration-200"
                                    onClick={() => handleIncreaseQuantity(index)}
                                >
                                    +
                                </button>
                            </div>
                            {/* <button
                                className="text-red-500 ml-4 hover:text-red-700 transition duration-200"
                                onClick={() => handleDeleteFromCart(index)}
                            >
                                <FaTrashAlt />
                            </button> */}
                        </div>
                    ))
                )}
                </div>
                <div className="mt-4 flex justify-between items-center font-bold text-lg">
                    <span>Total Price:</span>
                    <span>Rs {calculateTotalPrice()}</span>
                </div>
                <button className="w-full bg-gray-800 text-white hover:bg-gray-500 font-bold py-2 px-4 rounded mt-4 transition duration-200" onClick={handleCheckout}>
                    Checkout
                </button>
            </div>
            {showCheckout && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <CheckOutPage cart={store.cart} onClose={handleCloseCheckout} deleteItem={handleDeleteFromCart} store={store} />
                </div>
            )}
        </div>
    );
};

export default CartDropdown;

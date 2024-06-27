import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import CheckOutPage from './CheckoutPage';

const CartDropdown = ({ cart, addToCart, deleteFromCart, setStore, backgroundColor, store }) => {
    const [showCheckout, setShowCheckout] = useState(false);

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

    return (
        <div className="absolute top-8 right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50" style={{ backgroundColor }}>
            <div className="p-4">
                {cart.length === 0 ? (
                    <p className="text-center">Your cart is empty</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                            <img src={item.image.imageUrl} alt={item.product} className="h-12 w-12 rounded" />
                            <div className="flex-1 ml-2">
                                <h4 className="text-sm font-semibold">{item.product}</h4>
                                {/* <p className="text-xs text-gray-600">{item.selectedVariant[0]?.options.name}</p> */}
                                <p className="text-xs font-bold">${item.price}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="bg-gray-200 px-2 rounded-l"
                                    onClick={() => handleDecreaseQuantity(index)}
                                >
                                    -
                                </button>
                                <span className="px-2">{item.count}</span>
                                <button
                                    className="bg-gray-200 px-2 rounded-r"
                                    onClick={() => handleIncreaseQuantity(index)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="text-red-500 ml-2"
                                onClick={() => handleDeleteFromCart(index)}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))
                )}
                <button className="w-full bg-transparent hover:bg-gray-300 font-bold py-2 px-4 rounded mt-4 border" onClick={handleCheckout}>
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

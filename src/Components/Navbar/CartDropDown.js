import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const CartDropdown = ({ items, deleteFromCart, backgroundColor }) => {
    const [quantities, setQuantities] = useState(items.map(() => 1));
    const [itemPrices, setItemPrices] = useState(items.map(item => item.variant[0].options[0].price));

    const handleIncreaseQuantity = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);

        const newPrices = [...itemPrices];
        newPrices[index] = newPrices[index] * 2; // Adjust calculation as needed
        setItemPrices(newPrices);
    };

    const handleDecreaseQuantity = (index) => {
        if (quantities[index] > 1) {
            const newQuantities = [...quantities];
            newQuantities[index]--;
            setQuantities(newQuantities);

            const newPrices = [...itemPrices];
            newPrices[index] = newPrices[index] / 2; // Adjust calculation as needed
            setItemPrices(newPrices);
        }
    };

    return (
        <div className="absolute right-0 w-64 shadow-lg rounded-lg py-2 z-30 transition-all duration-300" style={{ backgroundColor, top: '100%' }}>
            {items.length === 0 ? (
                <p className="px-4 py-2">Your cart is empty</p>
            ) : (
                <div className="flex flex-col gap-3 p-2">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-black pb-2 mb-2">
                            {/* <img src={item.variant[0].options[0].image.imageUrl} className="w-12 h-12 mr-4" /> */}
                            <div className='flex-1'>
                                <p className="font-medium">{item.name}</p>
                                <p>रु{itemPrices[index]}</p>
                            </div>
                            <IoCloseCircleOutline size={20} onClick={() => deleteFromCart(item)} />
                            <div className="flex items-center text-xl">
                                <button className="text-black focus:outline-none" onClick={() => handleDecreaseQuantity(index)}>-</button>
                                <span className="mx-2">{quantities[index]}</span>
                                <button className="text-black focus:outline-none" onClick={() => handleIncreaseQuantity(index)}>+</button>
                            </div>
                        </div>
                    ))}
                    <Link to="/checkout">
      <button className="w-full bg-transparent hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mt-4 border border-black">
        Checkout
      </button>
    </Link>


                </div>
            )}
        </div>
    );
};

export default CartDropdown;

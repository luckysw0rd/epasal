import React, { useState } from 'react';

const CartDropdown = ({ items }) => {
    const [quantities, setQuantities] = useState(items.map(() => 1));
    const [itemPrices, setItemPrices] = useState(items.map(item => item.variant[0].options[0].price));

    const handleIncreaseQuantity = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);

        const newPrices = [...itemPrices];
        newPrices[index] = newPrices[index] * 2;
        setItemPrices(newPrices);
    };

    const handleDecreaseQuantity = (index) => {
        if (quantities[index] > 1) {
            const newQuantities = [...quantities];
            newQuantities[index]--;
            setQuantities(newQuantities);

            const newPrices = [...itemPrices];
            newPrices[index] = newPrices[index] / 2;
            setItemPrices(newPrices);
        }
    };

    return (
        <div className="flex flex-col items-center justify-between gap-3 p-2 border-b border-black">
            {items.map((item, index) => (
                <div key={index}>
                    <div className="flex items-center">
                        <img src={item.variant[0].options[0].image.imageUrl} className="w-12 h-12 mr-4" />
                        <div className='flex gap-10'>
                            <p className="font-medium">{item.name}</p>
                            <p>${itemPrices[index]}</p>
                        </div>
                    </div>
                    <div className="flex items-center text-xl">
                        <button className="text-white focus:outline-none" onClick={() => handleDecreaseQuantity(index)}>-</button>
                        <span className="mx-2">{quantities[index]}</span>
                        <button className="text-white focus:outline-none" onClick={() => handleIncreaseQuantity(index)}>+</button>
                    </div>
                </div>
            ))}
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Checkout</button>

        </div>
    );
};

export default CartDropdown;

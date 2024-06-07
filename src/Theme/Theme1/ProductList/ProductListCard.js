import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../T1Context';
import { FaTimes } from 'react-icons/fa'; // Import FaTimes for the remove icon

const ProductListCard = ({ product, handleDeleteProduct }) => {
    const [addedToCart, setAddedToCart] = useState(false);

    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const { store } = useStore();
    const { previewMode } = store;

    const {
        backgroundColor,
        textColor,
        borderColor,
        selectedBackground,
    } = store.color.productListColor; // Use productListColor values

    if (!product) return null;

    const { id, image, name, variants } = product;

    const handleVariantSelect = (index) => {
        setSelectedVariantIndex(index);
    };

    const handleAddToCart = () => {
        // This function should handle adding the product to the cart
        // For demonstration purposes, it just sets the addedToCart state to true
        setAddedToCart(true);
    };
    const price = variants[selectedVariantIndex]?.prices[0] || 0;

    return (
        <motion.div
            className="md:w-4/5 w-full h-auto overflow-hidden flex flex-col items-start justify-start bg-white hover:shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] p-4 cursor-pointer transform transition duration-300 relative" // Added relative class
            style={{ backgroundColor, borderColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Add remove button/icon */}
            {!previewMode && (
                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-10 text-white flex items-center justify-center" // Added flex and justify-center
                    onClick={() => handleDeleteProduct(product.id)} // Call handleRemoveProduct on click
                >
                    <FaTimes /> {/* Moved the FaTimes icon outside of the button text */}
                </button>
            )}

            <img className="w-full h-48 sm:h-64 object-cover mb-2 rounded-none" src={image} alt={name} />
            <div className="w-full flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-semibold mb-1" style={{ color: textColor }}>{name}</h2>
                <span className="text-lg font-bold" style={{ color: textColor }}>${price}</span>
            </div>
            <div className="w-full flex flex-wrap justify-between mt-2 ">
                {variants.map((variant, index) => (
                    <span
                        key={index}
                        className={`cursor-pointer text-sm sm:text-base ${selectedVariantIndex === index ? 'font-bold' : ''
                            } rounded-md px-1`}
                        onClick={() => handleVariantSelect(index)}
                        style={{ backgroundColor: selectedVariantIndex === index ? selectedBackground : '', color: textColor }}
                    >
                        {variant.option}
                    </span>
                ))}
            </div>

        </motion.div>
    );
};

export default ProductListCard;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTimes } from 'react-icons/fa'; // Import FaTimes for the remove icon
import { useStore } from '../T1Context'; // Import the StoreContext

const ProductCard = ({ product, handleStyleSelect, handleRemoveProduct }) => { // Pass handleRemoveProduct prop

    // Component state
    const [selectedStyle, setSelectedStyle] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const { store } = useStore(); // Access the store context
    const { previewMode } = store;
    useEffect(() => {
        // Check if the product is in the cart when the component mounts
        // This logic should be replaced with your actual implementation for checking the cart
        // For demonstration purposes, it's set to false by default
        setAddedToCart(false);
        console.log(previewMode);
    }, [product.id]);

    const handleAddToCart = () => {
        // This function should handle adding the product to the cart
        // For demonstration purposes, it just sets the addedToCart state to true
        setAddedToCart(true);
    };

    const handleSelectStyle = (styleIndex) => {
        setSelectedStyle(styleIndex);
        handleStyleSelect(product.id, styleIndex);
    };

    return (
        // <motion.div
        //     className="w-80 rounded overflow-hidden shadow-md cursor-pointer relative" // Add relative class
        //     whileHover={{ scale: 1.03 }}
        //     whileTap={{ scale: 0.98 }}
        //     style={{ backgroundColor: store.color.subProductColor.backgroundColor, color: store.color.subProductColor.textColor }}
        // >
        //     {/* Add remove button/icon */}
        //     {!previewMode && (
        //         <button
        //             className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-10 text-white flex items-center justify-center" // Added flex and justify-center
        //             onClick={() => handleRemoveProduct(product.id)} // Call handleRemoveProduct on click
        //         >
        //             <FaTimes /> {/* Moved the FaTimes icon outside of the button text */}
        //         </button>
        //     )}


        //     <div className="relative">
        //         <motion.img
        //             className="w-full h-60 p-2 object-cover"
        //             src={product.image}
        //             alt={product.name}
        //             initial={{ opacity: 0, scale: 0.9 }}
        //             animate={{ opacity: 1, scale: 1 }}
        //             transition={{ duration: 0.5 }}
        //         />
        //         <motion.div
        //             className="absolute top-2 right-2 p-2 rounded-full"
        //             initial={{ opacity: 0, scale: 0.9 }}
        //             animate={{ opacity: 1, scale: 1 }}
        //             transition={{ delay: 0.2, duration: 0.5 }}
        //         >
        //             {product.sizes[selectedStyle]}
        //         </motion.div>
        //     </div>
        //     <div className="px-6 py-4">
        //         <div className="font-bold text-xl mb-2">{product.name}</div>
        //         <div className="flex space-x-2">
        //             {product.variants.map((variant, index) => (
        //                 <button
        //                     key={index}
        //                     className={`px-3 py-1 border border-gray-300 rounded ${selectedStyle === index ? 'bg-gray-200' : ''}`}
        //                     onClick={() => handleSelectStyle(index)}
        //                     style={{ backgroundColor: selectedStyle === index ? store.color.subProductColor.selectedBackground : '' }}
        //                 >
        //                     {variant.option}
        //                 </button>
        //             ))}
        //         </div>
        //         <div className="mt-4">
        //             <div className="text-lg font-bold flex items-center justify-between">
        //                 ${product.variants[selectedStyle].prices[selectedStyle]}
        //                 {!addedToCart && (
        //                     <button
        //                         className="text-base px-3 py-1 border border-gray-300 rounded"
        //                         onClick={handleAddToCart}
        //                     >
        //                         Add to Cart
        //                     </button>
        //                 )}
        //                 {addedToCart && (
        //                     <button
        //                         className="text-green-200 text-base px-3 py-1 border border-green-800 bg-slate-50 rounded cursor-not-allowed"
        //                         disabled
        //                     >
        //                         <FaShoppingCart className="mr-1 text-green-800" />
        //                     </button>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </motion.div>
        <h1>hello</h1>
    );
};

export default ProductCard;


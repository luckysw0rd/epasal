import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {FaArrowRight} from 'react-icons/fa'
const SubProductCard4 = ({ product, store }) => {
    const navigate = useNavigate();

    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));
        if (store?.fetchedFromBackend && !store?.isEdit)
            navigate("/productlanding", { state: { product, store } });
    };

    return (
        <motion.div
            className="relative w-[280px] bg-white shadow-md rounded-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            style={{ backgroundColor: store.color.subProductColor.backgroundColor, color: store.color.subProductColor.textColor, border: `2px solid ${store.color.subProductColor.borderColor}` }}
        >
            <img
                src={product.image.imageUrl}
                alt={product.name}
                className="h-60 w-full object-cover"
                onClick={() => handleProductClick(product)}
            />
            <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-4 rounded-t-xl"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
            >
                <p className="text-lg font-bold">{product.name}</p>
                <p className="text-sm mb-2">Variants</p>
                <div className="flex space-x-2 mb-2">
                    {/* Replace these divs with actual variant images */}
                    <div className="w-8 h-8 bg-white"></div>
                    <div className="w-8 h-8 bg-white"></div>
                    <div className="w-8 h-8 bg-white"></div>
                    <div className="w-8 h-8 bg-white"></div>
                </div>
                <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                <div className="flex justify-between items-center mt-2">
                    <button
                        className="flex items-center bg-green-500 p-2 rounded-full"
                        onClick={() => handleProductClick(product)}
                    >
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                    </button>
                    <button
                        className="bg-blue-500 p-2 rounded-full"
                        onClick={() => handleProductClick(product)}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SubProductCard4;

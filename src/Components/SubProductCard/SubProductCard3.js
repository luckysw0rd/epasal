import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SubProductCard3 = ({ product, handleRemoveProduct, store }) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const { previewMode, isEdit } = store;
    const navigate = useNavigate()

    useEffect(() => {
        setAddedToCart(false);
    }, [product.id]);

    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));

        if (store?.fetchedFromBackend && !store?.isEdit)
            navigate("/productlanding", { state: { product, store } })
    };

    const handleAddToCart = () => {
        setAddedToCart(true);
    };

    const handleDeleteProduct = async () => {
        if (isEdit) {
            handleRemoveProduct({ id: product._id, storeId: store._id });
        } else {
            handleRemoveProduct({ id: product.id });
        }
    };

    const limitDescription = (description, limit = 20) => {
        const words = description.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return description;
    };

    return (
        <motion.div
            className="w-62 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: store.color.subProductColor.backgroundColor, color: store.color.subProductColor.textColor, border: `2px solid ${store.color.subProductColor.borderColor}` }}
        >
            {(!previewMode) && (
                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 flex items-center justify-center"
                    onClick={handleDeleteProduct}
                    style={{ backgroundColor: store.color.subProductColor.deleteButtonBackground }}
                >
                    <FaTimes />
                </button>
            )}
            <a href="#">
                <img
                    src={product.image.imageUrl}
                    alt={product.name}
                    className="h-60 w-full p-2 object-cover rounded-t-xl"
                />
                <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">{product.subcategories[0]}</span>
                    <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                    <div className="flex  items-center justify-between">
                        <div className=' flex justify-start items-center'>
                            <p className="text-md text-nowrap font-semibold cursor-auto my-3" style={{ color: `${store.color.subProductColor.priceColor}` }}>
                                Rs {product.price - product.discount}
                            </p>
                            {product.discount > 0 &&
                                <del>
                                    <p className="text-sm text-nowrap  text-center  text-gray-600 cursor-auto ml-2">Rs {product.price}</p>
                                </del>}
                        </div>
                        <div className=" ">

                            <button
                                className="py-2 px-6 rounded-full duration-300"
                                onClick={() => {
                                    handleProductClick(product)
                                }}
                                style={{ backgroundColor: `${store.color.subProductColor.priceColor}`, color: `${store.color.subProductColor.priceLetterColor}` }}
                            >
                                <FaShoppingCart />
                            </button>

                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

export default SubProductCard3;

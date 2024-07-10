import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductListcard3 = ({ product, handleRemoveProduct, store, productListProps }) => {
    const { addToCart } = productListProps;
    const [addedToCart, setAddedToCart] = useState(false);
    const { previewMode, isEdit } = store;
    const navigate = useNavigate()

    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));

        if (store?.fetchedFromBackend && !store?.isEdit)
            navigate("/productlanding", { state: { product, store } })
    };
    useEffect(() => {
        setAddedToCart(false);
    }, [product.id]);

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
            className="w-[260px] bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: store?.color?.productListColor?.backgroundColor, color: store.color.productListColor.textColor, border: `2px solid ${store.color.productListColor.borderColor}` }}
        >
            {(!previewMode || isEdit) && (
                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 flex items-center justify-center"
                    onClick={handleDeleteProduct}
                    style={{ backgroundColor: store.color.productListColor.deleteButtonBackground }}
                >
                    <FaTimes />
                </button>
            )}
            <a >
                <div onClick={() => handleProductClick(product)} >
                <img
                    src={product.image.imageUrl}
                    alt={product.name}
                    className="h-60  w-full object-cover rounded-t-xl"
                />
                </div>
                <div className="px-4 py-3 w-70 border-t-2"
                    style={{ borderColor: `${store?.color?.productListColor?.borderColor}` }}
                >
                    <span className="text-gray-400 mr-3 uppercase text-xs">{product.subcategories[0]}</span>
                    <p className="text-lg font-bold  truncate block capitalize">{product.name}</p>
                    <div className="flex  items-center justify-between">
                        <div className=' flex justify-start items-center'>
                            <p className="text-md text-nowrap font-semibold cursor-auto my-3" style={{ color: `${store.color.productListColor.priceColor}` }}>
                                Rs {product.price - product.discount}
                            </p>
                            {product.discount > 0 &&
                                <del>
                                    <p className="text-sm text-nowrap  text-center  text-gray-600 cursor-auto ml-2">Rs {product.price}</p>
                                </del>}
                        </div>
                        <div className=" ">

                            <button
                                className="py-2 px-6 rounded-full duration-300 border-2"
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = store.color?.productListColor?.buttonBgColorOnHover}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = store.color?.productListColor?.buttonBgColor}
                                onClick={() => {
                                    handleProductClick(product)
                                }}
                                style={{ backgroundColor: `${store.color?.productListColor?.buttonBgColor}`, color: `${store?.color?.productListColor?.buttonTextColor}`, borderColor: `${store.color?.productListColor?.buttonBorderColor}` }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    fill="currentColor"
                                    className="bi bi-bag-plus"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                                    />
                                    <path
                                        d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                                    />
                                </svg>
                            </button>

                        </div>
                    </div>
  
                </div>
            </a>
        </motion.div>
    );
};

export default ProductListcard3;

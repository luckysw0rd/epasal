import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const NewProductListCard3 = ({ product, handleRemoveProduct, store }) => {
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

    const truncateName = (name, charLimit) => {
        if (name.length > charLimit) {
            return name.slice(0, charLimit) + '...';
        }
        return name;
    };

    return (
        <motion.div
            className="w-full md:w-[260px]  shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: store.color.newProductColor.cardBackground, color: store.color.newProductColor.textColor, border: `2px solid ${store.color.newProductColor.borderColor}` }}
        >
            {(!previewMode || isEdit) && (
                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 flex items-center justify-center"
                    onClick={handleDeleteProduct}
                    style={{ backgroundColor: store.color.newProductColor.deleteButtonBackground }}
                >
                    <FaTimes />
                </button>
            )}
            <a >
                <div onClick={() => handleProductClick(product)} >
                    <img
                        src={product.image.imageUrl}
                        alt={product.name}
                        className="h-36 md:h-60 w-full object-cover rounded-t-lg"
                    />
                </div>
                <div className="px-4 py-1 md:py-3 w-70 border-t-2"
                    style={{ borderColor: `${store?.color?.newProductColor?.borderColor}` }}
                >
                    <span className=" mr-3 uppercase text-xs">{product.subcategories[0]}</span>
                    <p className="text-base md:text-lg font-bold truncate block capitalize">{truncateName(product.name, 10)}</p>
                    <div className="flex my-2 md:mt-0 items-center justify-between">
                        <div className=' flex md:flex-row flex-col justify-start items-center'>
                            <p className="text-md text-nowrap font-semibold cursor-auto md:my-3" style={{ color: `${store.color.newProductColor.priceColor}` }}>
                                Rs {product.price - product.discount}
                            </p>
                            {product.discount > 0 &&
                                <del>
                                    <p className="text-sm text-nowrap  text-center  text-gray-600 cursor-auto md:ml-2">Rs {product.price}</p>
                                </del>}
                        </div>
                        <div className=" ">

                            <button
                                className="py-2 px-4 md:px-6 border md:border-2 rounded-full duration-300"
                                onClick={() => {
                                    handleProductClick(product)
                                }}
                                style={{ backgroundColor: `${store.color.newProductColor.buttonBgColor}`, color: `${store.color.newProductColor.priceLetterColor}`, borderColor: `${store.color.newProductColor.buttonBorderColor}` }}

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

export default NewProductListCard3;
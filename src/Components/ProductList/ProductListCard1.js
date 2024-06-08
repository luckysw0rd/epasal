import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaTimes } from 'react-icons/fa';

const ProductListCard1 = ({ productListProps, handleDeleteProduct, product }) => {
    const { productColor, previewMode, addToCart } = productListProps;
    const { cardBackground, textColor, priceColor, borderColor, buttonTextColor, buttonBgColor, buttonBgColorOnHover, heartColor, buttonBorderColor } = productColor;

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [displayedImage, setDisplayedImage] = useState(product.image.imageUrl);

    if (!product) return null;

    const { id, name, image, variant } = product;
    const firstVariant = variant[0]; // Considering only the first variant
    const selectedOption = selectedOptionIndex === -1 ? null : firstVariant.options[selectedOptionIndex];
    const price = selectedOption ? selectedOption.price : product.price || 0;

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
        setDisplayedImage(firstVariant.options[index].image.imageUrl);
    };

    const handleDefaultImage = () => {
        setSelectedOptionIndex(-1);
        setDisplayedImage(product.image.imageUrl);
    };

    return (
        <motion.div
            className="font-roboto rounded-sm overflow-hidden transform transition duration-300 relative border-solid border-2 w-full xl:w-[270px] h-[372px] mx-auto"
            style={{ borderColor }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="w-full">
                <div className="relative w-full">
                    {!previewMode && (
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-10 text-white flex items-center justify-center"
                            onClick={() => handleDeleteProduct(product.id)}
                        >
                            <FaTimes />
                        </button>
                    )}
                    <div className="card cursor-pointer flex flex-col gap-2 justify-center rounded-xl shadow-2xl w-full" style={{ backgroundColor: cardBackground }}>
                        <div>
                            <img src={displayedImage} alt={name} className="w-[252px] h-[196px] object-contain mx-auto" style={{ aspectRatio: '1/1' }} />
                        </div>
                        <div className="px-5 w-full">
                            <hr className="border-t-2" style={{ borderColor: borderColor }} />
                            <div className="prod-title mt-2 flex justify-between items-center">
                                <p className="text-2xl font-bold" style={{ color: textColor }}>{name}</p>
                                <p className="font-bold text-lg" style={{ color: priceColor }}>Rs {price}</p>
                            </div>
                            <div className="grid gap-2 relative w-full">
                                <div className="flex mt-5">
                                    <div
                                        className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
                                        onClick={handleDefaultImage}
                                    >
                                        <img src={image.imageUrl} alt="Default" style={{ height: "48px", width: "48px" }} className='me-2' />
                                    </div>
                                    {firstVariant.options.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
                                            onClick={() => handleOptionSelect(index)}
                                        >
                                            <img src={option.image.imageUrl} alt={option.name} style={{ height: "48px", width: "48px" }} className='me-2' />
                                        </div>
                                    ))}
                                </div>
                                <div className='absolute right-1 top-1'>
                                    <FaHeart style={{ color: heartColor }} size={15} />
                                </div>
                                <div className="flex mb-5 text-xl font-bold md:flex-row justify-between items-center text-gray-900">
                                    <button className="py-2 transition ease-in duration-200 border-none focus:outline-none">
                                        <div style={{ color: priceColor }} className="flex gap-1 text-xs items-center">
                                            Learn More <IoIosArrowForward />
                                        </div>
                                    </button>
                                    <button style={{ color: buttonTextColor, borderColor: buttonBorderColor, backgroundColor: buttonBgColor }} className={`px-3 py-1 text-xs transition ease-in duration-200 border-solid border rounded-sm focus:outline-none addToCartBtn`}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonBgColorOnHover}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonBgColor}
                                        onClick={() => addToCart(product)}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductListCard1;

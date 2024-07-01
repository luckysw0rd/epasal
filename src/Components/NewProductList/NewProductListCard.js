
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const NewProductListCard = ({ productListProps, handleDeleteProduct, product }) => {
    const { productColor, previewMode, addToCart, store } = productListProps;
    const { cardBackground, textColor, priceColor, borderColor, buttonTextColor, buttonBgColor, buttonBgColorOnHover, heartColor, buttonBorderColor } = productColor;

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [displayedImage, setDisplayedImage] = useState(product?.image?.imageUrl);
    const navigate = useNavigate()
    //truncating 
    const getTruncateLength = (width) => {
        if (width < 640) return 50; // sm
        if (width < 1281) return 37; // md, lg
        return 50; // xl, 2xl
    };
    const [truncateLength, setTruncateLength] = useState(getTruncateLength(window.innerWidth));
    useEffect(() => {
        const handleResize = () => {
            setTruncateLength(getTruncateLength(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));

        if (store.fetchedFromBackend && !store.isEdit)
            navigate("/productlanding", { state: { product, store } })
    };
    const truncateName = (name, charLimit) => {
        if (name.length > charLimit) {
            return name.slice(0, charLimit) + '...';
        }
        return name;
    };

    if (!product) return null;

    const { id, name, image, variant } = product;
    const firstVariant = variant[0]; // Considering only the first variant
    const selectedOption = selectedOptionIndex === -1 ? null : firstVariant?.options[selectedOptionIndex];
    const price = selectedOption ? selectedOption.price : product.price || 0;
    const discount = selectedOption ? selectedOption.discount : product.discount || 0
    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
        setDisplayedImage(firstVariant?.options[index]?.image?.imageUrl);
    };

    const handleDefaultImage = () => {
        setSelectedOptionIndex(-1);
        setDisplayedImage(product?.image?.imageUrl);
    };

    return (
        <motion.div
            className="font-roboto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm overflow-hidden transform transition duration-300 relative border-solid border-2 w-full xl:w-[270px] h-full mx-auto"
            style={{ borderColor }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="w-full">
                <div className="relative w-full">
                    {/* {!previewMode && (
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-10 text-white flex items-center justify-center"
                            onClick={() => handleDeleteProduct(product.id)}
                        >
                            <FaTimes />
                        </button>
                    )} */}
                    <div className="card cursor-pointer  flex flex-col  justify-center rounded-xl shadow-2xl w-full" style={{ backgroundColor: cardBackground }}>
                        <button>
                            <img src={displayedImage} alt={name} className="w-[252px] h-[196px] object-contain  mx-auto p-3" style={{ aspectRatio: '1/1' }} />
                        </button>
                        <div className="px-5 w-full">
                            <hr className="border-t-2" style={{ borderColor: borderColor }} />
                            <div className=" py-2 "
                            // className="prod-title mt-2 flex justify-between items-center"
                            >
                                <p className="text-xl  font-bold" style={{ color: textColor }}>{truncateName(name, 22)}</p>
                                <div className=' flex flex-row space-x-2'>
                                    <p className="my-1 font-bold text-md" style={{ color: priceColor }}>Rs. {price - discount}</p>
                                    {discount > 0 &&
                                        <del className='  text-sm    text-nowrap flex items-center' style={{ color: `${store.color.subProductColor.priceColor}` }}>Rs. {price}</del>
                                    }
                                </div>
                            </div>
                            <div className="grid gap-2 relative w-full">
                                <div className="flex ">
                                    <div
                                        className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
                                        onClick={handleDefaultImage}
                                    >
                                        <img src={image?.imageUrl} alt="Default" style={{ height: "48px", width: "48px" }} className='me-2 object-contain' />
                                    </div>
                                    {firstVariant?.options?.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
                                            onClick={() => handleOptionSelect(index)}
                                        >
                                            <img src={option?.image?.imageUrl} alt={option.name} style={{ height: "48px", width: "48px" }} className='me-2' />
                                        </div>
                                    ))}
                                </div>
                                {/* <div className='absolute right-1 top-1'>
                                    <FaHeart style={{ color: heartColor }} size={15} />
                                </div> */}
                                <div className="flex mb-5 text-xl font-bold md:flex-row justify-between items-center text-gray-900">
                                    <button className="py-2 transition ease-in duration-200 border-none focus:outline-none">
                                        <div style={{ color: priceColor }} className="flex gap-1 text-xs items-center">
                                            Learn More <IoIosArrowForward />
                                        </div>
                                    </button>
                                    <button style={{ color: buttonTextColor, borderColor: buttonBorderColor, backgroundColor: buttonBgColor }} className={`px-3 py-1 text-xs transition ease-in duration-200 border-solid border rounded-sm focus:outline-none addToCartBtn`}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonBgColorOnHover}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonBgColor}
                                        onClick={() => {
                                            handleProductClick(product);
                                        }}>
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

export default NewProductListCard;

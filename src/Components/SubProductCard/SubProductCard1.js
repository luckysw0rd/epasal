
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTimes } from 'react-icons/fa'; // Import FaTimes for the remove icon
import { useStore } from '../../Theme/Theme1/T1Context'; // Import the StoreContext
import { StarIcon } from '@heroicons/react/16/solid';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
const SubProductCard1 = ({ product, handleStyleSelect, handleRemoveProduct, store }) => {
    // Component state
    const { addToCart } = useStore();
    const [selectedStyle, setSelectedStyle] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0)
    const [addedToCart, setAddedToCart] = useState(false);
    const { previewMode, isEdit } = store;
    const { isLoading, error, sendRequest, onCloseError } = useFetch()
    const navigate = useNavigate()


    const getTruncateLength = (width) => {
        if (width < 640) return 15; // sm
        if (width < 1281) return 15; // md, lg
        return 30; // xl, 2xl
    };
    const getTruncateLength1 = (width) => {
        if (width < 640) return 40; // sm
        if (width < 1281) return 40; // md, lg
        return 50; // xl, 2xl
    };
    const [truncateLength, setTruncateLength] = useState(getTruncateLength(window.innerWidth));
    const [truncateLength1, setTruncateLength1] = useState(getTruncateLength(window.innerWidth));
    useEffect(() => {
        const handleResize = () => {
            setTruncateLength(getTruncateLength(window.innerWidth));
            setTruncateLength1(getTruncateLength1(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const truncateName = (name) => {
        return name.length > truncateLength ? name.slice(0, truncateLength) + '...' : name;
    };
    const truncateName1 = (detail) => {
        return detail.length > truncateLength1 ? detail.slice(0, truncateLength1) + '...' : detail;
    };
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

    const handleDeleteProduct = async () => {
        if (isEdit) {
            // const responseData = await sendRequest(
            //     'product/deleteProduct',
            //     'POST',
            //     JSON.stringify({
            //         id:product._id, storeId:store._id
            //     }),
            //     {
            //         'Content-Type': 'application/json'
            //     }
            // );
            handleRemoveProduct({ id: product._id, storeId: store._id })
        } else {
            handleRemoveProduct({ id: product.id })
        }
    }

    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));

        if (store.fetchedFromBackend && !store.isEdit)
            navigate("/productlanding", { state: { product, store } })
    };

    return (
        <motion.div
            className="  flex flex-col md:flex-row items-center text-center md:text-left   w-[200px] h-[280px]  md:w-[402px] md:h-[216px] rounded overflow-hidden shadow-md cursor-pointer relative " // Add relative class
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: store.color.subProductColor.backgroundColor, color: store.color.subProductColor.textColor, border: `2px solid ${store.color.subProductColor.borderColor}` }}
        >
            {/* Add remove button/icon */}
            {(!previewMode) && (
                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-10 text-white flex items-center justify-center" // Added flex and justify-center
                    onClick={handleDeleteProduct} // Call handleRemoveProduct on click
                >
                    <FaTimes /> {/* Moved the FaTimes icon outside of the button text */}
                </button>
            )}


            <div className="relative w-[140px]  md:w-[240px] h-[139px] flex ml-2 mt-5 md:mt-0">
                <motion.img
                    className="w-full h-[120px] sm:h-full object-contain "
                    src={product?.image?.imageUrl}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="px-10 md:py-4 w-[280px]">
                <div className="font-bold text-base mt-2 md:mt-3">{truncateName(product.name)}</div>
                <div className='flex mb-1 md:mb-2 justify-center md:justify-start'>
                    {[...Array(5)].map((_, index) => {
                        if (index < product.rating)
                            return <StarIcon className='w-4 h-4' style={{ color: store.color.subProductColor.starColor }} />
                        else
                            return <StarIcon className='w-4 h-4 text-[#959595]' />
                    })}
                </div>
                <div className=' md:h-[56px] py-1 text-xs overflow-hidden'>{truncateName1(product.description)}</div>
                <div className="mt-1">
                    <div className="text-sm font-bold flex items-center gap-1 justify-between mx-2 sm:mx-0" >
                        <div className=' flex flex-col gap-0 '>
                            {product.discount > 0 &&
                                <del className=' text-[12px] md:text-sm     text-nowrap flex items-center' style={{ color: `${store.color.subProductColor.priceColor}` }}>NRs. {product.price}</del>
                            }
                            <div className=' text-[14px] md:text-md  flex text-nowrap items-center' style={{ color: `${store.color.subProductColor.priceColor}` }}>NRs. {product.price - product.discount}</div>
                        </div>
                        <button
                            className="text-xs h-8 w-[80px] rounded "
                            onClick={() => {
                                handleProductClick(product)
                            }}
                            style={{ backgroundColor: `${store.color.subProductColor.priceColor}`, color: `${store.color.subProductColor.priceLetterColor}` }}
                        >
                            Add to Cart
                        </button>

                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default SubProductCard1
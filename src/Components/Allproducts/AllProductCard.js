import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AllProductCard = ({ product, store }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const truncateLength = (name, charLimit) => {
        if (name.length > charLimit) {
            return name.slice(0, charLimit) + '...';
        }
        return name;
    };

    const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
        if (originalPrice === 0) return 0;
        const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
        return Math.round(discount); // Rounds the percentage to the nearest whole number
    };


    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));

        if (store.fetchedFromBackend && !store.isEdit)
            navigate("/productlanding", { state: { product, store } })
    };


    return (
        <div
            className="relative bg-white rounded-lg shadow-lg p-4 w-[285px] max-w-xs h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product1 Image */}
            <div className="relative">
                <img
                    src={product.image?.imageUrl}
                    alt={product?.name}
                    className="rounded-lg w-full h-[300px] object-cover"
                />
                {/* Discount Badge */}
                {product.discount && (
                    <div className="absolute top-2 right-2 w-12 h-12 flex justify-center items-center bg-red-500 text-white text-sm px-2 py-2 rounded-full">
                        {calculateDiscountPercentage(product?.price, product?.price - product?.discount)}%
                    </div>
                )}
                {/* Add to Cart Button (Visible on Hover) */}
                {isHovered && (
                    <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50'>
                        <button className=" text-[#cb9b29] px-8 py-2 bg-white border-none font-semibold rounded-2xl"
                            onClick={() => {
                                handleProductClick(product)
                            }}
                        >
                            Add to Cart
                        </button>

                    </div>
                )}
            </div>

            <div className="mt-4 flex flex-col justify-between h-[130px] pb-3">
                <div className='flex flex-col gap-1'>
                    <h3 className="text-xl font-semibold">{truncateLength(product?.name, 20)}</h3>
                    <p className="text-gray-500 text-sm">{truncateLength(product?.description, 50)}</p>
                </div>
                <div className="flex items-end justify-between space-x-2 mt-2">
                    <span className="text-xl font-bold text-gray-800">Rs. {product?.price - product?.discount}</span>
                    {product.discount && (
                        <span className="text-gray-500 line-through">Rs. {product?.price}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProductCard;
import React, { useEffect, useState } from 'react';
import { TbShoppingBagPlus } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FiClock } from "react-icons/fi";
import { TbCash } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { PiCreditCard } from "react-icons/pi";
import { StarIcon } from '@heroicons/react/16/solid';
import ProductReview from './ProductReview';
import SimilarProducts from './SimilarProducts';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Allproducts/Navbar';

const ProjectLanding1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { product, store: fetchedStore } = location.state || {};

    const [store, setStore] = useState(() => {
        const storeData = localStorage.getItem('store');
        return fetchedStore || (storeData ? JSON.parse(storeData) : null);
    });
    const [selectedProduct, setSelectedProduct] = useState(() => {
        const storedProduct = localStorage.getItem('product');
        return product || (storedProduct ? JSON.parse(storedProduct) : null);
    });
    const [selectedVariants, setSelectedVariants] = useState(selectedProduct?.variant.map(() => -1) || []);
    const [displayedImage, setDisplayedImage] = useState(selectedProduct?.image?.imageUrl);
    const [productCount, setProductCount] = useState(1);

    const handleOptionSelect = (variantIndex, optionIndex) => {
        const newSelectedVariants = [...selectedVariants];
        newSelectedVariants[variantIndex] = optionIndex;
        setSelectedVariants(newSelectedVariants);

        const selectedOption = selectedProduct.variant[variantIndex].options[optionIndex];
        setDisplayedImage(selectedOption.image?.imageUrl || selectedProduct?.image?.imageUrl);
    };

    const handleVariantChange = (variantIndex, optionName) => {
        const variant = selectedProduct.variant[variantIndex];
        const optionIndex = variant.options.findIndex(option => option.name === optionName);
        handleOptionSelect(variantIndex, optionIndex);
    };

    const incrementQuantity = () => {
        setProductCount(prevCount => prevCount + 1);
    };

    const decrementQuantity = () => {
        setProductCount(prevCount => Math.max(1, prevCount - 1));
    };

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const newCartItem = {
            product: selectedProduct._id,
            productName: selectedProduct.name,
            price: calculateTotalPrice(),
            discountAmount: calculateTotalDiscount(),
            count: productCount,
            selectedVariants: selectedProduct.variant.map((variant, index) => ({
                name: variant.name,
                option: variant.options[selectedVariants[index]]
            }))
        };
        cart.push(newCartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Product added to cart!");
    };

    const calculateTotalPrice = () => {
        return selectedProduct.variant.reduce((total, variant, index) => {
            const option = variant.options[selectedVariants[index]];
            return total + (option ? parseFloat(option.price) : 0);
        }, parseFloat(selectedProduct.price) || 0);
    };

    const calculateTotalDiscount = () => {
        return selectedProduct.variant.reduce((total, variant, index) => {
            const option = variant.options[selectedVariants[index]];
            return total + (option ? parseFloat(option.discount) : 0);
        }, 0);
    };

    useEffect(() => {
        if (selectedProduct) {
            localStorage.setItem('product', JSON.stringify(selectedProduct));
        }
        window.scrollTo(0, 0);
    }, [selectedProduct]);

    const totalPrice = calculateTotalPrice() * productCount;
    const totalDiscount = calculateTotalDiscount() * productCount;
    const storeDetails = {
        deliveryCharge: 100,
        COD: "available",
        deliveryTime: "2-3 Days",
        warranty: "4 months",
        returnPolicyTime: "14 days"
    };

    return (
        <div>
            <Navbar store={store} />
            <div className="p-2 md:p-5 lg:p-16">
                <div className='mt-5 flex flex-col gap-5'>
                    <div className="flex flex-col md:flex-row md:gap-5 lg:gap-10">
                        <div className="w-full md:w-[75%] flex flex-col gap-10 p-5 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
                            <div className="flex flex-col md:flex-row gap-3 md:gap-5 lg:gap-10">
                                <div className="flex flex-row md:flex-col gap-5 md:w-[250px] md:h-[250px] lg:w-[400px] lg:h-[400px]">
                                    <img
                                        src={displayedImage}
                                        alt={selectedProduct?.name}
                                        className="w-full h-auto rounded"
                                        style={{ aspectRatio: '1/1' }}
                                    />
                                    <div className="flex flex-col">
                                        {selectedProduct.image && (
                                            <div
                                                className={`cursor-pointer text-sm lg:text-base ${selectedVariants.every(index => index === -1) ? 'font-bold' : ''} rounded-md`}
                                                onClick={() => setSelectedVariants(selectedProduct.variant.map(() => -1))}
                                            >
                                                <img src={selectedProduct.image.imageUrl} alt="Default" className='w-[60px] h-[60px] md:w-[55px] md:h-[55px] lg:w-[69px] lg:h-[69px] me-2' />
                                            </div>
                                        )}
                                        {selectedProduct.variant.map((variant, variantIndex) => (
                                            variant.options.map((option, optionIndex) => (
                                                <div
                                                    key={`${variantIndex}-${optionIndex}`}
                                                    className={`cursor-pointer text-sm lg:text-base ${selectedVariants[variantIndex] === optionIndex ? 'font-bold' : ''} rounded-md`}
                                                    onClick={() => handleOptionSelect(variantIndex, optionIndex)}
                                                >
                                                    <img src={option.image?.imageUrl || selectedProduct.image.imageUrl} alt={option.name} className='w-[60px] h-[60px] md:w-[55px] md:h-[55px] lg:w-[69px] lg:h-[69px] me-2' />
                                                </div>
                                            ))
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 md:gap-4 w-full">
                                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#555555]">{selectedProduct.name}</h1>
                                    <p className="text-sm text-gray-600">
                                        {selectedProduct.description}
                                    </p>
                                    <div className='flex mb-2 md:justify-start'>
                                        {[...Array(5)].map((option, index) => {
                                            if (index < parseFloat(selectedProduct.rating))
                                                return <StarIcon className='w-5 h-5 text-[#8B5A08]' key={index} />
                                            else
                                                return <StarIcon className='w-5 h-5 text-[#959595]' key={index} />
                                        })}
                                    </div>
                                    <div className="flex gap-5 items-center">
                                        <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#545454]">Rs {totalPrice}</span>
                                        <span className="line-through text-sm md:text-base lg:text-xl text-[#838383]">Rs {totalDiscount + totalPrice}</span>
                                    </div>
                                    {selectedProduct.variant.map((variant, variantIndex) => (
                                        <div className="flex gap-5 items-center" key={variantIndex}>
                                            <label htmlFor={`variant-${variantIndex}`} className="block text-sm lg:text-base text-gray-700">{variant.name}:</label>
                                            <select
                                                id={`variant-${variantIndex}`}
                                                className="md:pr-3 lg:pr-5 pl-2 py-1 w-16 md:w-20 lg:w-24 text-xs md:text-sm lg:text-base border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                value={selectedVariants[variantIndex] === -1 ? "" : variant.options[selectedVariants[variantIndex]].name}
                                                onChange={(e) => handleVariantChange(variantIndex, e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                {variant.options.map((option, optionIndex) => (
                                                    <option key={optionIndex} value={option.name}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                    <div className="flex gap-5 items-center">
                                        <label htmlFor="quantity" className="block text-sm lg:text-base text-gray-700">Quantity:</label>
                                        <div className='flex items-center gap-3'>
                                            <button className="px-2 md:px-3 md:py-1 bg-gray-200 rounded-md" onClick={decrementQuantity}> - </button>
                                            <span className="text-sm md:text-base lg:text-xl">{productCount}</span>
                                            <button className="px-2 md:px-3 md:py-1 bg-gray-200 rounded-md" onClick={incrementQuantity}> + </button>
                                        </div>
                                    </div>
                                    <button onClick={handleAddToCart} className="flex items-center justify-center gap-2 mt-3 md:mt-5 px-4 py-2 md:px-5 md:py-3 bg-blue-600 text-white rounded-md">
                                        <TbShoppingBagPlus className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[25%] flex flex-col gap-5 p-5 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
                            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#555555]">Store Details</h2>
                            <div className="flex items-center gap-3">
                                <LiaShippingFastSolid className="w-5 h-5 text-[#555555]" />
                                <span className="text-sm md:text-base lg:text-lg text-[#555555]">{storeDetails.deliveryTime}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <TbCash className="w-5 h-5 text-[#555555]" />
                                <span className="text-sm md:text-base lg:text-lg text-[#555555]">COD {storeDetails.COD}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiClock className="w-5 h-5 text-[#555555]" />
                                <span className="text-sm md:text-base lg:text-lg text-[#555555]">{storeDetails.returnPolicyTime} Return Policy</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MdVerifiedUser className="w-5 h-5 text-[#555555]" />
                                <span className="text-sm md:text-base lg:text-lg text-[#555555]">{storeDetails.warranty} Warranty</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <PiCreditCard className="w-5 h-5 text-[#555555]" />
                                <span className="text-sm md:text-base lg:text-lg text-[#555555]">Secure Payment</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <ProductReview product={product} />
                        {/* <SimilarProducts store={store}  similarProducts={selectedProduct.similarProducts} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectLanding1;

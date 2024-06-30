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
import { toast } from 'react-toastify';
const ProjectLanding1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { product, store: fetchedStore } = localStorage.getItem('product') || {};
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

        const selectedOption = selectedProduct.variant[variantIndex]?.options[optionIndex]; // Use optional chaining
        setDisplayedImage(selectedOption?.image?.imageUrl || selectedProduct?.image?.imageUrl); // Check if selectedOption is defined
    };

    const handleProductSelect = (newProduct) => {
        setSelectedProduct(newProduct);
        navigate(location.pathname, { state: { product: newProduct, store } });
        localStorage.setItem('product', JSON.stringify(newProduct));
        setDisplayedImage(newProduct.image.imageUrl);
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
        console.log(selectedProduct);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const selectedVariant = selectedProduct.variant.map((variant, index) => ({
            name: variant.name,
            options: {
                name: variant.options[selectedVariants[index]] ? variant.options[selectedVariants[index]].name : 'default',
                image: variant.options[selectedVariants[index]]?.image?.imageUrl
            }
        }));
        console.log(selectedProduct);
        const newCartItem = {
            product: selectedProduct._id || product._id,
            productName: selectedProduct.name,
            price: calculateTotalPrice(),
            discountAmount: calculateTotalDiscount(),
            count: productCount,
            selectedVariant: selectedVariant,
            productImage: selectedVariant[0]?.options?.image || selectedProduct?.image?.imageUrl
        };

        cart.push(newCartItem);

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update store state
        setStore(prevStore => {
            const updatedCart = [...(prevStore.cart || []), newCartItem];
            const updatedStore = { ...prevStore, cart: updatedCart };
            localStorage.setItem('store', JSON.stringify(updatedStore));
            return updatedStore;
        });

        console.log(newCartItem);
        console.log(store);

        // toast("Product Added To Cart")
    };




    const calculateTotalPrice = () => {
        if (!selectedProduct.variant || selectedProduct.variant.length === 0 || selectedVariants[0] < 0) {
            // Handle products without variants or unselected variants
            const basePrice = parseFloat(selectedProduct.price) || 0;
            const discount = parseFloat(selectedProduct.discount) || 0;
            console.log("hereerer")

            return basePrice - discount;
        } else {
            // Handle products with variants
            const selectedOptionIndex = selectedVariants[0];
            const selectedVariant = selectedProduct.variant[selectedOptionIndex];

            if (selectedVariant && selectedVariant.options && selectedVariant.options[selectedOptionIndex]?.price) {
                return parseFloat(selectedVariant.options[selectedOptionIndex].price - selectedVariant.options[selectedOptionIndex].discount);
            } else {
                return selectedProduct.variant.reduce((total, variant, index) => {
                    const selectedOptionIndex = selectedVariants[index];
                    const selectedOption = variant.options[selectedOptionIndex];
                    const basePrice = parseFloat(selectedProduct.price) || 0;
                    const variantPrice = selectedOption ? parseFloat(selectedOption.price) : 0;
                    const discount = parseFloat(selectedProduct.discount) || 0;
                    const variantDiscount = selectedOption && parseFloat(selectedOption.discount) || 0;
                    console.log(selectedOption);
                    console.log(variantPrice);
                    console.log(variantDiscount);
                    // Calculate the effective price for the current variant selection
                    const effectivePrice = variantPrice > 0 ? variantPrice - variantDiscount : basePrice - discount;

                    // Add to the total price
                    return total + effectivePrice;
                }, 0);
            }
        }
    };



    const calculateTotalDiscount = () => {
        if (!selectedProduct.variant || selectedProduct.variant.length === 0) {
            // Handle products without variants
            return parseFloat(selectedProduct.discount) || 0;
        } else {
            // Handle products with variants
            return selectedProduct.variant.reduce((total, variant, index) => {
                // Check if index is 0 (first variant)
                if (index === 0) {
                    const selectedOptionIndex = selectedVariants[index];
                    const selectedOption = variant.options[selectedOptionIndex];
                    // Calculate discount based on selected variant option
                    return total + (selectedOption ? parseFloat(selectedOption.discount) || 0 : parseFloat(selectedProduct.discount) || 0);
                } else {
                    // For other variants, do not calculate discount
                    return total;
                }
            }, 0);
        }
    };

    useEffect(() => {
        if (selectedProduct) {
            localStorage.setItem('product', JSON.stringify(selectedProduct));
        }
        window.scrollTo(0, 0);
    }, [selectedProduct]);

    console.log(productCount);
    const totalPrice = calculateTotalPrice() * productCount;
    console.log(totalPrice);
    const totalDiscount = calculateTotalDiscount() * productCount;
    const storeDetails = {
        deliveryCharge: store.expectedDeliveryPrice,
        COD: "available",
        deliveryTime: store.expectedDeliveryTime,

    };

    return (
        <div>
            <Navbar store={store} setStore={setStore} color={store.color} />
            <div className="p-2 mt-10 md:mt-0 md:p-5 lg:p-16">
                <div className='mt-5 flex flex-col gap-5'>
                    <div className="flex flex-col md:flex-row md:gap-5 lg:gap-10">
                        <div className="w-full md:w-[75%] flex flex-col gap-10 p-5 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
                            <div className="flex flex-col md:flex-row gap-3 md:gap-5 lg:gap-10">
                                <div className="flex  flex-col md:flex-col gap-5 md:w-[250px] md:h-[250px] lg:w-[400px] lg:h-[400px]">
                                    <img
                                        src={displayedImage}
                                        alt={selectedProduct?.name}
                                        className="w-full h-auto rounded"
                                        style={{ aspectRatio: '1/1' }}
                                    />
                                    <div className="flex  md:flex-row">
                                        {selectedProduct.image && (
                                            <div
                                                className={`cursor-pointer text-sm lg:text-base ${selectedVariants.every(index => index === -1) ? 'font-bold' : ''} rounded-md`}
                                                onClick={() => setSelectedVariants(selectedProduct.variant.map(() => -1))}
                                            >
                                                <img src={selectedProduct.image.imageUrl} alt="Default" className='w-[60px] h-[60px] md:w-[55px] md:h-[55px] lg:w-[69px] lg:h-[69px] me-2' />
                                            </div>
                                        )}
                                        {selectedProduct.variant.map((variant, variantIndex) => (
                                            variantIndex == 0 &&
                                            selectedProduct.variant[0].options.map((option, optionIndex) => (
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
                            {/* <div className="flex items-center gap-3">
                                <MdVerifiedUser className="w-5 h-5 text-[#555555]" />
                                <span className="text-sm md:text-base lg:text-lg text-[#555555]">{storeDetails.warranty} Warranty</span>
                            </div> */}
                            <div className="flex items-center gap-3">
                                <PiCreditCard className="w-5 h-5 text-[#555555]" />
                                <span className="text-sm md:text-base lg:text-lg text-[#555555]">Secure Payment</span>
                            </div>
                            {/* <div className="flex items-center gap-3">
                                <PiCreditCard className="w-5 h-5 text-[#555555]" />
                                <span className="text-sm md:text-base lg:text-lg text-[#555555]"> </span>
                            </div> */}

                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <ProductReview product={selectedProduct} />
                        {/* <SimilarProducts store={store || JSON.parse(localStorage.getItem('store'))} product={selectedProduct} onProductSelect={handleProductSelect} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectLanding1;

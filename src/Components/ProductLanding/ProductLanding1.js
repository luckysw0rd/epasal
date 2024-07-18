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
        if (variantIndex == 0) {
            setDisplayedImage(selectedOption?.image?.imageUrl || selectedProduct?.image?.imageUrl); // Check if selectedOption is defined
        }
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
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const selectedVariant = selectedProduct.variant.map((variant, index) => ({
            name: variant.name,
            options: {
                name: variant.options[selectedVariants[index]] ? variant.options[selectedVariants[index]].name : 'default',
                image: variant.options[selectedVariants[index]]?.image?.imageUrl
            }
        }));
        
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

       

        toast.success("Product Added To Cart", {
            position: "top-center",
            pauseOnFocusLoss: false,
            pauseOnHover: false
        })
    };




    const calculateTotalPrice = () => {
        if (!selectedProduct.variant || selectedProduct.variant.length === 0 || selectedVariants[0] < 0) {
            // Handle products without variants or unselected variants
            const basePrice = parseFloat(selectedProduct.price) || 0;
            const discount = parseFloat(selectedProduct.discount) || 0;
           

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
                   
                    // Calculate the effective price for the current variant selection
                    const effectivePrice = variantPrice > 0 ? variantPrice - variantDiscount : basePrice - discount;

                    // Add to the total price
                    return effectivePrice;
                }, 0);
            }
        }
    };

    const changeDefaultImage = () => {
        setSelectedVariants(selectedProduct.variant.map(() => -1))

        setDisplayedImage(selectedProduct?.image?.imageUrl)
    }

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


    const totalPrice = calculateTotalPrice() * productCount;

    const totalDiscount = calculateTotalDiscount() * productCount;
    const storeDetails = {
        deliveryCharge: store.expectedDeliveryPrice,
        COD: "available",
        deliveryTime: store.expectedDeliveryTime,

    };
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar store={store} setStore={setStore} color={store.color} />
            <div className="px-4 py-8 md:py-16 lg:px-24">
                <div className="mt-10 flex flex-col gap-10">
                    <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
                        <div className="w-full md:w-2/3 flex flex-col gap-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col gap-6 md:w-80 lg:w-96">
                                    <img
                                        src={displayedImage}
                                        alt={selectedProduct?.name}
                                        className="w-full h-auto rounded-lg object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
                                    />
                                    <div className="flex gap-3 mt-4">
                                        {selectedProduct.image && (
                                            <div
                                                className={`cursor-pointer text-sm lg:text-base ${selectedVariants.every(index => index === -1) ? 'font-bold' : ''} rounded-md`}
                                                onClick={changeDefaultImage}
                                            >
                                                <img src={selectedProduct.image.imageUrl} alt="Default" className="w-16 h-16 md:w-14 md:h-14 lg:w-20 lg:h-20 rounded-md object-cover transition-transform duration-300 hover:scale-105" />
                                            </div>
                                        )}
                                        {selectedProduct.variant.map((variant, variantIndex) => (
                                            variantIndex === 0 &&
                                            selectedProduct.variant[0].options.map((option, optionIndex) => (
                                                <div
                                                    key={`${variantIndex}-${optionIndex}`}
                                                    className={`cursor-pointer text-sm lg:text-base ${selectedVariants[variantIndex] === optionIndex ? 'font-bold' : ''} rounded-md`}
                                                    onClick={() => handleOptionSelect(variantIndex, optionIndex)}
                                                >
                                                    <img src={option.image?.imageUrl || selectedProduct.image.imageUrl} alt={option.name} className="w-16 h-16 md:w-14 md:h-14 lg:w-20 lg:h-20 rounded-md object-cover transition-transform duration-300 hover:scale-105" />
                                                </div>
                                            ))
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{selectedProduct.name}</h1>
                                    <p className="text-sm md:text-base text-gray-700">{selectedProduct.description}</p>
                                    <div className="flex mb-4 md:justify-start">
                                        {[...Array(5)].map((_, index) => (
                                            <StarIcon
                                                key={index}
                                                className={`w-5 h-5 ${index < Math.ceil(selectedProduct.rating) ? 'text-yellow-500' : 'text-gray-300'} transition-transform duration-300 hover:scale-110`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex gap-6 items-center">
                                        <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">Rs {totalPrice}</span>
                                        <span className="line-through text-sm md:text-base lg:text-xl text-gray-500">Rs {totalDiscount + totalPrice}</span>
                                    </div>
                                    {selectedProduct.variant.map((variant, variantIndex) => (
                                        <div className="flex gap-4 items-center" key={variantIndex}>
                                            <label htmlFor={`variant-${variantIndex}`} className="block text-sm lg:text-base text-gray-700">{variant.name}:</label>
                                            <select
                                                id={`variant-${variantIndex}`}
                                                className="md:pr-3 lg:pr-5 pl-2 py-1 w-20 md:w-24 lg:w-28 text-xs md:text-sm lg:text-base border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
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
                                    <div className="flex gap-4 items-center">
                                        <label htmlFor="quantity" className="block text-sm lg:text-base text-gray-700">Quantity:</label>
                                        <div className="flex items-center gap-3">
                                            <button className="px-2 md:px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300" onClick={decrementQuantity}> - </button>
                                            <span className="text-sm md:text-base lg:text-xl">{productCount}</span>
                                            <button className="px-2 md:px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300" onClick={incrementQuantity}> + </button>
                                        </div>
                                    </div>
                                    <button onClick={handleAddToCart} className="flex items-center justify-center gap-2 mt-4 md:mt-6 px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                                        <TbShoppingBagPlus className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">Store Details</h2>
                            <div className="flex items-center gap-3">
                                <LiaShippingFastSolid className="w-5 h-5 text-gray-800" />
                                <span className="text-sm md:text-base text-gray-800">{storeDetails.deliveryTime}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <TbCash className="w-5 h-5 text-gray-800" />
                                <span className="text-sm md:text-base text-gray-800">COD {storeDetails.COD}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiClock className="w-5 h-5 text-gray-800" />
                                <span className="text-sm md:text-base text-gray-800">{storeDetails.returnPolicyTime} Return Policy</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <PiCreditCard className="w-5 h-5 text-gray-800" />
                                <span className="text-sm md:text-base text-gray-800">Secure Payment</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 mt-12">
                        <ProductReview product={selectedProduct} />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ProjectLanding1;

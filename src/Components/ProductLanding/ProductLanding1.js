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
            console.log("hereerer");

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
                    return effectivePrice;
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
        <div className="min-h-screen bg-white">
            <Navbar store={store} setStore={setStore} color={store.color} />
            <div className="container mx-auto mt-20 p-5">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                        <img
                            src={displayedImage}
                            alt={selectedProduct?.name}
                            className="w-full max-w-lg h-auto rounded-lg object-cover"
                        />
                        <div className="flex gap-2 mt-5">
                            {selectedProduct.image && (
                                <div
                                    className={`cursor-pointer ${selectedVariants.every(index => index === -1) ? 'font-bold' : ''}`}
                                    onClick={() => setSelectedVariants(selectedProduct.variant.map(() => -1))}
                                >
                                    <img src={selectedProduct.image.imageUrl} alt="Default" className='w-16 h-16 object-cover rounded-lg' />
                                </div>
                            )}
                            {selectedProduct.variant.map((variant, variantIndex) => (
                                variantIndex === 0 &&
                                selectedProduct.variant[0].options.map((option, optionIndex) => (
                                    <div
                                        key={`${variantIndex}-${optionIndex}`}
                                        className={`cursor-pointer ${selectedVariants[variantIndex] === optionIndex ? 'font-bold' : ''}`}
                                        onClick={() => handleOptionSelect(variantIndex, optionIndex)}
                                    >
                                        <img src={option.image?.imageUrl || selectedProduct.image.imageUrl} alt={option.name} className='w-16 h-16 object-cover rounded-lg' />
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col gap-5">
                        <h1 className="text-3xl font-bold text-gray-800">{selectedProduct.name}</h1>
                        <p className="text-gray-600">{selectedProduct.description}</p>
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, index) => (
                                <StarIcon
                                    className={`w-6 h-6 ${index < Math.ceil(selectedProduct.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                                    key={index}
                                />
                            ))}
                            <span className="ml-2 text-gray-600">({selectedProduct.reviewsCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-5">
                            <span className="text-2xl font-semibold text-gray-800">Rs {totalPrice}</span>
                            <span className="line-through text-lg text-gray-500">Rs {totalDiscount + totalPrice}</span>
                        </div>
                        {selectedProduct.variant.map((variant, variantIndex) => (
                            <div className="flex items-center gap-5" key={variantIndex}>
                                <label htmlFor={`variant-${variantIndex}`} className="block text-base text-gray-700">{variant.name}:</label>
                                <select
                                    id={`variant-${variantIndex}`}
                                    className="pr-5 pl-2 py-1 text-base border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                        <div className="flex items-center gap-5">
                            <label htmlFor="quantity" className="block text-base text-gray-700">Quantity:</label>
                            <div className="flex items-center gap-3">
                                <button className="px-3 py-1 bg-gray-200 rounded-md" onClick={decrementQuantity}> - </button>
                                <span className="text-lg">{productCount}</span>
                                <button className="px-3 py-1 bg-gray-200 rounded-md" onClick={incrementQuantity}> + </button>
                            </div>
                        </div>
                        <button onClick={handleAddToCart} className="mt-5 px-5 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300">
                            Add To Cart
                        </button>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-800">Benefits</h2>
                    <div className="flex flex-wrap gap-5 mt-5">
                        {/* Map through benefits and display them here */}
                    </div>
                </div>
                <div className="mt-10">
                    <ProductReview product={selectedProduct} />
                </div>
            </div>
        </div>
    );
};

export default ProjectLanding1;

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

const ProjectLanding1 = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { product, store } = location.state || {};
    const [selectedProduct, setSelectedProduct] = useState(product)
    const [selectedVariant, setSelectedVariant] = useState(selectedProduct.variant[0]);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [displayedImage, setDisplayedImage] = useState(selectedProduct.image.imageUrl);
    const selectedOption = selectedOptionIndex === -1 ? null : selectedVariant?.options[selectedOptionIndex];
    const price = selectedOption ? parseFloat(selectedOption.price) : parseFloat(selectedProduct.price) || 0;
    const discount = selectedOption ? parseFloat(selectedOption.discount) : 0;
    const [firstVariant, ...remainingVariant] = selectedProduct.variant;
    const [productCount, setProductCount] = useState(1);

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
        setDisplayedImage(selectedVariant?.options[index].image.imageUrl);
    };

    const handleDefaultImage = (newProduct) => {
        setSelectedOptionIndex(-1);
        navigate(location.pathname, { state: { product: newProduct, store } });
        setDisplayedImage(selectedProduct.image.imageUrl);
    };

    const handleVariantChange = (e) => {
        const selectedVariantName = e.target.value;
        const newSelectedVariant = product?.variant.find(
            (variant) => variant.options.some(option => option.name === selectedVariantName)
        );
        const selectedOption = newSelectedVariant.options.find(option => option.name === selectedVariantName);
        setDisplayedImage(selectedOption.image.imageUrl);
        setSelectedVariant(newSelectedVariant);
    };

    const incrementQuantity = () => {
        setProductCount(prevCount => prevCount + 1);
    };

    const decrementQuantity = () => {
        setProductCount(prevCount => Math.max(1, prevCount - 1));
    };

    const handleProductSelect = (newProduct) => {
        setSelectedProduct(newProduct);
        navigate(location.pathname, { state: { product: newProduct, store } });
    };

    const totalPrice = price * productCount;
    const totalDiscount = discount * productCount;
    const storeDetails = {
        deliveryCharge: 100,
        COD: "available",
        deliveryTime: "2-3 Days",
        warranty: "4 months",
        returnPolicyTime: "14 days"
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product])
    return (
        <div className="p-2 md:p-5 lg:p-16">
            <div className='flex flex-col gap-5'>
                {/* HERO SECTION  */}
                <div className="flex flex-col md:flex-row md:gap-5 lg:gap-10">
                    <div className="w-full md:w-[75%] flex flex-col gap-10 p-5 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)] ">
                        {/* PRODUCT DISPLAYING SECTION  */}
                        <div className="flex flex-col md:flex-row gap-3 md:gap-5 lg:gap-10">
                            <div className="flex flex-row md:flex-col gap-5 md:w-[250px] md:h-[250px] lg:w-[400px] lg:h-[400px]">
                                <img
                                    src={displayedImage}
                                    alt="Pink Winter Hoodie"
                                    className="w-full h-auto rounded"
                                    style={{ aspectRatio: '1/1' }}
                                />
                                <div className="flex flex-col md:flex-row gap-2">
                                    <div
                                        className={`cursor-pointer text-sm lg:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
                                        onClick={() => handleDefaultImage(product)}
                                    >
                                        <img src={selectedProduct.image.imageUrl} alt="Default" className='w-[60px] h-[60px] md:w-[55px] md:h-[55px] lg:w-[69px] lg:h-[69px] me-2' />
                                    </div>
                                    {selectedVariant?.options.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer text-sm lg:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
                                            onClick={() => handleOptionSelect(index)}
                                        >
                                            <img src={option.image.imageUrl} alt={option.name} className='w-[60px] h-[60px] md:w-[55px] md:h-[55px] lg:w-[69px] lg:h-[69px] me-2' />
                                        </div>
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
                                <div className="flex gap-5 items-center">
                                    <label htmlFor="size" className="block text-sm lg:text-base text-gray-700">{firstVariant.name}:</label>
                                    <select
                                        id="size"
                                        className="md:pr-3 lg:pr-5 pl-2 py-1 w-16 md:w-20 lg:w-24 text-xs md:text-sm lg:text-base border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        value={selectedOption && selectedOption.name}
                                        onChange={handleVariantChange}
                                    >
                                        {firstVariant.options.map((option, index) => (
                                            <option key={index} onClick={() => { handleOptionSelect(index) }} value={option.name}>{option.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {remainingVariant.map((v, index) => (
                                    <div className="flex gap-5 items-center" key={index}>
                                        <label htmlFor="size" className="block text-sm lg:text-base text-gray-700">{v.name}:</label>
                                        <select
                                            id="size"
                                            className="md:pr-3 lg:pr-5 pl-2 py-1 w-16 md:w-20 lg:w-24 text-xs md:text-sm lg:text-base border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {v.options.map((option, idx) => (
                                                <option key={idx} value={option.name}>{option.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                                <div className="flex gap-5 items-center">
                                    <label htmlFor="size" className="block text-sm lg:text-base text-gray-700">Quantity:</label>
                                    <div className='flex items-center gap-3'>
                                        <button className="px-2 md:px-3 md:py-1 bg-gray-200 rounded-md" onClick={decrementQuantity}> - </button>
                                        <span className="text-sm md:text-base">{productCount}</span>
                                        <button className="px-2 md:px-3 md:py-1 bg-gray-200 rounded-md" onClick={incrementQuantity}> + </button>
                                    </div>
                                </div>
                                <div className='flex my-3 md:my-5 lg:my-10 items-center gap-5'>
                                    <button className="text-xs md:text-sm lg:text-base hover:bg-[#898989] hover:text-white w-1/2 border cursor-pointer border-gray-600 py-2 rounded-md">Buy Now</button>
                                    <div className='hover:bg-[#898989] hover:text-white border cursor-pointer border-gray-600 rounded-md p-2'><TbShoppingBagPlus size={20} /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LOCATION SECTION  */}
                    <div className="w-full md:w-[25%] p-5 md:p-2 lg:p-5 bg-gray-50 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
                        <div className='flex flex-col gap-3 md:gap-5 lg:gap-8'>
                            <div>
                                <div className="flex flex-col gap-3 text-xs text-[#898989]">
                                    <span>Delivery Charge and time</span>
                                    <div className='flex justify-between md:text-xs lg:text-sm text-[#636363]'>
                                        <span className='flex gap-3 items-center'><LiaShippingFastSolid size={20} />Rs. {storeDetails.deliveryCharge}</span>
                                        <span className='flex gap-3 items-center mr-5'><FiClock size={20} />{storeDetails.deliveryTime}</span>
                                    </div>
                                    <span className='flex gap-3 items-center md:text-xs lg:text-sm text-[#636363]'><TbCash size={20} />Cash on Delivery {storeDetails.COD}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-3 text-xs text-[#898989]">
                                    <span>Services</span>
                                    <span className='flex gap-3 items-center md:text-xs lg:text-sm text-[#636363]'><MdVerifiedUser size={20} />{storeDetails.warranty} warranty available</span>
                                    <span className='flex gap-3 items-center md:text-xs lg:text-sm text-[#636363]'><PiCreditCard size={20} />{storeDetails.returnPolicyTime} return policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* REVIEW SECTION  */}
                <div className='w-full flex flex-col md:flex-row gap-5 lg:gap-10'>
                    <div className='w-full md:w-[75%] p-2 md:p-5 bg-gray-50 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)]'><ProductReview product={selectedProduct} /></div>
                    <div className='w-full md:w-[25%] p-2 lg:p-5 bg-gray-50 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)]'><SimilarProducts store={store} product={selectedProduct} onProductSelect={handleProductSelect} handleImage={handleDefaultImage} /></div>
                </div>
            </div>
        </div>
    );
}

export default ProjectLanding1;

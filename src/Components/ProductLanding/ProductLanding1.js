import React, { useState } from 'react';
import { TbShoppingBagPlus } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FiClock } from "react-icons/fi";
import { TbCash } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { PiCreditCard } from "react-icons/pi";
import { StarIcon } from '@heroicons/react/16/solid';
import ProductReview from './ProductReview';
import SimilarProducts from './SimilarProducts';


const ProjectLanding1 = () => {
    const product = {
        id: 1,
        name: "Pink Winter Hoodie",
        price: 2000,
        image: { imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg", imageID: '' },
        categories: ["Men"],
        subcategories: ["Watch"],
        rating: 3,
        count: 1,
        description: "A pink hoodie is a stylish, comfy hoodie inspired by Link from the Legend of Zelda series.",
        variant: [
            {
                name: "Color",
                options: [
                    {
                        name: "Blue",
                        price: 1200,
                        image: {
                            imageID: "img123",
                            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
                        },
                        discount: 100
                    }, {
                        name: "Gray",
                        price: 2000,
                        image: {
                            imageID: "img123",
                            imageUrl: "https://cms.cloudinary.vpsvc.com/image/upload/v1675872460/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile004_en-us.png"
                        },
                        discount: 6
                    }
                ]
            },
            {
                name: "Size",
                options: [
                    {
                        name: "L",
                    },
                    {
                        name: "S",
                    }
                ]
            },
        ],
    }

    const [selectedVariant, setSelectedVariant] = useState(product.variant[0]);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [displayedImage, setDisplayedImage] = useState(product.image.imageUrl);
    const selectedOption = selectedOptionIndex === -1 ? null : selectedVariant?.options[selectedOptionIndex];
    const price = selectedOption ? selectedOption.price : product.price || 0;
    const discount = selectedOption ? selectedOption.discount : product.discount || 0;
    const [firstVariant, ...remainingVariant] = product.variant
    const [productCount, setProductCount] = useState(product.count)

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
        setDisplayedImage(selectedVariant?.options[index].image.imageUrl);
    };


    const handleDefaultImage = () => {
        setSelectedOptionIndex(-1);
        setDisplayedImage(product.image.imageUrl);
    };

    const handleVariantChange = (e) => {
        const selectedVariantName = e.target.value;
        const newSelectedVariant = product.variant.find(
            (variant) => variant.options.some(option => option.name === selectedVariantName)
        );
        setDisplayedImage(newSelectedVariant.options[0].image.imageUrl);
        setSelectedVariant(newSelectedVariant);
    };

    const incrementQuantity = () => {
        setProductCount(prevCount => prevCount + 1);
    };

    const decrementQuantity = () => {
        setProductCount(prevCount => Math.max(1, prevCount - 1));
    };

    const totalPrice = price * productCount;
    const totalDiscount = discount * productCount;
    return (
        <div className="pt-16 px-16">
            <div className='flex flex-col gap-10 justify-between'>
                {/* PRODUCT DISPLAYING SECTION  */}
                <div className="flex gap-10">
                    <div className="p-5 flex gap-10 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)] ">
                        <div className="w-[400px] h-[400px] flex flex-col gap-5">
                            <img
                                src={displayedImage}
                                alt="Pink Winter Hoodie"
                                className="w-full h-auto rounded"
                                style={{ aspectRatio: '1/1' }}
                            />
                            <div className="flex space-x-2">
                                <div
                                    className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
                                    onClick={handleDefaultImage}
                                >
                                    <img src={product.image.imageUrl} alt="Default" style={{ height: "69px", width: "69px" }} className='me-2' />
                                </div>
                                {selectedVariant?.options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
                                        onClick={() => handleOptionSelect(index)}

                                    >
                                        <img src={option.image.imageUrl} alt={option.name} style={{ height: "69px", width: "69px" }} />
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 className="text-2xl font-bold text-[#555555]">{product.name}</h1>
                            <p className="text-sm text-gray-600">
                                {product.description}
                            </p>
                            <div className='flex mb-2 justify-center md:justify-start'>
                                {[...Array(5)].map((option, index) => {
                                    if (index < product.rating)
                                        return <StarIcon className='w-4 h-4' style={{ color: "red" }} />
                                    else
                                        return <StarIcon className='w-4 h-4 text-[#959595]' />
                                })}
                            </div>
                            {/* <hr className='w-full border-t border-gray-400' /> */}
                            <div className="flex gap-5 items-center">
                                <span className="text-3xl font-semibold text-[#545454]">Rs {totalPrice}</span>
                                <span className="line-through text-xl text-[#838383]">Rs {totalDiscount + totalPrice}</span>
                            </div>

                            <div className="flex gap-5">
                                <label htmlFor="size" className="block text-gray-700">{firstVariant.name}:</label>
                                <select
                                    id="size"
                                    className="pr-5 pl-2 py-1 w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleVariantChange}
                                    value={selectedOption && selectedOption.name}
                                >
                                    {firstVariant.options.map((option, index) => (
                                        <option onClick={() => { handleOptionSelect(index) }} value={option.name}>{option.name}</option>
                                    ))}
                                </select>
                            </div>

                            {remainingVariant.map((v, index) => (
                                <div className="flex gap-5">
                                    <label htmlFor="size" className="block text-gray-700">{v.name}:</label>
                                    <select
                                        id="size"
                                        className="pr-5 pl-2 py-1 w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        {v.options.map((option, index) => (
                                            <option value={option.name}>{option.name}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            <div className="flex gap-5 items-center">
                                <label htmlFor="size" className="block text-gray-700">Quantity:</label>
                                <div className='flex items-center gap-3'>
                                    <button className="px-3 py-1 bg-gray-200 rounded-md" onClick={decrementQuantity}> - </button>
                                    <span className="">{productCount}</span>
                                    <button className="px-3 py-1 bg-gray-200 rounded-md" onClick={incrementQuantity}> + </button>
                                </div>
                            </div>
                            <div className='flex mt-5 mb-16 items-center gap-5'>
                                <button className="w-1/2 border border-gray-600 py-2 rounded-md">Buy Now</button>
                                <div className='border border-gray-600 rounded-md p-2'><TbShoppingBagPlus size={20} /></div>
                            </div>
                        </div>

                    </div>

                    {/* LOCATION SECTION  */}
                    <div className="w-1/3 p-5 bg-gray-50 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
                        <div className='flex flex-col gap-8'>
                            <div>
                                <div className="flex flex-col gap-3 text-xs text-[#898989]">
                                    <span>Delivery Charge and time</span>
                                    <div className='flex justify-between text-sm text-[#636363]'>
                                        <span className='flex gap-3 items-center'><LiaShippingFastSolid size={20} />Rs. 100 </span>
                                        <span className='flex gap-3 items-center mr-5'><FiClock size={20} />2-3 days</span>
                                    </div>
                                    <span className='flex gap-3 items-center text-sm text-[#636363]'><TbCash size={20} />Cash on Delivery available</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-3 text-xs text-[#898989]">
                                    <span>Services</span>
                                    <span className='flex gap-3 items-center text-sm text-[#636363]'><MdVerifiedUser size={20} />4 month warranty available</span>
                                    <span className='flex gap-3 items-center text-sm text-[#636363]'><PiCreditCard size={20} />14 days return policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* REVIEW SECTION  */}
                <div className='flex gap-10 justify-between'>
                    <ProductReview />
                    <SimilarProducts />
                </div>
            </div >

        </div>
    );
}

export default ProjectLanding1;

// import React, { useState } from 'react';

// const ProductLanding1 = () => {
//     const product = {
//         id: 1,
//         name: "Controller",
//         price: '100',
//         image: { imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg", imageID: '' },
//         categories: ["Men"],
//         subcategories: ["Watch"],
//         rating: 2.5,
//         count: 0,
//         variant: [
//             {
//                 name: "Color",
//                 options: [
//                     {
//                         name: "Blue",
//                         price: 1200,
//                         image: {
//                             imageID: "img123",
//                             imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
//                         },
//                         discount: 5
//                     }, {
//                         name: "Gray",
//                         price: 2000,
//                         image: {
//                             imageID: "img123",
//                             imageUrl: "https://cms.cloudinary.vpsvc.com/image/upload/v1675872460/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile004_en-us.png"
//                         },
//                         discount: 6
//                     }
//                 ]
//             },
//             {
//                 name: "Size",
//                 options: [
//                     {
//                         name: "L",
//                         price: 1200,
//                         image: {
//                             imageID: "img123",
//                             imageUrl: "https://images.vexels.com/media/users/3/234039/isolated/preview/0bb83cedf3679102fae76c6bbb940ccb-denim-jean-jacket.png"
//                         },
//                         discount: 10
//                     }
//                 ]
//             },
//         ],
//         description: "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd asdad asdnansd adoamds d adoandnald ",
//     }

//     const selectedVariant = product.variant[0]
//     // const { products, store } = productLandingProps
//     const [quantity, setQuantity] = useState(product.count);

//     const increaseQuantity = () => {
//         setQuantity(quantity + 1);
//     };

//     const decreaseQuantity = () => {
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-16" >
//             <div className="flex gap-10 mx-auto bg-white p-5 rounded-lg shadow-md">
//                 <div className="flex gap-10 rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
//                     <div className="flex w-1/2 mt-5">
//                         <div
//                             className={`cursor-pointer text-sm sm:text-base rounded-md`}
//                         >
//                             <img src={product.image.imageUrl} alt="Default" className='me-2' />
//                         </div>
//                         {selectedVariant?.options.map((option, index) => (
//                             <div
//                                 key={index}
//                                 className={`cursor-pointer text-sm sm:text-baserounded-md`}
//                             >
//                                 <img src={option.image.imageUrl} alt={option.name} className='me-2' />
//                             </div>
//                         ))}
//                     </div>
//                     <div className="">
//                         <h1 className="text-2xl font-bold">{product.name}</h1>
//                         <p className="text-gray-600 mt-2">
//                             {product.description}
//                         </p>
//                         <div className="mt-2">
//                             <span className="text-xl font-semibold">{selectedVariant.options.price}</span>
//                             <span className="line-through text-gray-500 ml-2">{selectedVariant.options.discount}</span>
//                         </div>
//                         <div className="mt-4">
//                             <label htmlFor="variant" className="block text-gray-700">Variant:</label>
//                             {/* <select
//                             id="variant"
//                             className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                         >
//                             {product.variant.options.map((option, index) => (
//                                 <option key={index} value={option}>
//                                     {option}
//                                 </option>
//                             ))}
//                         </select> */}
//                         </div>
//                         <div className="mt-4 flex items-center">
//                             <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={decreaseQuantity}> - </button>
//                             <span className="mx-2">{quantity}</span>
//                             <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={increaseQuantity}> + </button>
//                         </div>
//                         <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">Buy Now</button>
//                     </div>
//                 </div>

//                 {/* LOCATION  */}
//                 <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">

//                     <div className="mt-4">
//                         <div className="flex items-center">
//                             <span>Delivery Charge and time</span>
//                             <span className="ml-auto">Rs. 100 | 2-3 days</span>
//                         </div>
//                         <div className="flex items-center mt-2">
//                             <span>Cash on Delivery available</span>
//                         </div>
//                     </div>
//                     <div className="mt-4">
//                         <div className="flex items-center">
//                             <span>4 month warranty available</span>
//                         </div>
//                         <div className="flex items-center mt-2">
//                             <span>14 days return policy</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// }
// export default ProductLanding1;

import React, { useState } from 'react';
import { TbShoppingBagPlus } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FiClock } from "react-icons/fi";
import { TbCash } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { PiCreditCard } from "react-icons/pi";
import { StarIcon } from '@heroicons/react/16/solid';


const ProjectLanding1 = () => {
    const product = {
        id: 1,
        name: "Pink Winter Hoodie",
        price: 2000,
        image: { imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg", imageID: '' },
        categories: ["Men"],
        subcategories: ["Watch"],
        rating: 3,
        count: 0,
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
                        discount: 5
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
                        price: 1200,
                        image: {
                            imageID: "img123",
                            imageUrl: "https://images.vexels.com/media/users/3/234039/isolated/preview/0bb83cedf3679102fae76c6bbb940ccb-denim-jean-jacket.png"
                        },
                        discount: 10
                    }
                ]
            },
        ],
    }

    const [selectedVariant, setSelectedVariant] = useState(product.variant[0]);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [displayedImage, setDisplayedImage] = useState(selectedVariant.options[0].image.imageUrl);
    const selectedOption = selectedOptionIndex === -1 ? null : selectedVariant?.options[selectedOptionIndex];
    const price = selectedOption ? selectedOption.price : product.price || 0;
    const discount = selectedOption ? selectedOption.discount : product.discount || 0;



    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
        setDisplayedImage(selectedVariant?.options[index].image.imageUrl);
    };

    const handleVariantChange = (e) => {
        const selectedVariantName = e.target.value;
        const newSelectedVariant = product.variant.find(
            (variant) => variant.name === selectedVariantName
        );
        setDisplayedImage(newSelectedVariant.options[0].image.imageUrl);
        setSelectedVariant(newSelectedVariant);
    };
    return (
        <div className="h-screen pt-16 px-16">
            <div className="flex gap-10">
                <div className=''>
                    <div className="p-5 flex gap-10 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)] ">
                        <div className="w-[400px] h-[400px] flex flex-col gap-5">
                            <img
                                src={displayedImage}
                                alt="Pink Winter Hoodie"
                                className="w-full h-auto rounded"
                                style={{ aspectRatio: '1/1' }}
                            />
                            <div className="flex space-x-2">
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
                                <span className="text-3xl font-semibold text-[#545454]">Rs {price}</span>
                                <span className="line-through text-xl text-[#838383]">Rs {price + discount}</span>
                            </div>
                            <div className="flex gap-5">
                                <label htmlFor="size" className="block text-gray-700">Variant:</label>
                                <select
                                    id="size"
                                    className="pr-5 pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    onChange={handleVariantChange}
                                >
                                    {product.variant.map((option, index) => (
                                        <option value={option.name}>{option.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-5 items-center">
                                <label htmlFor="size" className="block text-gray-700">Quantity:</label>
                                <div className='flex gap-3'>
                                    <button className="px-3 py-1 bg-gray-200 rounded-md" onClick={() => { }}> - </button>
                                    <span className="">{product.count}</span>
                                    <button className="px-3 py-1 bg-gray-200 rounded-md" onClick={() => { }}> + </button>
                                </div>
                            </div>
                            <div className='flex my-5 items-center gap-5'>
                                <button className="w-1/2 border border-gray-600 py-2 rounded-md">Buy Now</button>
                                <div className='border border-gray-600 rounded-md p-2'><TbShoppingBagPlus size={20} /></div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="w-1/3 p-5 bg-gray-50 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
                    <div className='flex flex-col gap-5'>
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
        </div>
    );
}

export default ProjectLanding1;

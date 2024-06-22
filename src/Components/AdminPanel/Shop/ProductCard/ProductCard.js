import React, { useState } from 'react';
import cosmetic from '../../../../Assets/cosmetic.webp';

const ProductCard1 = () => (
    <div
        className="product-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
    >
        <div className="para uppercase text-center leading-none z-40">
            <p
                style={{
                    WebkitTextStroke: "1px rgb(207, 205, 205)",
                    WebkitTextFillColor: "transparent",
                }}
                className="z-10 font-bold text-lg -mb-5 tracking-wider text-gray-500"
            >
                New Product
            </p>
            <p className="font-bold text-xl tracking-wider text-[#495c48] z-30">
                New Product
            </p>
        </div>
        <div
            className="w-[180px] aspect-square relative z-20 after:absolute after:h-1 after:w-full flex justify-center flex-col items-center after:opacity-0 after:bg-[#7b956a] after:top-8 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full flex justify-center flex-col items-center after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300"
        >
            <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                textRendering="geometricPrecision"
                shapeRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
            >
                <linearGradient
                    y2="0"
                    y1="512"
                    x2="256"
                    x1="256"
                    gradientUnits="userSpaceOnUse"
                    id="id0"
                >
                    <stop stopColor="#495c48" offset="0"></stop>
                    <stop stopColor="#9db891" offset=".490196"></stop>
                    <stop stopColor="#7b956a" offset="1"></stop>
                </linearGradient>
                <g id="Layer_x0020_1">
                    <path
                        fill="url(#id0)"
                        d="m310 512h-108c-16.4 0-31.9-6.5-43.7-18.3s-18.3-27.3-18.3-43.7v-261c0-29.8 24.2-54 54-54h123c30.3 0 55 24.2 55 54v261c0 16.4-6.5 31.9-18.3 43.7s-27.3 18.3-43.7 18.3zm-90-439v-34c0-23 9.9-39 24-39h24c13.5 0 24 17.1 24 39v34zm-33 48.36v-27.36c0-3.9 3.1-7 7-7h124c3.9 0 7 3.1 7 7v27.46c-2.63-.3-5.3-.46-8-.46h-123c-2.36 0-4.7.12-7 .36zm69 71.6c-33.94 54.87-38.25 93.49-29.7 116.4 5.82 15.59 17.8 23.39 29.7 23.39s23.88-7.8 29.7-23.39c8.55-22.91 4.24-61.53-29.7-116.4zm-42.77 121.27c-10.32-27.64-5.23-73.83 36.85-137.91.52-.84 1.22-1.57 2.09-2.14 3.22-2.12 7.54-1.22 9.65 1.99 42.17 64.16 47.27 110.4 36.95 138.06-8.09 21.68-25.39 32.52-42.77 32.52s-34.68-10.84-42.77-32.52zm102.27 126.87c-2.8 0-5.9-.4-9.3-1.3-.1 0-.1 0-.2 0-14-4.2-21.8-18.1-17.7-31.7.1-.4.3-.8.4-1.1.2-.4.4-.8.6-1.3.8-1.9 1.9-4.3 3.8-6.5 24.5-50.8 21.9-118.2 21.9-118.9-.1-3.5 2.3-6.5 5.7-7.2s6.8 1.3 7.9 4.6c3.3 9.6 11.2 41 15.2 73.2 5.1 42 1.8 69.7-9.9 82.2-3.7 4-9.6 8-18.4 8zm-5.6-14.8c8 2.2 11.7-.5 13.7-2.7 12.5-13.4 9.3-57.7 2.8-94.5-2.9 23.5-8.9 51.9-21.2 76.9-.3.7-.8 1.3-1.3 1.9-.6.6-1.3 2.1-1.8 3.4-.2.4-.4.8-.5 1.2-1.5 5.9 2.1 11.9 8.3 13.8zm-113.4 14.8c-8.9 0-14.8-4-18.4-7.9-11.7-12.5-15-40.2-9.9-82.2 3.9-32.2 11.8-63.6 15.2-73.2 1.1-3.3 4.5-5.2 8-4.6 3.4.7 5.8 3.8 5.6 7.3 0 .7-3.5 68 21.8 118.6 1.9 2.2 3 4.7 3.9 6.6.2.5.4.9.6 1.3s.3.7.4 1.1c4.1 13.6-3.7 27.5-17.7 31.7-.1 0-.1 0-.2 0-3.4.9-6.5 1.3-9.3 1.3zm-11.2-110.6c-6.3 36.5-9.3 79.8 3.1 93.1 2 2.2 5.7 4.8 13.7 2.7 6.3-1.9 9.9-7.9 8.4-13.8-.2-.4-.4-.8-.5-1.2-.5-1.2-1.2-2.7-1.8-3.4-.5-.5-1-1.1-1.3-1.8-12.7-24.5-18.7-52.3-21.6-75.6z"
                    ></path>
                </g>
            </svg>
            <div
                className="tooltips absolute top-0 left-0 -translate-x-[150%] p-2 flex flex-col items-start gap-10 transition-all duration-300 group-hover:-translate-x-full flex justify-center flex-col items-center"
            >
                <p
                    className="text-[#7b956a] font-semibold text-xl uppercase group-hover:delay-1000 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                >
                    Toner
                </p>
                <ul className="flex flex-col items-start gap-2">
                    <li
                        className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="stroke-[#495c48]"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="10"
                            width="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-xs font-semibold text-[#495c48]">Hydration</p>
                    </li>
                    <li
                        className="inline-flex gap-2 items-center justify-center group-hover:delay-300 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="stroke-[#495c48]"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="10"
                            width="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-xs font-semibold text-[#495c48]">
                            Protect Skin Barrier
                        </p>
                    </li>
                    <li
                        className="inline-flex gap-2 items-center justify-center group-hover:delay-400 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="stroke-[#495c48]"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="10"
                            width="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-xs font-semibold text-[#495c48]">Reduce Wrinkles</p>
                    </li>
                    <li
                        className="inline-flex gap-2 items-center justify-center group-hover:delay-500 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="stroke-[#495c48]"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="10"
                            width="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-xs font-semibold text-[#495c48]">Anti Inflammatory</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

const ProductCard2 = () => (
    <div className="w-60 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
            <img
                src="https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="Product"
                className="h-60 w-full object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                    <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                    </del>
                    <div className="ml-[100px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-bag-plus"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                            />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </a>
    </div>
);

const ProductCard3 = () => (
    <div className="product-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
        <div className="para uppercase text-center leading-none z-40">
            <p
                style={{
                    WebkitTextStroke: "1px rgb(207, 205, 205)",
                    WebkitTextFillColor: "transparent",
                }}
                className="z-10 font-bold text-lg -mb-5 tracking-wider text-gray-500"
            >
                New Product
            </p>
            <p className="font-bold text-xl tracking-wider text-[#495c48] z-30">
                Product Name
            </p>
        </div>
        <div
            className="w-[180px] aspect-square relative z-20 after:absolute after:h-1 after:w-full flex justify-center flex-col items-center after:opacity-0 after:bg-[#7b956a] after:top-8 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full flex justify-center flex-col items-center after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300"
        >
            <img
                src={cosmetic}
                alt="Product"
                className="object-cover w-full flex justify-center flex-col items-center h-full flex justify-center flex-col items-center"
            />
            <div
                className="tooltips absolute top-0 left-6 -translate-x-[150%] p-2 flex flex-col items-start gap-10 transition-all duration-300 group-hover:-translate-x-full flex justify-center flex-col items-center"
            >
                <p
                    className="text-[#7b956a] pl-2 font-semibold text-xl uppercase group-hover:delay-1000 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                >
                    Toner
                </p>
                <ul className="flex flex-col items-start gap-2">
                    <li
                        className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="stroke-[#495c48]"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="10"
                            width="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-xs break-words font-semibold  text-[#495c48]">          l orem lorem lorem loremlorem loremasdasldjsadlorem loremasdkajdaskldalorem loremasdsadasdasd</p>
                    </li>
                    {/* <li
                        className="inline-flex gap-2 items-center justify-center group-hover:delay-300 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="stroke-[#495c48]"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="10"
                            width="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-xs font-semibold text-[#495c48]">
                            Protect Skin Barrier
                        </p>
                    </li>
                    <li
                        className="inline-flex gap-2 items-center justify-center group-hover:delay-400 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="stroke-[#495c48]"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="10"
                            width="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-xs font-semibold text-[#495c48]">Reduce Wrinkles</p>
                    </li>
                    <li
                        className="inline-flex gap-2 items-center justify-center group-hover:delay-500 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="stroke-[#495c48]"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="10"
                            width="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-xs font-semibold text-[#495c48]">Anti Inflammatory</p>
                    </li> */}
                </ul>
            </div>
        </div>
        <div className="flex items-center mt-2">
            <p className="text-lg font-semibold text-black">Rs 149</p>
            <del className="ml-2 text-gray-600"> Rs 500</del>
        </div>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-full flex justify-center flex-col items-center hover:bg-blue-600 duration-300 mt-4">
            Add to Cart
        </button>
    </div>
);

const ProductCard4 = () => (
    <div className="bg-white text-black border border-gray-300 rounded-xl p-6 shadow-md flex flex-col items-center relative transition-transform transform hover:scale-105">
        <img src="https://via.placeholder.com/150" alt="Sauvignon Blanc" className="w-32 h-32 object-cover rounded-full flex justify-center flex-col items-center mb-4" />
        <h2 className="text-xl font-semibold mb-2">Sauvignon Blanc</h2>
        <p className="text-gray-500 mb-4 text-center">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
        <span className="text-2xl font-bold mb-4">Rs 1295</span>
        <button className="bg-yellow-600 text-white px-6 py-2 rounded-full flex justify-center flex-col items-center hover:bg-yellow-700 transition-colors">Buy Now</button>
    </div>
);

const ProductCard5 = () => (
    <div className="bg-white text-black border border-gray-300 rounded-xl p-6 shadow-md flex flex-col items-center relative transition-transform transform hover:scale-105">
        <img src="https://via.placeholder.com/150" alt="Cabernet Sauvignon" className="w-32 h-32 object-cover rounded-full flex justify-center flex-col items-center mb-4" />
        <h2 className="text-xl font-semibold mb-2">Cabernet Sauvignon</h2>
        <p className="text-gray-500 mb-4 text-center">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
        <span className="text-2xl font-bold mb-4">Rs 2095</span>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-full flex justify-center flex-col items-center hover:bg-purple-700 transition-colors">Buy Now</button>
    </div>

);

const ProductCard6 = () => (
    <div className="bg-white text-black border border-gray-300 rounded-xl p-6 shadow-md flex flex-col items-center relative transition-transform transform hover:scale-105">
        <img src="https://via.placeholder.com/150" alt="Zinfandel" className="w-32 h-32 object-cover rounded-full flex justify-center flex-col items-center mb-4" />
        <h2 className="text-xl font-semibold mb-2">Zinfandel</h2>
        <p className="text-gray-500 mb-4 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <span className="text-2xl font-bold mb-4">Rs 1595</span>
        <button className="bg-red-600 text-white px-6 py-2 rounded-full flex justify-center flex-col items-center hover:bg-red-700 transition-colors">Buy Now</button>
    </div>
);

const handleBuyNow = (cardNumber) => {
    // Function to handle the purchase action with this card's details
};

const ProductCards = () => (
    <div className="container mx-auto px-5 py-8 flex flex-wrap">
        <div className="w-full flex justify-center flex-col items-center sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"><ProductCard1 />   <button
            onClick={handleBuyNow}
            className="bg-gray-800 text-white py-2 px-6 rounded-full flex justify-center flex-col items-center hover:bg-blue-600 duration-300 mt-4"
        >
            Buy Now
        </button></div>

        <div className="w-full flex justify-center flex-col items-center sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"><ProductCard2 /> <button
            onClick={handleBuyNow}
            className="bg-gray-800 text-white py-2 px-6 rounded-full flex justify-center flex-col items-center hover:bg-blue-600 duration-300 mt-4"
        >
            Buy Now
        </button> </div>
        <div className="w-full flex justify-center flex-col items-center sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"><ProductCard3 /> <button
            onClick={handleBuyNow}
            className="bg-gray-800 text-white py-2 px-6 rounded-full flex justify-center flex-col items-center hover:bg-blue-600 duration-300 mt-4"
        >
            Buy Now
        </button></div>
        <div className="w-full flex justify-center flex-col items-center sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"><ProductCard4 /> <button
            onClick={handleBuyNow}
            className="bg-gray-800 text-white py-2 px-6 rounded-full flex justify-center flex-col items-center hover:bg-blue-600 duration-300 mt-4"
        >
            Buy Now
        </button></div>
        <div className="w-full flex justify-center flex-col items-center sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"><ProductCard5 /> <button
            onClick={handleBuyNow}
            className="bg-gray-800 text-white py-2 px-6 rounded-full flex justify-center flex-col items-center hover:bg-blue-600 duration-300 mt-4"
        >
            Buy Now
        </button></div>
        <div className="w-full flex justify-center flex-col items-center sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"><ProductCard6 /> <button
            onClick={handleBuyNow}
            className="bg-gray-800 text-white py-2 px-6 rounded-full flex justify-center flex-col items-center hover:bg-blue-600 duration-300 mt-4"
        >
            Buy Now
        </button></div>
    </div>
);

export default ProductCards;

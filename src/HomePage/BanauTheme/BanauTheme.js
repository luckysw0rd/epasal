import React from 'react';
import { FaPlay } from "react-icons/fa";
import './BanauTheme.css';

const BanauTheme = () => {
    return (
        <div className="p-8 md:p-4 lg:p-8">
            <div className="flex gap-5 lg:gap-10 p-8 lg:p-16 bg-gray-800 rounded-lg text-white">
                <div className="flex flex-col gap-5 lg:gap-10">
                    <h1 className="text-2xl lg:text-3xl font-bold">Banau <span className="text-blue-400">Themes</span></h1>
                    <p className="md:text-xs lg:text-base mt-2">
                        "Transform your online store with Banau's stunning skins, featuring customizable design cards and banners—some free, some premium!"
                    </p>
                    <button className="text-xs lg:text-base mt-5 lg:mt-10 w-1/2 md:w-[90%] lg:w-2/3 bg-gray-700 border border-white text-white py-2 px-2 lg:px-3 rounded-lg flex justify-center items-center gap-3 md:gap-1 lg:gap-3">
                        Watch Video
                        <FaPlay />
                    </button>
                </div>
                <div className="hidden md:flex">
                    <div className="flex items-center h-80 lg:h-96 space-x-4">
                        <div className="w-[130px] lg:w-[210px] md:h-[302px] lg:h-[382px] rounded-lg lg:rounded-xl bg-[#E6E6FA] flex card hover:card-flip">
                            <div className="card-inner">
                                <div className="card-front flex items-center justify-center">
                                    <span className="text-sm lg:text-base text-[#575799] font-semibold">Lavender</span>
                                </div>
                                <div className="card-back p-4 flex flex-col bg-[#E6E6FA] text-[#575799] gap-2 rounded-lg lg:rounded-xl">
                                    <h1 className="text-sm lg:text-lg font-semibold">Lavender </h1>
                                    <h1 className='text-xs'>wellness, beauty, and premium products.</h1>
                                    <p className='text-xs flex-grow mt-5'>Lavender signifies calmness, elegance, and luxury, making it ideal for e-commerce products like beauty and wellness items, high-end fashion, and home decor.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[130px] lg:w-[210px] md:h-[224px] lg:h-[304px] rounded-lg lg:rounded-xl bg-[#F6E0B5] flex items-center justify-center card hover:card-flip">
                            <div className="card-inner">
                                <div className="card-front flex items-center justify-center">
                                    <span className="text-sm lg:text-base text-[#796D55] font-semibold">Wheat Yellow</span>
                                </div>
                                <div className="card-back p-4 flex flex-col bg-[#F6E0B5] text-[#796D55] gap-2 rounded-lg lg:rounded-xl">
                                    <h1 className="text-sm lg:text-lg font-semibold">Wheat Yellow </h1>
                                    <h1 className='text-xs'>home decor, organic food and neutral clothing products.</h1>
                                    <p className='text-xs  flex-grow mt-5'>Wheat Yellow signifies calmness, elegance, and luxury, making it ideal for e-commerce products like beauty and wellness items, high-end fashion, and home decor.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[130px] lg:w-[210px] md:h-[150px] lg:h-[230px] rounded-lg lg:rounded-xl bg-gray-200 flex items-center justify-center card hover:card-flip">
                            <div className="card-inner">
                                <div className="card-front flex items-center justify-center">
                                    <span className="text-sm lg:text-base text-[#796D55] font-semibold">Ash Beige</span>
                                </div>
                                <div className="card-back p-4 flex flex-col bg-gray-200 text-[#796D55] gap-2 rounded-lg lg:rounded-xl">
                                    <h1 className="text-sm lg:text-lg font-semibold">Ash Beige </h1>
                                    <h1 className='text-xs'>clothing home decor, beauty products.</h1>
                                    <p className='text-xs flex-grow mt-5'>Ash beige, with its neutral and calming tones, is perfect for showcasing clothing, home decor and beauty products, enhancing their elegance and apeal</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[130px] lg:w-[210px] md:h-[302px] lg:h-[382px] rounded-lg lg:rounded-xl bg-[#AFCBD5] flex items-center justify-center card hover:card-flip">
                            <div className="card-inner">
                                <div className="card-front flex items-center justify-center">
                                    <span className="text-sm lg:text-base text-[#40545B] font-semibold">Fresh Blue</span>
                                </div>
                                <div className="card-back p-4 flex flex-col bg-[#AFCBD5] text-[#40545B] gap-2 rounded-lg lg:rounded-xl">
                                    <h1 className="text-sm lg:text-lg font-semibold">Fresh Blue </h1>
                                    <h1 className='text-xs'>Tech gadgets, fitness apparel, sports equipment and wellness products.</h1>
                                    <p className='text-xs flex-grow mt-5'>Fresh blue, with its vibrant and refreshing hue, is ideal for highlighting items that convey a sense of innovation and energy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BanauTheme;

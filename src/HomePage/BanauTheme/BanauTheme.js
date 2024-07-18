import React from 'react';
import { FaPlay } from "react-icons/fa";
import './BanauTheme.css';
import BanauThemeImage1 from "../../Assets/BanauthemeImage1.png"
import BanauThemeImage2 from "../../Assets/BanauthemeImage2.png"
import BanauThemeImage3 from "../../Assets/BanauthemeImage3.png"
import { Link as ScrollLink } from 'react-scroll';


const BanauTheme = () => {
    return (
        <div className="p-4 py-8 md:py-10 lg:py-20 w-full">
            <div className="flex justify-center gap-5 lg:gap-10 p-8 lg:p-10 xl:p-16 2xl:p-20 bg-gray-800 rounded-lg text-white">
                <div className="flex flex-col gap-5 xl:gap-10 ">
                    <h1 className="text-2xl lg:text-3xl 2xl:text-5xl font-bold">Banau <span className="text-blue-400">Themes</span></h1>
                    <p className="md:text-xs xl:text-base 2xl:text-xl mt-2">
                        "Transform your online store with Banau's stunning skins, featuring customizable design cards and banners—some free, some premium!"
                    </p>
                   
        <ScrollLink to='video-section' smooth={true} duration={500}>
                    <button className="text-xs xl:text-base 2xl:text-xl mt-5 lg:mt-10 w-1/2 md:w-[90%] xl:w-2/3 2xl:w-1/2 bg-gray-700 border border-white text-white py-2 px-2 lg:px-3 rounded-lg flex justify-center items-center gap-3 md:gap-1 lg:gap-3">
                        Watch Video
                        <FaPlay />
                    </button></ScrollLink>
                </div>
                <div className="hidden lg:flex">
                    <div className="flex items-center h-80 lg:h-96 2xl:h-[500px] space-x-4">
                        <div className="w-[130px] lg:w-[160px] xl:w-[210px] 2xl:w-[280px] md:h-[302px] lg:h-[382px] 2xl:h-[500px] rounded-lg xl:rounded-xl bg-[#E6E6FA] flex card hover:card-flip">
                            <div className="card-inner ">
                                <div className="card-front flex items-center justify-center">
                                    <span className="text-sm xl:text-base 2xl:text-2xl text-[#575799] font-semibold">Lavender</span>
                                </div>
                                <div className="relative card-back p-4 flex flex-col bg-[#E6E6FA] text-[#575799] gap-2 rounded-lg xl:rounded-xl">
                                    <h1 className="text-sm xl:text-lg 2xl:text-xl font-semibold">Lavender</h1>
                                    <h1 className="text-xs 2xl:text-lg">wellness, beauty, and premium products.</h1>
                                    <p className="text-sm flex-grow mt-5 2xl:text-lg">Lavender signifies calmness, elegance, and luxury, making it ideal for e-commerce products like beauty and wellness items, high-end fashion, and home decor.</p>
                                    <img src={BanauThemeImage1} className="transform rotate-360 scale-x-[-1] absolute bottom-2 left-2" />
                                    <img src={BanauThemeImage1} className="transform rotate-360 absolute bottom-2 left-16" />
                                </div>
                            </div>
                        </div>

                        <div className="w-[130px] lg:w-[160px] xl:w-[210px] 2xl:w-[280px] md:h-[224px] lg:h-[304px] 2xl:h-[384px] rounded-lg xl:rounded-xl bg-[#F6E0B5] flex items-center justify-center card hover:card-flip">
                            <div className="card-inner">
                                <div className="card-front flex items-center justify-center">
                                    <span className="text-sm xl:text-base 2xl:text-2xl text-[#796D55] font-semibold">Wheat Yellow</span>
                                </div>
                                <div className="relative card-back p-4 flex flex-col bg-[#F6E0B5] text-[#796D55] gap-2 rounded-lg xl:rounded-xl">
                                    <h1 className="text-sm xl:text-lg 2xl:text-xl font-semibold">Wheat Yellow </h1>
                                    <h1 className='text-xs 2xl:text-lg '>home decor, organic food and neutral clothing products.</h1>
                                    <p className='text-xs  2xl:text-lg flex-grow mt-3'>Wheat Yellow signifies calmness, elegance, and luxury, making it ideal for e-commerce products like beauty and wellness items, high-end fashion, and home decor.</p>
                                    <img src={BanauThemeImage2} className="bg-[#F6E0B5] transform rotate-360 absolute bottom-5 right-5" />
                                    <img src={BanauThemeImage2} className="bg-[#F6E0B5] transform rotate-360 absolute bottom-2 right-24" />
                                </div>

                            </div>
                        </div>
                        <div className="w-[130px] lg:w-[160px] xl:w-[210px] 2xl:w-[280px]  md:h-[150px]  lg:h-[240px] 2xl:h-[320px] rounded-lg xl:rounded-xl bg-gray-200 flex items-center justify-center card hover:card-flip">
                            <div className="card-inner">
                                <div className="card-front flex items-center justify-center">
                                    <span className="text-sm xl:text-base 2xl:text-2xl text-[#796D55] font-semibold">Ash Beige</span>
                                </div>
                                <div className="card-back p-4 flex flex-col bg-gray-200 text-[#796D55] gap-2 rounded-lg xl:rounded-xl">
                                    <h1 className="text-sm xl:text-lg 2xl:text-xl font-semibold">Ash Beige </h1>
                                    <h1 className='text-xs 2xl:text-lg'>clothing home decor, beauty products.</h1>
                                    <p className='text-xs flex-grow mt-5 2xl:text-lg'>Ash beige, with its neutral and calming tones, is perfect for showcasing clothing, home decor and beauty products, enhancing their elegance and apeal</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[130px] lg:w-[160px] xl:w-[210px] 2xl:w-[280px]  md:h-[302px] lg:h-[382px] 2xl:h-[500px] rounded-lg xl:rounded-xl bg-[#AFCBD5] flex items-center justify-center card hover:card-flip">
                            <div className="card-inner">
                                <div className="card-front flex items-center justify-center">
                                    <span className="text-sm xl:text-base 2xl:text-2xl text-[#40545B] font-semibold">Fresh Blue</span>
                                </div>
                                <div className="relative card-back p-4 flex flex-col bg-[#AFCBD5] text-[#40545B] gap-2 rounded-lg xl:rounded-xl">
                                    <h1 className="text-sm xl:text-lg 2xl:text-xl font-semibold">Fresh Blue </h1>
                                    <h1 className='text-xs 2xl:text-lg'>Tech gadgets, fitness apparel, sports equipment and wellness products.</h1>
                                    <p className='text-xs flex-grow mt-5 2xl:text-lg'>Fresh blue, with its vibrant and refreshing hue, is ideal for highlighting items that convey a sense of innovation and energy.</p>
                                    <img src={BanauThemeImage3} className="transform absolute -bottom-3 right-2" />
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

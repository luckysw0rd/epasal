import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoBagHandleOutline } from 'react-icons/io5';

const CombinedComponent = () => {
    const [isFixed, setIsFixed] = useState(false);
    const componentRef = useRef(null);

    const handleScroll = () => {
        if (window.scrollY > 500) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={componentRef} className={`w-full ${isFixed ? 'fixed top-0 left-0 h-[20px] bg-black opacity-70' : 'relative'}`}>
            <div className="py-3 z-30 w-full">
                <div className="relative mx-auto w-full md:w-[90%] flex justify-between">
                    <div className="flex items-center gap-28">
                        <svg
                            width="56"
                            height="56"
                            viewBox="0 0 56 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-4 md:ml-0"
                        >
                            <path d="M0 54.5V1L22 28L0 54.5Z" fill="url(#paint0_linear_188_239)" />
                            <path d="M28 24H20.5L1 0H32L40 9.5L28 24Z" fill="url(#paint1_linear_188_239)" />
                            <path d="M28 32H20.5L1 56H32L40 46.5L28 32Z" fill="url(#paint2_linear_188_239)" />
                            <path d="M27 28L41 11L56 28L41 45L27 28Z" fill="url(#paint3_linear_188_239)" />
                            <defs>
                                <linearGradient id="paint0_linear_188_239" x1="22" y1="28" x2="2.62418e-07" y2="28" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" stopOpacity="0.1" />
                                    <stop offset="1" stopColor="white" stopOpacity="0.5" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_188_239" x1="40" y1="12" x2="11.5" y2="12" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" stopOpacity="0.3" />
                                    <stop offset="1" stopColor="white" stopOpacity="0.1" />
                                </linearGradient>
                                <linearGradient id="paint2_linear_188_239" x1="40" y1="46.5" x2="1" y2="46.5" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" stopOpacity="0.6" />
                                    <stop offset="1" stopColor="white" stopOpacity="0.8" />
                                </linearGradient>
                                <linearGradient id="paint3_linear_188_239" x1="27" y1="28" x2="56" y2="28" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#E9E9E9" />
                                    <stop offset="1" stopColor="white" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="h-10 rounded-3xl bg-white items-center px-2 hidden md:flex">
                            <input type="text" className="max-w-[160px] appearance-none border border-none rounded pl-2 focus:outline-none focus:border-none" />
                            <button className="p-2 rounded-full bg-[#F38825] text-white">
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center mr-4 md:mr-0">
                        <div className="flex items-center gap-1 text-white hidden md:flex">
                            <div className="h-10 relative rounded-full w-10 bg-[#F38825] flex items-center justify-center text-lg">
                                <IoBagHandleOutline />
                            </div>
                            <p className="text-xs uppercase font-light tracking-wider">My Cart</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative ${isFixed ? 'h-[20px]' : ' h-[450px]'} text-white flex flex-col gap-5 items-center justify-center uppercase">
                <img
                    className=" ${isFixed ? 'fixed top-0 left-0 h-[20px] bg-black opacity-70' : ' h-20px'} fixed top-2 left-0 w-[98%] h-full object-cover -z-20 left-1/2 transform -translate-x-1/2 rounded-xl"
                    src="https://s3-alpha-sig.figma.com/img/833c/2be1/8639d391de67ec6164fb417caca83280?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZXhi3C1L8GlNDE~yIkBb8QoUPW5sF1r6GEgvzlTM23MINSr0xdn3v1jeyAXlTENTzqDstUC0FPc0ogYh8SbNeklrTQn5WccmXmcWBKceCZZPOk5kS~lSNWHZ~etHTsJAaB8cmqJ3oucBGMO5fNrYWtO0aDV8kWUojBQJ86NmTtYPRJRPGr8NjFKQ9crFGugo~pn-saSPWqghEK~aUexX~jeEvffHd2rGlHEEmalNzTuqxhYp6yD22r6sVkg-5jkJpkoQKdQpSQnxX7jYyAo8X5HpHwGoPgzLuE8HujniYrjWWhs6o6RujvXYVig7KsxPJNY7muMOc6Ov-Zm6y34ryg__"
                    alt="Background"
                />
                <div className="fixed left-0 w-[98%] h-full bg-black opacity-70 -z-10 top-2 left-1/2 transform -translate-x-1/2 rounded-xl"></div>
                <div className="relative z-0 h-full flex flex-col gap-5 items-center justify-center uppercase">
                    <h3 className="text-3xl md:text-6xl font-semibold tracking-wide text-center">
                        Express Your <span className="font-Zen-Tokyo-Zoo font-normal">Creativity</span>
                    </h3>
                    <p className="text-sm md:text-base text-center">Build Your Own Ecommerce Website</p>
                </div>
            </div>
        </div>
    );
};

export default CombinedComponent;

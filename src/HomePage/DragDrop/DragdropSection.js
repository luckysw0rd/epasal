import React, { useState } from 'react';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const DragdropSection = () => {
    const styles = {
        color: 'transparent',
        backgroundClip: 'text',
        backgroundImage: 'linear-gradient(to right, #F38825, #773900)',
        WebkitBackgroundClip: 'text',
    };

    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="bg-white flex flex-col gap-5 md:flex-row items-center justify-between p-8 md:p-10 lg:p-20">
            {/* Left Section */}
            <div className="md:w-1/3 md:order-2 flex flex-col gap-5 px-2 md:px-0">
                <h2 className="text-[#2F2F2F] text-lg md:text-xl lg:text-3xl 2xl:text-4xl lg:leading-tight font-bold">
                    Transform clicks into customers with seamless eCommerce experiences!
                </h2>
                <p className="hidden lg:block text-xs md:text-sm lg:text-base 2xl:text-xl text-[#828282]">
                    Our platform ensures a smooth and intuitive shopping journey, turning casual visitors into loyal buyers. From
                    user-friendly interfaces to secure payment gateways, we provide everything you need to drive sales and grow
                    your online business.
                </p>
            </div>
            <div className={`md:order-1 relative bg-white border-dashed border-2 border-[#793A00] rounded-lg p-5 md:p-6 md:w-1/2 2xl:h-72`}>
                <div className="flex gap-3 justify-start items-start">
                    <div className={`flex flex-col gap-3 lg:gap-5 xxl:gap-8 md:w-[60%] ${isVisible && 'opacity-50 md:opacity-100'}`}>
                        <h2 style={styles} className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl leading-tight lg:leading-normal font-bold mb-4">
                            Unlimited Customization
                        </h2>
                        <p style={styles} className="text-sm md:text-sm lg:text-base 2xl:text-xl mb-4">
                            Beautiful and responsive templates that can be customized however you want it.
                        </p>
                    </div>
                    {!isVisible ? (
                        <MdOutlineQuestionMark
                            size={35}
                            className="text-[#793A00] align-top block md:hidden cursor-pointer"
                            onClick={toggleVisibility}
                        />
                    ) : (
                        <IoCloseSharp
                            size={35}
                            className="text-[#793A00] block md:hidden cursor-pointer"
                            onClick={toggleVisibility}
                        />
                    )}
                </div>

                <div className="hidden md:flex flex-col gap-2 lg:gap-4 bg-[#793A00] w-[70%] lg:w-[55%] rounded-2xl absolute top-[18%] -right-[25%] text-white py-4 px-6 lg;py-6 xl:px-12 2xl:py-8">
                    <h3 className="text-xs md:text-sm lg:text-base 2xl:text-lg font-bold">FREEDOM IS YOURS</h3>
                    <p className="text-xs lg:text-sm 2xl:text-base">Have fun customizing your digital store.</p>
                    <Link to="/buildstore" className="border border-white hover:bg-white hover:text-[#793A00] p-1 rounded-md lg:rounded-xl text-xs lg:text-sm lg:w-2/3 2xl:w-1/2">
                        Build yours now
                    </Link>
                </div>

                <div
                    className={`flex flex-col gap-5 absolute bottom-[15%] rounded-lg bg-[#793A00] text-white py-4 px-6 lg:px-12 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                        }`}
                >
                    {isVisible && (
                        <>
                            <h3 className="text-xs md:text-sm lg:text-base font-bold">FREEDOM IS YOURS</h3>
                            <p className="text-xs lg:text-sm">Have fun customizing your digital store.</p>
                            <Link to="/buildstore" className="border border-white hover:bg-white hover:text-[#793A00] p-1 rounded-md text-xs w-1/2">
                                Build yours now
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DragdropSection;

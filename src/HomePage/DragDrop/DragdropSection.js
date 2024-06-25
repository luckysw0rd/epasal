import React from 'react';

const DragdropSection = () => {

    const styles = {
        color: 'transparent',
        backgroundClip: 'text',
        backgroundImage: 'linear-gradient(to right, #F38825, #773900)',
        WebkitBackgroundClip: 'text',
    };

    return (
        <div className="flex flex-col gap-10 md:flex-row items-center justify-between p-5 md:p-10 lg:p-20">
            {/* Left Section */}
            <div className="relative bg-white border-dashed border-2 border-[#793A00] rounded-lg p-6 md:w-1/2">
                <div className='flex flex-col gap-5 w-[60%]'>
                    <h2 style={styles} className="text-xl md:text-2xl lg:text-3xl leading-tight lg:leading-normal font-bold mb-4">Drag-and-drop interface to create your store.</h2>
                    <p style={styles} className="text-sm md:text-sm lg:text-base mb-4">Beautiful and responsive templates that can be customized however you want it.</p>
                </div>
                <div className="flex flex-col gap-2 lg:gap-4 bg-[#793A00] w-[70%] lg:w-[55%] rounded-2xl absolute top-[25%] -right-[25%] text-white py-4 px-6 lg:px-12">
                    <h3 className="text-xs md:text-sm lg:text-base font-bold ">FREEDOM IS YOURS</h3>
                    <p className="text-xs lg:text-sm">Have fun customizing your digital store.</p>
                    <button className="border border-white hover:bg-white hover:text-[#793A00] p-1 rounded-md lg:rounded-xl text-xs lg:text-sm lg:w-2/3">Build yours now</button>
                </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/3 flex flex-col gap-5">
                <h2 className="text-[#2F2F2F] text-lg md:text-xl lg:text-3xl leadeing-none lg:leading-tight font-bold">Transform clicks into customers with seamless eCommerce experiences!</h2>
                <p className="text-xs md:text-sm lg:text-base text-[#828282]">Our platform ensures a smooth and intuitive shopping journey, turning casual visitors into loyal buyers. From user-friendly interfaces to secure payment gateways, we provide everything you need to drive sales and grow your online business.</p>
            </div>
        </div>
    );
};

export default DragdropSection;

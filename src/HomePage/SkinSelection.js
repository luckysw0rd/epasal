import React from 'react';
import Card1 from '../Assets/Card1.png';
import Card2 from '../Assets/Card2.png';
import NewCollection from '../Assets/new fashion.png';
import ManFrame from '../Assets/ManFrame.png';
import { TbHanger } from "react-icons/tb";
import { IoGameControllerOutline } from "react-icons/io5";
import { SiGoogledatastudio } from "react-icons/si";
import { IoMdAdd } from "react-icons/io";

const SkinSection = () => {
  return (
    <div className="flex flex-col items-center bg-white p-8 py-8 md:py-10 lg:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 lg:mb-16 text-center">Skins for your components</h1>

      <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
        {/* First column */}
        <div className="flex flex-col items-center lg:items-start">
          <img src={Card1} alt="Card 1" className="w-full h-auto lg:w-full max-w-[300px] object-contain " />
        </div>

        {/* Second column */}
        <div className="flex flex-col items-center lg:items-start space-y-4 ">
          <div className="w-[300px] lg:w-[200px] bg-[#526560] rounded-lg p-4">
            <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white text-center lg:text-left">Design as you like</h2>
            <button className="bg-transparent text-white p-1 rounded-lg text-sm mt-2 w-full"><a href="/buildstore" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-white text-white p-1 rounded-lg text-sm mt-2 w-full text-center block">Get Started</a></button>
          </div>
          <img src={Card2} alt="Card 2" className="w-full  max-w-[300px] object-contain hidden lg:block" />
        </div>

        {/* Third column */}
        <div className="w-full flex flex-col ">
          <div className="w-full flex flex-col lg:flex-row lg:space-x-60 space-y-4 lg:space-y-2">
            <div className="w-full lg:w-1/2 bg-[#526560] p-5 rounded-xl text-white ">
              <p className="text-lg text-center lg:text-left mb-5">"Transform your online store with Banau's stunning skins, featuring customizable design cards and banners—some free, some premium!"</p>
            </div>
            <img src={ManFrame} alt="Man Frame" className="w-48 h-auto lg:w-1/2 max-w-[150px] object-contain mx-auto lg:mx-0 hidden lg:block" />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:space-y-0 mt-8 lg:mt-0">
            <div className="w-full lg:w-1/2 flex items-stretch p-4 bg-gray-100 rounded-lg mb-10">
              <div className="flex flex-col gap-5 justify-between items-center lg:items-start  mb-10">
                <h2 className="text-3xl font-semibold text-[#526560] mb-2 text-center lg:text-left">Design banners</h2>
                <p className="text-sm text-center lg:text-left">Enhance your e-commerce site with Banau's beautiful banner skins, offering both free and premium options for a captivating look!</p>
                {/* ICONS  */}
                <h1 className='text-[#526560] text-3xl mt-5 mb-2  font-semibold'>As Required</h1>
                <div className='flex gap-4 md:gap-10'>
                  <div className='flex flex-col gap-2 justify-center items-center'>
                    <div className='flex justify-center items-center border-none bg-[#526560] w-16 h-16 rounded-full'><TbHanger size={35} className="text-white" /> </div>
                    <h1 className='text-[#526560] font-semibold'>Clothing</h1>
                  </div>
                  <div className='flex flex-col gap-2 justify-center items-center'>
                    <div className='flex justify-center items-center border-none bg-[#526560] w-16 h-16 rounded-full'><IoGameControllerOutline size={35} className="text-white" /> </div>
                    <h1 className='text-[#526560] font-semibold'>Gadgets</h1>
                  </div>
                  <div className='flex flex-col gap-2 justify-center items-center'>
                    <div className='flex justify-center items-center border-none bg-[#526560] w-16 h-16 rounded-full'><SiGoogledatastudio size={35} className="text-white" /> </div>
                    <h1 className='text-[#526560] font-semibold'>Usage</h1>
                  </div>
                  <div className='flex flex-col gap-2 justify-center items-center'>
                    <div className='flex justify-center items-center border-none bg-[#526560] w-16 h-16 rounded-full'><IoMdAdd size={35} className="text-white" /> </div>
                    <h1 className='text-[#526560] font-semibold'>& more</h1>
                  </div>

                </div>

              </div>
            </div>
            <img src={NewCollection} alt="New Fashion Collection" className="w-full max-w-sm lg:w-auto lg:flex-1 h-auto lg:max-h-[220px] 2xl:max-h-[300px] object-contain rounded-lg mx-auto lg:mx-0" />
          </div>
        </div>
      </div>
    </div >
  );
};

export default SkinSection;

import React from 'react';
import bannar from "../Assets/Group 117.png";
import storepic2 from "../Assets/storedesign2.png";

function Landingpage() {
  return (
    <div className="lg:flex lg:max-h-[800px]">
      <div className="w-full lg:w-1/2 flex justify-between p-8 md:py-10 lg:py-10">
        <div className="xl:pl-8 flex flex-col justify-center items-center md:items-start">
          <h1 className="text-2xl md:ml-20  lg:ml-10 xl:ml-[78px] 2xl:ml-[150px] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#303030] to-[#383737]">
            WHY BANAU ?
          </h1>
          <div className="flex flex-col lg:flex-row mb-4 justify-between">
            <div className="w-full lg:w-1/2 flex flex-col">
              <img src={bannar} alt="Banau" className="mb-4" />
              <p className="text-xs mb-4 text-gray-800 p-4 md:px-10 text-justify">
                Choose Banau for a seamless, customizable e-commerce solution that requires no coding,
                making it easy for anyone to create and manage their online store.
              </p>
              <div className="flex justify-center">
                <button className="px-6 py-2 border text-xs border-black rounded-full">Get Started</button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-8 flex flex-col justify-center items-center lg:items-start mt-10">
              <ul className="space-y-4 text-base font-extrabold text-gray-800 list-disc list-inside dark:text-gray-700 text-transparent bg-clip-text bg-gradient-to-r from-[#303030] to-[#878787]">
                <li className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#303030]"></span> Order Management
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#303030]"></span> Inventory Management
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#303030]"></span> Payment Gateway
                </li>
              </ul>
              <div className="my-8 flex items-center justify-center gap-2 xl:gap-0">
                <div className='xl:w-[80px] flex flex-col justify-center items-center'>
                  <p className="w-16 h-16 bg-[#262626] text-white text-base flex justify-center items-center font-bold rounded-lg">100 +</p>
                  <span className="text-[#262626] font-bold mx-2">Store</span>
                </div>
                <div className='xl:w-[80px] flex flex-col  justify-center items-center'>
                  <p className="w-16 h-16 bg-[#262626] text-white text-base flex justify-center items-center font-bold rounded-lg">1 M</p>
                  <span className="text-[#262626] font-bold mx-2">Sales</span>
                </div>
                <div className='xl:w-[80px] flex  flex-col justify-center items-center'>
                  <p className="w-16 h-16 bg-[#262626] text-white text-base flex justify-center items-center font-bold rounded-lg">3</p>
                  <span className="text-[#262626] font-bold">Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 text-white p-4">
        <div className="border border-white p-2 md:p-6  flex justify-center rounded-2xl relative">
          <iframe className='rounded-3xl   w-full h-[350px] md:h-[500px] md:max-w-[550px] 2xl:max-w-full lg:w-[600px] lg:h-[400px] 2xl:w-[750px] 2xl:h-[500px]' src="https://www.youtube.com/embed/GpeRIjffJXk?si=6j0u7LEKRGjZDL3W" title="Why Banau?" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;


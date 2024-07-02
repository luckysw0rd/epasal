import React from 'react';
import bannar from "../Assets/Group 117.png";
import storepic2 from "../Assets/storedesign2.png";

function Landingpage() {
  return (
    <div className="lg:flex max-h-[800px]">
      <div className="w-full lg:w-1/2 flex justify-between p-4">
        <div className="xl:pl-8">
          <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#303030] to-[#878787]">
            WHY BANAU ?
          </h1>
          <div className="flex flex-col lg:flex-row mb-4 justify-between">
            <div className="w-full lg:w-1/2">
              <img src={bannar} alt="Banau" className="mb-4" />
              <p className="text-xs mb-4 text-[#828282] p-4 md:px-10 text-justify">
                Choose Banau for a seamless, customizable e-commerce solution that requires no coding,
                making it easy for anyone to create and manage their online store.
              </p>
              <div className="flex justify-center">
                <button className="px-6 py-2 border text-xs border-black rounded-full">Get Started</button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-8">
              <ul className="space-y-4 text-base font-extrabold text-gray-500 list-disc list-inside dark:text-gray-400 text-transparent bg-clip-text bg-gradient-to-r from-[#303030] to-[#878787]">
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
              <div className="my-8 flex gap-2">
                <div>
                  <p className="w-16 h-16 bg-[#262626] text-white text-base flex justify-center items-center font-bold rounded-lg">100 +</p>
                  <span className="text-[#262626] font-bold mx-2">Store</span>
                </div>
                <div>
                  <p className="w-16 h-16 bg-[#262626] text-white text-base flex justify-center items-center font-bold rounded-lg">1 M</p>
                  <span className="text-[#262626] font-bold mx-2">Sales</span>
                </div>
                <div>
                  <p className="w-16 h-16 bg-[#262626] text-white text-base flex justify-center items-center font-bold rounded-lg">3</p>
                  <span className="text-[#262626] font-bold mx-2">Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 text-white p-4">
        <div className="mb-4 bg-gray-900 p-6 rounded-2xl relative">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${storepic2})` }}
          ></div>
          <section className="relative flex flex-col lg:flex-row justify-between z-10 p-4">
            <div className="lg:w-1/2">
              <h2 className="text-base font-bold py-2">Follow some steps to create your website</h2>
              <p className="py-2 text-xs">Watch the video tutorial to get started</p>
              <button className="mt-2 px-4 py-2 bg-white text-black text-xs rounded-full">
                More <span className="mx-2">&gt;</span>
              </button>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <button className="mt-4 lg:mt-0 px-4 py-2 lg:px-8 lg:py-4 bg-orange-500 text-white text-sm lg:text-lg font-bold rounded-full hover:bg-orange-600 transition-colors duration-300">
                Watch Now
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;

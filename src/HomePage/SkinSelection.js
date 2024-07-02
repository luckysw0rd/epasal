import React from 'react';
import Card1 from '../Assets/Card1.png';
import Card2 from '../Assets/Card2.png';
import NewCollection from '../Assets/new fashion.png';
import ManFrame from '../Assets/ManFrame.png';

const SkinSection = () => {
  return (
    <div className="flex flex-col items-center bg-white p-4 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Skins for your components</h1>
      
      <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
        {/* First column */}
        <div className="flex flex-col items-center lg:items-start">
          <img src={Card1} alt="Card 1" className="w-full h-auto lg:w-full max-w-[250px] object-contain " />
        </div>
        
        {/* Second column */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <div className="w-full lg:w-[200px] bg-[#526560] rounded-lg p-4">
            <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white text-center lg:text-left">Design as you like</h2>
            <button className="bg-gray-800 text-white p-2 rounded-lg text-sm mt-2 w-full"><a href="/buildstore" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white p-2 rounded-lg text-sm mt-2 w-full text-center block">Get Started</a></button>
          </div>
          <img src={Card2} alt="Card 2" className="w-48 h-auto lg:w-full max-w-[200px] object-contain hidden lg:block" />
        </div>
        
        {/* Third column */}
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col lg:flex-row lg:space-x-60 space-y-4 lg:space-y-0">
            <div className="w-full lg:w-1/2">
              <p className="text-lg text-gray-800 text-center lg:text-left mb-10">"Transform your online store with Banau's stunning skins, featuring customizable design cards and banners—some free, some premium!"</p>
            </div>
            <img src={ManFrame} alt="Man Frame" className="w-48 h-auto lg:w-1/2 max-w-[150px] object-contain mx-auto lg:mx-0 hidden lg:block" />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:space-y-0">
            <div className="w-full lg:w-1/2 flex items-stretch p-4 bg-gray-100 rounded-lg mb-10">
              <div className="flex flex-col justify-between mb-10">
                <h2 className="text-xl font-bold mb-2 text-center lg:text-left">Design banners</h2>
                <p className="text-sm text-center lg:text-left">Enhance your e-commerce site with Banau's beautiful banner skins, offering both free and premium options for a captivating look!</p>
              </div>
            </div>
            <img src={NewCollection} alt="New Fashion Collection" className="w-full lg:w-auto lg:flex-1 h-auto max-h-[300px] object-contain rounded-lg mx-auto lg:mx-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinSection;

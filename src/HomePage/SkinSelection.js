import React from 'react';
import Card1 from '../Assets/Card1.png';
import Card2 from '../Assets/Card2.png';
import NewCollection from '../Assets/new fashion.png';
import ManFrame from '../Assets/ManFrame.png';

const SkinSection = () => {
  return (
    <div className="flex flex-col items-center bg-white p-4 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Skins for your components</h1>
      
      {/* First section */}
      <div className="flex flex-col lg:flex-row w-full justify-start items-center lg:items-start mb-8 space-y-6 lg:space-y-0 lg:space-x-4">
        <img src={Card1} alt="Card 1" className="w-48 h-auto lg:w-1/6 lg:h-1/6 object-contain" />
        
        <div className="flex flex-col items-center lg:items-start w-full lg:w-80 h-auto lg:h-44 p-6 bg-[#526560] rounded-lg">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-white text-center lg:text-left">Design as you like</h2>
          <button className="bg-gray-800 text-white p-2 rounded-lg text-lg mt-4">Get Started</button>
        </div>
        
        <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto ">
          <p className="text-lg text-gray-800 w-full lg:w-2/3 text-center lg:text-center">"Transform your online store with Banau's stunning skins, featuring customizable design cards and banners—some free, some premium!"</p>
        </div>
        
        <img src={ManFrame} alt="Man Frame" className="w-48 h-auto lg:w-1/4 object-contain" />
      </div>
      
      {/* Second section */}
      <div className="flex flex-col lg:flex-row w-full justify-start items-center lg:items-start mb-8 space-y-6 lg:space-y-0 lg:space-x-4 mt-8 lg:mt-0">
        <img src={Card2} alt="Card 2" className="w-48 h-auto lg:w-1/6 lg:h-1/6 object-contain" />
        
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">Design banners</h2>
          <p className="text-lg mb-4 text-center lg:text-left">Enhance your e-commerce site with Banau's beautiful banner skins, offering both free and premium options for a captivating look!</p>
        </div>
        
        <img src={NewCollection} alt="New Fashion Collection" className="w-64 h-64 lg:w-1/2 lg:h-96 object-contain rounded-lg" />
      </div>
    </div>
  );
};

export default SkinSection;
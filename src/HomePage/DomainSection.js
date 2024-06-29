import React from 'react';
import rec from '../Assets/rec.svg';
import { FiSearch } from 'react-icons/fi';
import image from '../Assets/image.png';

const DomainSection = () => {
  return (
    <div className="flex justify-center items-center bg-white p-4 md:p-10">
      <div className="bg-gray-800 text-white p-6 md:p-12 flex flex-col md:flex-row items-center w-full md:w-11/12 rounded-2xl">

        {/* Domain Section */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 md:w-1/2 md:ml-10">
          <div className="flex items-center mb-4 md:mb-6">
            <img src={rec} alt="Rec" className="h-16 w-16 md:h-28 md:w-28 mr-4 md:mr-6" />
            <div className="ml-4 md:ml-10">
              <h1 className="text-2xl md:text-4xl font-bold">Connect to your own domain</h1>
              <p className="text-lg md:text-xl mt-2">Link Your Ideas to the World - Effortless Domain Connectivity</p>
            </div>
          </div>
          <div className="flex items-center w-full md:w-3/4 mb-8 mt-6 md:mt-12 md:ml-36">
            <div className="relative flex w-full border border-gray-300 rounded-lg p-2 md:p-4">
              <div className="bg-gray-800 text-white text-lg md:text-xl py-2 md:py-3 px-3 md:px-5 focus:outline-none w-full">
                <span className="mr-2 md:mr-3">http://domain</span>
                <FiSearch className="h-6 w-6 md:h-10 md:w-10 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <img src={image} alt="Image" className="rounded-xl h-64 md:h-96 w-full object-contain" />

      </div>
    </div>
  );
};

export default DomainSection;

import React from 'react';
import SingleImage from '../Assets/SingleImage1.webp'; // Import your image

const SkinSection1 = () => {
  return (
    <div className="flex justify-center items-center bg-white p-8 py-8 md:py-10 lg:py-20">
    <img src={SingleImage} alt="Single Image" className="w-full h-auto max-w-[1200px] object-contain" />
    </div>
  );
};

export default SkinSection1;

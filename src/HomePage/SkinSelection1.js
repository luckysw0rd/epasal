import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for react-router-dom v6
import SingleImage from '../Assets/SingleImage1.webp'; // Import your image
import SingleImageMd from '../Assets/FrameMd.webp'; // Import your image

const SkinSection1 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/buildstore');
  };

  return (
    <div className="flex justify-center items-center bg-white p-8 py-8 md:py-10 lg:py-20">
      <img
        src={SingleImage}
        alt="Single Image"
        className="hidden lg:block w-full h-auto max-h-[800px] object-contain cursor-pointer"
        onClick={handleClick}
      />
      <img
        src={SingleImageMd}
        alt="Single Image Medium"
        className="block lg:hidden w-full h-auto max-h-[800px] object-contain cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default SkinSection1;

import React, { useState } from "react";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { FaCircle, FaUserCircle } from "react-icons/fa";

import { HiMenuAlt3 } from "react-icons/hi";
import { useSiderBar } from "../../Context/SiderBarContext";

const SharedNavbar = () => {
  const { open, setOpen } = useSiderBar();

  return (
    <div className="fixed w-full t-0 bg-white z-10 px-4 flex items-center justify-between h-14 text-black">
      <div className="flex items-center">
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-[#70d8bd] transition-colors duration-300 "
          onClick={(e) => setOpen(!open)}
        >
          Dashboard
        </h1>
      </div>
      <div
        className={` 
              flex items-center justify-center
              ml-2
              p-1
              cursor-pointer
              rounded-lg
              sm:p-1 
              md:p-2 
            `}
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        <HiMenuAlt3
          size={26}
          className="text-lg sm:text-xl md:text-2xl rounded-lg hover:text-[#ade9dc] transition duration-300 ease-in-out hover:p-2 " // Adjust icon size for different screen sizes
        />
        <p className="text-lg sm:text-xl md:text-2xl rounded-lg hover:text-[#ade9dc] transition duration-300 ease-in-out hover:p-2 ">
          Panel
        </p>
      </div>
    </div>
  );
};

export default SharedNavbar;

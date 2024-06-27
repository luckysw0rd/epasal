import React from "react";


import { HiMenuAlt3 } from "react-icons/hi";
import { useSiderBar } from "./SiderBarContext";

const SharedNavbar = ({storeName,open,setOpen}) => {
  console.log({storeName});
  return (
    <div className=" w-full font-Roboto t-0 bg-white z-10  px-6  flex items-center justify-between h-14 text-black">
      <div className=" flex items-center text-xl font-bold">
          {storeName}
      </div>
      <div
        className={` 
              flex items-center justify-center
              ml-2
              mr-0
              sm:ml-12
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
          className=" mr-2"
          size={26}
        />
        <p className="text-lg sm:text-xl sm:pr-8  py-4 md:text-2xl rounded-lg hover:text-[#ade9dc] transition duration-300 ease-in-out  ">
          Panel
        </p>
      </div>
    </div>
  );
};

export default SharedNavbar;

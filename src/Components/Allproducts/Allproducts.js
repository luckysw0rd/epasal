
// AllProducts.js
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
import Sidebar from "./SideBar";
import { FaBars } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';
const AllProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex overflow-hidden mx-auto sm:mx-2 md:mx-10 lg:mx-10 xl:mx-16 mt-32">
      {/* Hamburger menu for mobile */}

      {/* Conditionally render the sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        className={`fixed md:static z-50 w-1/2 md:w-[25%] lg:w-[15%] bg-white shadow-md transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      />

      <main className="flex-1 p-4 2xl:p-8 mx-auto lg:ml-[24px]">
        <div className="flex justify-between items-center ">
          <div className="flex justify-between">
            {" "}
            <button
              className="block md:hidden p-1 text-[#4F3100]"
              onClick={toggleSidebar}
            >
              <FaBars className="text-[24px] text-red-900" />
            </button>
            <SortDropdown />
          </div>
          {/* <input
            type="text"
            placeholder="Search..."
            className="border-2 border-[#4F3100] p-1 rounded text-[#4F3100] w-[200%]  sm:w-[144px]"
          /> */}
             {/* <input
            type="text"
            placeholder="Search..."
            className="border-2 border-[#4F3100] p-1 rounded text-[#4F3100] w-[200%]  sm:w-[144px]"
          /> */}

<div className="flex w-[40%] lg:w-[278px]  text-[#4F3100] ">
      <input
        type="text"
        placeholder="Search..."
        className=" w-[90%] border-2 border-[#4F3100] p-1  rounded rounded-r-none border-r-0 focus:outline-none" 
      />
      <FaSearch className="  right-2 top-0 text-[#4F3100]  border-2 border-[#4F3100] p-1  rounded rounded-l-none text-[36px]	"  />
    </div>

        </div>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          <ProductCard />
        </div>
      </main>
    </div>
  );
};

export default AllProducts;


// AllProducts.js
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
import Sidebar from "./SideBar";
import { FaBars } from "react-icons/fa";

const AllProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex overflow-hidden sm:mx-2 md:mx-10 lg:mx-4 mt-16">
      {/* Hamburger menu for mobile */}

      {/* Conditionally render the sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        className={`fixed md:static z-50 w-1/2 md:w-[25%] lg:w-[15%] bg-white shadow-md transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      />

      <main className="flex-1 p-4 ml-0 ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-between">
            {" "}
            <button
              className="block md:hidden p-1 text-[#4F3100]"
              onClick={toggleSidebar}
            >
              <FaBars className="text-[24px]" />
            </button>
            <SortDropdown />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-[#4F3100] p-1 rounded text-[#4F3100] w-[50%]  sm:w-[144px"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductCard />
        </div>
      </main>
    </div>
  );
};

export default AllProducts;

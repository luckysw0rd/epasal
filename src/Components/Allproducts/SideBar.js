// Sidebar.js
import React from "react";
import { FaTimes } from "react-icons/fa";
import data from "./data";
import "./side.css"
const Sidebar = ({ isOpen, toggleSidebar, className }) => {
  const textColor = data.color.text;
  const borderColor = data.color.text;

  return (
    <aside
      className={`${className} p-2 lg:p-4 bg-white shadow-md border-r ` }
      style={{ borderColor }}
    >
      {/* Close button for mobile */}
      <button
        className="block md:hidden p-4 text-[#4F3100]"
        onClick={toggleSidebar}
      >
        <FaTimes />
      </button>

      <div className="mb-4">
        <h3 className="font-bold mb-2" style={{ color: textColor }}>
          Price Range 
        </h3>
        <input
          type="range"
          min="24"
          max="80"
          className="w-full bg-white text-red-600"
          style={{ color:textColor }}
        />
      <input type="range" 
    class="appearance-none bg-transparent slider"></input>
        <div
          className="flex justify-between text-sm mt-2"
          // style={{ color: textColor }}
        >
          <span>$24</span>
          <span>$80</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2" style={{ color: textColor }}>
          Categories
        </h3>
        <ul className="space-y-1">
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span style={{ color: textColor }}>Category 1</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span style={{ color: textColor }}>Category 2</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span style={{ color: textColor }}>Category 3</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span style={{ color: textColor }}>Category 4</span>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2" style={{ color: textColor }}>
          Volume
        </h3>
        <ul className="space-y-1">
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span style={{ color: textColor }}>Gray</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span style={{ color: textColor }}>Brown</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span style={{ color: textColor }}>Blue</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span style={{ color: textColor }}>Blue</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

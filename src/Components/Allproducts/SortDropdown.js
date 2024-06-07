// SortDropdown.js
import React from "react";

const SortDropdown = () => {
  return (
    <div className="flex items-center space-x-2 text-[#4F3100]">
      <label htmlFor="sort" className="font-bold"></label>
      <select
        id="sort"
        className="border-2 border-[#4F3100] w-[100%]  sm:w-[144px] rounded px-2 py-1 text-[#4F3100]"
      >
        <option value="default">Sort by</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default SortDropdown;

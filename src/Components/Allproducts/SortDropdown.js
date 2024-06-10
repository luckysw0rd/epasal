// SortDropdown.js
import React from "react";

const SortDropdown = () => {
  return (
    <div className="flex items-center  text-[#4F3100] bg-white">
      <label htmlFor="sort" className="font-bold"></label>
      <select
        id="sort"
        className="border-2 border-[#4F3100] w-[100%]  sm:w-[144px] rounded px-2 py-1 text-[#4F3100] bg-white"
      >
        <option value="default" className="hover:bg-white">Sort by</option>
        <option value="price"className="hover:bg-white">Price</option>
        <option value="rating"className="hover:bg-white">Rating</option>
      </select>
    </div>
  );
};

export default SortDropdown;

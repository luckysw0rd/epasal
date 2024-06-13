
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./SideBar";
import { FaBars } from "react-icons/fa";
import storeMIni from "./data";

const AllProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  
  // Get the highest and lowest prices from the products
  const prices = storeMIni.products.map((product) => product.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 100;

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const textColor = storeMIni?.color?.productListColor.textColor || "#000";
  const borderColor = storeMIni?.color?.productListColor.borderColor || "#000";
  const backgroundColor = storeMIni?.color?.productListColor.backgroundColor || "#000";
  const cardBackground = storeMIni?.color?.productListColor.cardBackground || "#000";
  const priceColor = storeMIni?.color?.productListColor.priceColor || "#000";
  const buttonColor = storeMIni?.color?.productListColor.buttonBgColor || "#000";
  const buttonBorderColor = storeMIni?.color?.productListColor.buttonBorderColor || "#000";
  const buttonBgColorOnHover = storeMIni?.color?.productListColor.buttonBgColorOnHover || "#000";
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      setPriceRange([minPrice, maxPrice]); // Reset to full range when opening
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingChange = (newValue) => {
    setSelectedRating(newValue);
  };

  const handleSubcategoryChange = (newSelectedSubcategory) => {
    setSelectedSubcategory(newSelectedSubcategory);
  };

  const getSortedProducts = (products) => {
    switch (sortOption) {
      case "price":
        return [...products].sort((a, b) => a.price - b.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "az":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  };

  const getFilteredProducts = () => {
    const filtered = storeMIni.products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.rating >= selectedRating &&
        (!selectedSubcategory ||
          product.subcategories.includes(selectedSubcategory))
      );
    });
    return getSortedProducts(filtered);
  };

  // Extract subcategories from the products
  const subcategories = [
    ...new Set(storeMIni.products.flatMap((product) => product.subcategories))
  ];

  return (
    <div className="flex overflow-auto mx-auto sm:mx-2 md:mx-10 lg:mx-10 xl:mx-16 mt-32">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        className={`fixed md:static z-50 w-1/2 md:w-[25%] lg:w-[15%] shadow-md transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ borderColor }}
        priceRange={priceRange}
        handleSliderChange={handleSliderChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        handleRatingChange={handleRatingChange}
        handleSubcategoryChange={handleSubcategoryChange}
        selectedSubcategory={selectedSubcategory}
        subcategories={subcategories}
      />

      <main className="flex-1 justify-between px-4 2xl:px-8 mx-auto lg:ml-[24px]">
        <div className="flex justify-between">
          <div className="flex">
            <button className="block md:hidden p-1" onClick={toggleSidebar} style={{ color: textColor }}>
              <FaBars className="text-[14px]" />
            </button>
            <div
              className="flex w-[100%] md:w-[100%] h-[24px] sm:h-[36px] lg:w-[278px] border-2 px-1 focus:outline-none rounded"
              style={{ borderColor: textColor }}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-[90%] px-1 py-1 focus:outline-none border-none"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="flex justify-end   h-[24px] sm:h-[36px] w-full text-[14px]" style={{backgroundColor:backgroundColor, textColor:textColor}}>
            <div id="sort" className="flex sm:gap-4 lg:gap-6 border-2 px-1 rounded" style={{borderColor:borderColor}}>
              <div className="my-auto hidden sm:block">
                Sort By:
              </div>
              <select value={sortOption} onChange={handleSortChange} className="border-none  focus:outline-none" style={{backgroundColor:backgroundColor}}>
                <option value="default" className="">
                  Latest
                </option>
                <option value="price" className="">
                  Price
                </option>
                <option value="rating" className="">
                  Rating
                </option>
                <option value="az" className="">
                  A-Z
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {getFilteredProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllProducts;

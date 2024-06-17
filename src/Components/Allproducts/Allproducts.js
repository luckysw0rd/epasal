
// import React, { useState, useEffect } from "react";
// import ProductCard from "./ProductCard";
// import Sidebar from "./SideBar";
// import { FaBars } from "react-icons/fa";
// import storeMIni from "./data";
// import { backdropClasses } from "@mui/material";
// import {motion} from "framer-motion"
// const AllProducts = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("default");
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [selectedSubcategory, setSelectedSubcategory] = useState("");

//   // Get the highest and lowest prices from the product variants
//   const prices = storeMIni.products.flatMap((product) =>
//     product.variant.flatMap((variant) =>
//       variant.options.map((option) => option.price)
//     )
//   );
//   const minPrice = prices.length ? Math.min(...prices) : 0;
//   const maxPrice = prices.length ? Math.max(...prices) : 100;

//   const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

//   useEffect(() => {
//     setPriceRange([minPrice, maxPrice]);
//   }, [minPrice, maxPrice]);

//   const textColor = storeMIni?.color?.productListColor.textColor || "#000";
//   const borderColor = storeMIni?.color?.productListColor.borderColor || "#000";
//   const sideBarBorder = storeMIni?.color?.productListColor.sideBarBorder || "#000";
//   const backgroundColor = storeMIni?.color?.productListColor.backgroundColor || "#000";
//   const cardBackground = storeMIni?.color?.productListColor.cardBackground || "#000";
//   const priceColor = storeMIni?.color?.productListColor.priceColor || "#000";
//   const buttonColor = storeMIni?.color?.productListColor.buttonBgColor || "#000";
//   const buttonBorderColor = storeMIni?.color?.productListColor.buttonBorderColor || "#000";
//   const buttonBgColorOnHover = storeMIni?.color?.productListColor.buttonBgColorOnHover || "#000";

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//     if (!sidebarOpen) {
//       setPriceRange([minPrice, maxPrice]); // Reset to full range when opening
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSortChange = (e) => {
//     setSortOption(e.target.value);
//   };

//   const handleSliderChange = (event, newValue) => {
//     setPriceRange(newValue);
//   };

//   const handleRatingChange = (newValue) => {
//     setSelectedRating(newValue);
//   };

//   const handleSubcategoryChange = (newSelectedSubcategory) => {
//     setSelectedSubcategory(newSelectedSubcategory);
//   };

//   const getSortedProducts = (products) => {
//     switch (sortOption) {
//       case "price":
//         return [...products].sort((a, b) => a.price - b.price);
//       case "rating":
//         return [...products].sort((a, b) => b.rating - a.rating);
//       case "az":
//         return [...products].sort((a, b) => a.name.localeCompare(b.name));
//       default:
//         return products;
//     }
//   };

//   const getFilteredProducts = () => {
//     const filtered = storeMIni.products.filter((product) => {
//       const isVariantInPriceRange = product.variant.some((variant) =>
//         variant.options.some(
//           (option) =>
//             option.price >= priceRange[0] && option.price <= priceRange[1]
//         )
//       );

//       return (
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         isVariantInPriceRange &&
//         product.rating >= selectedRating &&
//         (!selectedSubcategory ||
//           product.subcategories.includes(selectedSubcategory))
//       );
//     });
//     return getSortedProducts(filtered);
//   };

//   // Extract subcategories from the products
//   const subcategories = [
//     ...new Set(storeMIni.products.flatMap((product) => product.subcategories)),
//   ];

//   return (
//     <div className="flex overflow-auto mx-auto sm:mx-2 md:mx-10 lg:mx-10 xl:mx-16 mt-32">
//       <Sidebar
//         isOpen={sidebarOpen}
//         toggleSidebar={toggleSidebar}
//         className={`fixed md:static z-50 w-1/2 md:w-[25%] lg:w-[15%] transition-transform transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//         priceRange={priceRange}
//         handleSliderChange={handleSliderChange}
//         handleRatingChange={handleRatingChange}
//         handleSubcategoryChange={handleSubcategoryChange}
//         selectedSubcategory={selectedSubcategory}
//         subcategories={subcategories}
//       />
//       <main className="flex-1 justify-between px-8 sm:px-4 2xl:px-8 mx-auto lg:ml-[24px]">
//         <div className="flex justify-between">
//           <div className="flex">
//             <button
//               className="block md:hidden pr-2"
//               onClick={toggleSidebar}
//               style={{ color: textColor }}
//             >
//               <FaBars className="text-xl" />
//             </button>
//             <div
//               className="flex w-[100%] md:w-[100%] h-[24px] sm:h-[36px] lg:w-[278px] border-2 px-1 focus:outline-none rounded"
//               style={{ borderColor: borderColor }}
//             >
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-[90%] px-1 py-1 focus:outline-none border-none"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//           </div>
//           <div
//             className="flex justify-end h-[24px] sm:h-[36px] w-full text-[14px]"
//             style={{ backgroundColor: backgroundColor, color: textColor }}
//           >
//             <div
//               id="sort"
//               className="flex sm:gap-4 lg:gap-6 border-2 mx-1 px-1  text-[14px] rounded"
//               style={{ borderColor: borderColor ,backgroundColor:backgroundColor }}
//             >
//               <div className="my-auto hidden sm:block">Sort By:</div>
//               <motion.select
//                 value={sortOption}
//                 onChange={handleSortChange}
//                 className="border-none focus:outline-none lg:text-[14px] decorated "
//                 // style={{ backgroundColor: backgroundColor}}
                
//               >
//                 <option value="default" className="hover:bg-red-600">
//                   Latest
//                 </option>
//                 <option value="price" className="">
//                   Price
//                 </option>
//                 <option value="rating" className="">
//                   Rating
//                 </option>
//                 <option value="az" className="">
//                   A-Z
//                 </option>
//               </motion.select>
//             </div>
//           </div>
//         </div>
//         <div className="my-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {getFilteredProducts().map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               cardBackground={cardBackground}
//               borderColor={borderColor}
//               textColor={textColor}
//               priceColor={priceColor}
//               buttonColor={buttonColor}
//               buttonBorderColor={buttonBorderColor}
//               buttonBgColorOnHover={buttonBgColorOnHover}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AllProducts;

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./SideBar";
import { FaBars } from "react-icons/fa";
import storeMIni from "./data";
import { motion } from "framer-motion";

const AllProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const prices = storeMIni.products.flatMap((product) =>
    product.variant.flatMap((variant) =>
      variant.options.map((option) => option.price)
    )
  );
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 100;

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const textColor = storeMIni?.color?.productListColor.textColor || "#000";
  const borderColor = storeMIni?.color?.productListColor.borderColor || "#000";
  const sideBarBorder = storeMIni?.color?.productListColor.sideBarBorder || "#000";
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
      const isVariantInPriceRange = product.variant.some((variant) =>
        variant.options.some(
          (option) =>
            option.price >= priceRange[0] && option.price <= priceRange[1]
        )
      );

      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        isVariantInPriceRange &&
        product.rating >= selectedRating &&
        (!selectedSubcategory ||
          product.subcategories.includes(selectedSubcategory))
      );
    });
    return getSortedProducts(filtered);
  };

  const subcategories = [
    ...new Set(storeMIni.products.flatMap((product) => product.subcategories)),
  ];

  return (
    <div className="flex overflow-auto mx-auto sm:mx-2 md:mx-10 lg:mx-10 xl:mx-16 mt-32">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        className={`fixed md:static z-50 w-1/2 md:w-[25%] lg:w-[15%] transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        priceRange={priceRange}
        handleSliderChange={handleSliderChange}
        handleRatingChange={handleRatingChange}
        handleSubcategoryChange={handleSubcategoryChange}
        selectedSubcategory={selectedSubcategory}
        subcategories={subcategories}
      />
      <main className="flex-1 justify-between px-8 sm:px-4 2xl:px-8 mx-auto lg:ml-[24px]">
        <div className="flex justify-between">
          <div className="flex">
            <button
              className="block md:hidden pr-2"
              onClick={toggleSidebar}
              style={{ color: textColor }}
            >
              <FaBars className="text-xl" />
            </button>
            <div
              className="flex w-[100%] md:w-[100%] h-[24px] sm:h-[36px] lg:w-[278px] border-2 px-1 focus:outline-none rounded"
              style={{ borderColor: borderColor }}
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
          <div
            className="flex justify-end h-[24px] sm:h-[36px] w-full text-[14px]"
            style={{ backgroundColor: backgroundColor, color: textColor }}
          >
            <motion.div
              id="sort"
              className="flex sm:gap-4 lg:gap-6 border-2 mx-1 px-1 text-[14px] rounded"
              style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
             
            >
              <div className="my-auto hidden sm:block">Sort By:</div>
              <motion.select
                value={sortOption}
                onChange={handleSortChange}
                className="border-none focus:outline-none lg:text-[14px] decorated"
                // whileHover={{ backgroundColor: "red" }}
              >
                <motion.option
                  value="default"
                  whileHover={{ backgroundColor: "red" }}
               
                >
                  Latest
                </motion.option>
                <motion.option
                  value="price"
                  whileHover={{ backgroundColor: "#1882A8" }}
                >
                  Price
                </motion.option>
                <motion.option
                  value="rating"
                  whileHover={{ backgroundColor: "#1882A8" }}
                >
                  Rating
                </motion.option>
                <motion.option
                  value="az"
                  whileHover={{ backgroundColor: "#1882A8" }}
                >
                  A-Z
                </motion.option>
              </motion.select>
            </motion.div>
          </div>
        </div>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {getFilteredProducts().map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cardBackground={cardBackground}
              borderColor={borderColor}
              textColor={textColor}
              priceColor={priceColor}
              buttonColor={buttonColor}
              buttonBorderColor={buttonBorderColor}
              buttonBgColorOnHover={buttonBgColorOnHover}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllProducts;

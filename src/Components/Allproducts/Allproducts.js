





import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Sidebar from "./SideBar";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import useFetch from '../../Hooks/useFetch';
import { useParams } from "react-router-dom";

const AllProducts = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [products, setProducts] = useState([  
 
    ]);
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [colors, setColors] = useState({
   
  });
  const [loading, setLoading] = useState(true);
const {storeName}= useParams()
  useEffect(() => {
    console.log(useParams)
    if ( storeName){
      fetchProducts();
    }
   
  }, [storeName]);

  const fetchProducts = async () => {
    console.log(storeName)

    try {
      const response = await axios.get(
        `http://localhost:8000/api/product/getStoreProducts/${storeName}`
      );
      const data = response.data;
      console.log("data", data);
      setProducts(data.products);
      setColors(data.color);

      // Calculate initial price range
      const prices = data.products.flatMap((product) =>
        product.variant.flatMap((variant) =>
          variant.options.map((option) => option.price)
        )
      );
      const minPrice = prices.length ? Math.min(...prices) : 0;
      const maxPrice = prices.length ? Math.max(...prices) : 100;
      setPriceRange([minPrice, maxPrice]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }
// try {
//       const response = await sendRequest(
//           'product/getStoreProducts/6671aaa1947f304e8aa0e5fc',
//           'GET',
//            null,
//           {
//               'Content-Type': 'application/json'
//           }
//       );
//       // Handle response data as needed
//       console.log(response)
//       const data = response.data;
//         console.log("data", data);
//         setProducts(data?.products);
//         setColors(data?.color);
  
//         // Calculate initial price range
//         const prices = data.products.flatMap((product) =>
//           product.variant.flatMap((variant) =>
//             variant.options.map((option) => option.price)
//           )
//         );
//         const minPrice = prices.length ? Math.min(...prices) : 0;
//         const maxPrice = prices.length ? Math.max(...prices) : 100;
//         setPriceRange([minPrice, maxPrice]);
//         setLoading(false);
     

//   } catch (error) {
      
//     console.error("Error fetching data:", error);
//     setLoading(false);
//   }
//   };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      // Reset price range when opening sidebar
      const prices = products.flatMap((product) =>
        product.variant.flatMap((variant) =>
          variant.options.map((option) => option.price)
        )
        
      );
      console.log(prices)
      const minPrice = Math.min(...prices) ;
      const maxPrice = Math.max(...prices) ;
      setPriceRange([minPrice, maxPrice]);
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
  
    const filtered = products.filter((product) => {
      console.log("products",products)
      const isVariantInPriceRange = product.variant.some((variant) =>
        variant.options.some(
          (option) =>
            option.price >= priceRange[0] && option.price <= priceRange[1]
          
        )
      );

      return (
        
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        isVariantInPriceRange &&
        product?.rating >= selectedRating &&
        (!selectedSubcategory ||
          product.subcategories.includes(selectedSubcategory))
         
      );
      
    });
    console.log("Filtered Products:", getSortedProducts(filtered)); // Debug statement
    console.log("products",products)
    return getSortedProducts(filtered);
  };

  const subcategories = [
    ...new Set(products.flatMap((product) => product.subcategories)),
  ];

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while fetching data
  }

  return (
    <> 
    
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
        products={products} // Pass products as prop to Sidebar
        colors={colors} // Pass colors as prop to Sidebar
      />
      <main className="flex-1 justify-between px-8 sm:px-4 2xl:px-8 mx-auto lg:ml-[24px]">
        <div className="flex justify-between">
          <div className="flex">
            <button
              className="block md:hidden pr-2"
              onClick={toggleSidebar}
              style={{ color: colors.productListColor.textColor }}
            >
              <FaBars className="text-xl" />
            </button>
            <div
              className="flex w-[100%] md:w-[100%] h-[24px] sm:h-[36px] lg:w-[278px] border-2 px-1 focus:outline-none rounded"
              style={{ borderColor: colors.productListColor.borderColor }}
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
            style={{
              backgroundColor: colors.productListColor.backgroundColor,
              color: colors.productListColor.textColor,
            }}
          >
            <motion.div
              id="sort"
              className="flex sm:gap-4 lg:gap-6 border-2 mx-1 px-1 text-[14px] rounded"
              style={{
                borderColor: colors.productListColor.borderColor,
                backgroundColor: colors.productListColor.backgroundColor,
              }}
            >
              <div className="my-auto hidden sm:block">Sort By:</div>
              <motion.select
                value={sortOption}
                onChange={handleSortChange}
                className="border-none focus:outline-none lg:text-[14px]"
                style={{
                  borderColor: colors.productListColor.borderColor,
                  backgroundColor: colors.productListColor.backgroundColor,
                }}
              >
                <motion.option value="default">Latest</motion.option>
                <motion.option value="price">Price</motion.option>
                <motion.option value="rating">Rating</motion.option>
                <motion.option value="az">A-Z</motion.option>
              </motion.select>
            </motion.div>
          </div>
        </div>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {getFilteredProducts().map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              color={colors} // Pass colors as prop to ProductCard
            />
          ))}
        </div>
      </main>
    </div>
    
    </>
    
  );
};

export default AllProducts;


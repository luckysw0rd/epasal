import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import CustomizedSlider from "./CustomizedSlider";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";

// Function to calculate min and max prices from product variants
const calculatePriceRange = products => {
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  products.forEach(product => {
    product.variant.forEach(variant => {
      variant.options.forEach(option => {
        if (option.price < minPrice) minPrice = option.price;
        if (option.price > maxPrice) maxPrice = option.price;
      });
    });
  });

  return [minPrice, maxPrice];
};

const Sidebar = ({
  isOpen,
  toggleSidebar,
  className,
  priceRange,
  handleSliderChange,
  handleRatingChange,
  handleSubcategoryChange,
  selectedSubcategory,
  subcategories,
  products,
  colors = {}, // Provide a default empty object
  sliderColor
}) => {
  // Use optional chaining (?.) to safely access nested properties
  const textColor = colors?.subcategoryColor?.textColor || 'black';
  const backgroundColor = colors?.productListColor?.backgroundColor || 'white';
  const customColor = colors?.subcategoryColor?.text || 'blue';
  const sideBarBorder = colors?.productListColor?.sideBarBorder || 'gray';

  const [selectedRating, setSelectedRating] = useState(0);
  const [minPrice, maxPrice] = calculatePriceRange(products);

  const handleRating = (event, newValue) => {
    setSelectedRating(newValue);
    handleRatingChange(newValue);
  };

  const handleSubcategory = subcategory => {
    const newSelectedSubcategory =
      selectedSubcategory === subcategory ? "" : subcategory;
    handleSubcategoryChange(newSelectedSubcategory);
  };

  return (
    <aside
      className={`${className} p-2 lg:p-4 shadow-2xl border h-[100%]`}
      style={{ borderColor: sideBarBorder, backgroundColor: backgroundColor }}
    >
      {/* Close button for mobile */}
      <div className="flex justify-between md:hidden">
        <p className="font-bold mb-2" style={{ color: textColor }}>
          Filter
        </p>
        <button
          className="block md:hidden"
          style={{ color: textColor }}
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2" style={{ color: textColor }}>
          Price Range
        </h3>
        <CustomizedSlider
          value={priceRange}
          onChange={handleSliderChange}
          min={minPrice}
          max={maxPrice}
          sliderColor={sliderColor}
        />
        <div className="flex justify-between text-sm lg:text-vsm xl:text-sm mt-2">
          <span>Rs {priceRange[0]}</span>
          <span>Rs {priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2" style={{ color: textColor }}>
          Rating
        </h3>
        <Rating
          name="rating"
          value={selectedRating}
          precision={0.5}
          onChange={handleRating}
          sx={{
            color: customColor,
            "& .MuiRating-iconFilled": {
              color: customColor
            },
            "& .MuiRating-iconHover": {
              color: customColor
            }
          }}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2" style={{ color: textColor }}>
          Categories
        </h3>
        <ul className="space-y-1 list-none ml-0 pl-0">
          {subcategories.map((subcategory, index) => (
            <li
              key={index}
              className="flex items-center pl-0 ml-0"
              onClick={() => handleSubcategory(subcategory)}
            >
              <Checkbox
                checked={selectedSubcategory === subcategory}
                className="m-0"
                sx={{
                  color: customColor,
                  "&.Mui-checked": {
                    color: customColor
                  }
                }}
              />
              <span style={{ color: textColor }}>{subcategory}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

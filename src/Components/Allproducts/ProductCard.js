
import React, { useState, useEffect } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import storeMIni from "./data";

const ProductCard = ({ product }) => {
  // Helper function to determine the truncation length based on screen width
  const getTruncateLength = (width) => {
    if (width < 640) return 50; // sm
    if (width < 1281) return 38; // md, lg
    return 50; // xl, 2xl
  };

  const [selectedVariant, setSelectedVariant] = useState(product.variant[0].options[0]);
  const [truncateLength, setTruncateLength] = useState(getTruncateLength(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setTruncateLength(getTruncateLength(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex text-xl">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-[#AD7A29]">
            &#9733;
          </span>
        ))}
        {halfStar && (
          <span className="relative text-[#AD7A29]">
            <span className="absolute w-1/2 overflow-hidden" style={{ width: '50%' }}>
              &#9733;
            </span>
            <span className="text-gray-300">
              &#9733;
            </span>
          </span>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className="text-gray-300">
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
  };

  const truncateName = (name) => {
    return name.length > truncateLength ? name.slice(0, truncateLength) + '...' : name;
  };

  return (
    <div
      key={product.id}
      className="border p-4 rounded-lg shadow-md w-[100%] h-100%"
      style={{ borderColor: storeMIni.color.backgroundThemeColor }}
    >
      <img
        src={selectedVariant.image.imageUrl}
        alt={product.name}
        className="w-[100%] h-[133px] object-contain"
      />
      <div className="my-auto py-1">
        <div className="flex justify-between h-[60px]">
          <h2 className="text-lg font-Roboto font-bold" style={{ color: storeMIni.color.productListColor.textColor }}>
            {truncateName(product.name)}
          </h2>
        </div>
        <p className="text-sm w-[90%] font-bold" style={{ color: storeMIni.color.productListColor.textColor }}>
          Rs.{"\t"}{selectedVariant.price}
        </p>
        <div className="flex items-center text-[13.6px]">
          {renderStars(product.rating)}
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex justify-between gap-2">
            {product.variant && product.variant[0] && product.variant[0].options &&
              product.variant[0].options.map((variant, index) => (
                <img
                  key={index}
                  src={variant.image.imageUrl}
                  alt={variant.name || 'variant'}
                  className="w-8 h-8 object-cover cursor-pointer"
                  onClick={() => handleVariantClick(variant)}
                />
              ))}
          </div>
          <button className="bg-brown-700 px-3 rounded w-10 h-10 bg-[#4F3100]" style={{ color: storeMIni.color.productListColor.cardBackground }}>
            <TbShoppingBagPlus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

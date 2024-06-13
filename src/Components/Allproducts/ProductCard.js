

import React from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import storeMIni from "./data";

const ProductCard = ({ product }) => {
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

  return (
    <div
      key={product.id}
      className="border p-4 rounded-lg shadow-md w-[100%]flex justify-between h-100%   "
      style={{ borderColor: storeMIni.color.backgroundThemeColor }}
    >
      <img
        src={product.image.imageUrl}
        // alt={product.name}
        className="w-[100%] h-[133px] object-contain"
      />
      <div className="my-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-Roboto font-bold" style={{ color: storeMIni.color.productListColor.textColor }}>
            {product.name}
          </h2>
          <p className="text-sm font-bold" style={{ color: storeMIni.color.productListColor.textColor }}>
            Rs.{"\t"}{product.price}
          </p>
        </div>
        <div className="flex items-center text-[13.6px]">
          {renderStars(product.rating)}
        </div>
        <p className="text-sm mb-2" style={{ color: storeMIni.color.productListColor.textColor }}>
          Generalized attribute
        </p>

        <div className="flex justify-between items-center mt-1">
          <div className="flex jusifty-between gap-2 w-[50%]">
            {product.variant && product.variant[0] && product.variant[0].options &&
              product.variant[0].options.map((variant, index) => (
                <img
                  key={index}
                  src={variant.image.imageUrl}
                  // alt={variant.name || 'variant'}
                  className="w-8 h-8 object-cover"
                />
              ))}
          </div>
          <button className="bg-brown-700  px-3 rounded w-10 h-10 bg-[#4F3100]" style={{color:storeMIni.color.productListColor.cardBackground}}>
            <TbShoppingBagPlus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

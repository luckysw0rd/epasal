import React from "react";
import data from "./data";
import { TbShoppingBagPlus } from "react-icons/tb";
const ProductCard = () => {
  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-[#AD7A29]">
            &#9733;
          </span> // full star
        ))}
        {halfStar && <span className="text-[#AD7A29]">&#189;</span>}

        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className="text-gray-300">
            &#9733;
          </span> // empty star
        ))}
      </div>
    );
  };

  return (
    <>
      {data.products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-lg shadow-md relative w-[100%] sm:[50%] md:[50%] lg:[30%] xl:[25%] "
          style={{ borderColor: data.color.borderColor }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-[100%] object-contain my-auto mx-auto"
          />
          <div className="my-4 ">
          <div className="flex justify-between items-center  ">
            <h2 className="text-lg font-Roboto font-bold " style={{ color: data.color.productColor }}>
              {product.name}
            </h2>
            <button className="text-red-500 text-xl">&#9829;</button>

          </div>
          <div className="flex items-center text-[13.6px]">
            {renderStars(product.rating)}
          </div>
          <p className="text-sm mb-2" style={{ color: data.color.text }}>Generalized attribute</p>

          <div className="flex justify-between items-center mt-1">
            {/* <p
              className="text-sm"
              style={{ color: data.color.subProductColor.priceColor }}
            >
              Starting at ${product.variants[0].prices[0]}
            </p> */}{" "}
            <div className="flex jusifty-around">
              {product.variants.map((variant, index) => (
                <img
                  key={index}
                  src={variant}
                  alt={variant.name}
                  className="w-8 h-8 object-cover"
                />
              ))}
            </div>
            <button className="bg-brown-700 text-white px-3 rounded w-10 h-10 bg-[#4F3100]">
  
              <TbShoppingBagPlus className="w-4 h-4"/>
            </button>
          </div>
          </div>
          
        </div>
      ))}
    </>
  );
};

export default ProductCard;

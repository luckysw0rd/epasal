import React from "react";
import data from "./data";

const ProductCard = () => {
  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-500">
            &#9733;
          </span> // full star
        ))}
        {halfStar && <span className="text-yellow-500">&#189;</span>}

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
          className="border p-4 rounded-lg shadow-md relative w-full "
          style={{ borderColor: data.color.borderColor }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-[194px] h-[133px] object-contain mb-1 mx-auto"
          />
          <div className="flex justify-between items-center ">
            <h2 className="text-lg" style={{ color: data.color.text }}>
              {product.name}
            </h2>
            <button className="text-red-500 text-xl">&#9829;</button>
          </div>
          <div className="flex items-center ">
            {renderStars(product.rating)}
          </div>
          <p className="text-sm mb-2">Generalized attribute</p>

          <div className="flex justify-between items-center mt-1">
            {/* <p
              className="text-sm"
              style={{ color: data.color.subProductColor.priceColor }}
            >
              Starting at ${product.variants[0].prices[0]}
            </p> */}{" "}
            <div className="flex space-x-2 ">
              {product.variants.map((variant, index) => (
                <img
                  key={index}
                  src={variant.image}
                  alt={variant.name}
                  className="w-8 h-8 object-cover border border-gray-300"
                />
              ))}
            </div>
            <button className="bg-brown-700 text-white px-4 py-2 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 bg-red-500 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H4M7 13l-1.4 6m0 0a1 1 0 001 1h12a1 1 0 001-1m-14-6h14m-5-3a1 1 0 112 0 1 1 0 01-2 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;

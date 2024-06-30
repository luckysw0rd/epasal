import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Importing star icons
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product, productColor, addToCart,store }) => {
  const { cardBackground, textColor, priceColor, borderColor, buttonTextColor, buttonBgColor, buttonBgColorOnHover, buttonBorderColor } = productColor;
  console.log(productColor);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [displayedImage, setDisplayedImage] = useState(product?.image?.imageUrl);
  const [rating, setRating] = useState(4.5); // Dummy rating data
const navigate = useNavigate();

  const handleProductClick = (product) => {
    localStorage.setItem('product', JSON.stringify(product));
    localStorage.setItem('store', JSON.stringify(store));

    if (store.fetchedFromBackend && !store.isEdit)
        navigate("/productlanding", { state: { product, store } })
};

const truncateName = (name, charLimit) => {
  if (name.length > charLimit) {
      return name.slice(0, charLimit) + '...';
  }
  return name;
};

  // Truncating function
  const getTruncateLength = (width) => {
    if (width < 640) return 50; // sm
    if (width < 800) return 37; // md, lg
    return 50; // xl, 2xl
  };
  const [truncateLength, setTruncateLength] = useState(getTruncateLength(window.innerWidth));
  useEffect(() => {
    const handleResize = () => {
      setTruncateLength(getTruncateLength(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  if (!product) return null;

  const { name, image, variant } = product;
  const firstVariant = variant[0]; // Considering only the first variant
  const selectedOption = selectedOptionIndex === -1 ? null : firstVariant?.options[selectedOptionIndex];
  const price = selectedOption ? selectedOption.price : product.price || 0;

  const handleOptionSelect = (index) => {
    setSelectedOptionIndex(index);
    setDisplayedImage(firstVariant?.options[index]?.image?.imageUrl);
  };

  const handleDefaultImage = () => {
    setSelectedOptionIndex(-1);
    setDisplayedImage(product?.image?.imageUrl);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} style={{ color: 'orange', fontSize: '14px' }} />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} style={{ color: 'orange', fontSize: '14px' }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: 'orange', fontSize: '14px' }} />);
      }
    }
    return stars;
  };

  return (
    <motion.div
      className="font-roboto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm overflow-hidden transform transition duration-300 relative border-solid border-2 w-full xl:w-[270px] h-[320px] md:h-full mx-auto"
      style={{ borderColor: productColor.borderColor }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-full">
        <div className="relative w-full">
          <div className="card cursor-pointer flex flex-col justify-center rounded-xl shadow-2xl w-full" style={{ backgroundColor: cardBackground }}>
            <div>
              <img src={displayedImage} alt={name} className=" w-[180px] h-[160px] md:w-[252px] md:h-[196px] object-contain mx-auto p-3" style={{ aspectRatio: '1/1' }} />
            </div>
            <div className="px-5 w-full">
              <hr className="border-t-2" style={{ borderColor: borderColor }} />
              <div className="py-2">
              <p className="text-xl  font-bold" style={{ color: textColor }}>{truncateName(name, 22)}</p>
                <p className="my-1 font-bold text-[13px]" style={{ color: priceColor }}>Rs. {price}</p>
              </div>
              <div className="grid gap-2 relative w-full">
                <div className="flex">
                  <div
                    className={` h-[30px] w-[30px] md:h-[48px] md:w-[48px] cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
                    onClick={handleDefaultImage}
                  >
                    <img src={image?.imageUrl} alt="Default" className='me-2 object-contain h-[30px] w-[30px] md:h-[48px] md:w-[48px]' />
                  </div>
                  {firstVariant?.options?.map((option, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <img src={option?.image?.imageUrl} alt={option.name} style={{ height: "48px", width: "48px" }} className='me-2' />
                    </div>
                  ))}
                </div>
                <div className="flex mb-5 text-xl font-bold md:flex-row justify-between items-center text-gray-900">
                  <div style={{ color: priceColor }} className="flex gap-1 w-[60px] items-center">
                    {renderStars(product.rating)}
                  </div>
                  <button
                    style={{ color: buttonTextColor, borderColor: buttonBorderColor, backgroundColor: buttonBgColor }}
                    className={` md:px-6 md:py-2 text-xs transition ease-in duration-200 border-solid border rounded-sm focus:outline-none addToCartBtn`}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonBgColorOnHover}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonBgColor}
                    onClick={() => {
                      handleProductClick(product)
                    }
                  }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import StarRating from './StarRating'; // Import the StarRating component
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'; // Import the icons
import Loader from '../Loading/Loading';
import { GrClear } from "react-icons/gr";
import Tooltip from '../../Theme/Theme1/SubProduct/Tooltip';
import { FaFilter, FaChevronDown, FaStar } from "react-icons/fa";
import AllProductCard from './AllProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import allproductBanner from '../../Assets/allproductBanner.png'
import ModernReactPlayer from '../../Theme/Theme1/AudioPlayer/ModernReactPlayer';
const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { storeName } = useParams();
  const [color, setColor] = useState({});
  const [store, setStore] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: '',
    rating: '',
    category: [],
    name: ''
  });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [name, setName] = useState(''); // State for the name filter input
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State for filter visibility


  useEffect(() => {
    if (store) {
      initializeLocalStorageWithStoreData();
    }
  }, [store?.name, store?.fetchedFromBackend]);



  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}product/getStoreProducts/${storeName}`, {
        params: {
          page,
          limit: 12,
          ...filters,
          productName: name, // Pass the name filter to the backend
          sortByPrice,
          productFilter
        }
      });
      const data = response.data;
      console.log(data);


      setProducts(data.products);
      setLoading(false);
      setColor(data.color);
      setStore(prevState => ({
        ...prevState,
        ...data.store,
        fetchedFromBackend: true
      }));
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };


  const initializeLocalStorageWithStoreData = () => {
    const storedStore = JSON.parse(localStorage.getItem('store'));
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedCartCount = parseInt(localStorage.getItem('cartCount'), 10) || 0;

    if (storedStore && storedStore.name === store.name) {
      setStore(prevState => ({
        ...prevState,
        cart: storedCart,
        cartCount: storedCartCount
      }));
    } else {
      localStorage.setItem('store', JSON.stringify({ name: store.name }));
      localStorage.setItem('cart', JSON.stringify([]));
      localStorage.setItem('cartCount', '0');
      setStore(prevState => ({
        ...prevState,
        cart: [],
        cartCount: 0
      }));
    }
  };

  const addToCart = (product) => {
    const selectedOption = product.selectedVariant ? product.selectedVariant[0].options : { name: 'default' };
    const price = product.price;

    const cartItem = {
      product: product.name,
      price,
      discountAmount: 0,
      count: 1,
      image: product.image,
      productID: product._id || 1,
      selectedVariant: product.selectedVariant || [{ name: 'default', options: { name: 'default' } }]
    };

    const existingCartItemIndex = store.cart.findIndex(item =>
      item.product === product.name &&
      item.price === cartItem.price &&
      JSON.stringify(item.selectedVariant) === JSON.stringify(cartItem.selectedVariant)
    );

    let updatedCart;
    if (existingCartItemIndex !== -1) {
      updatedCart = [...store.cart];
      updatedCart[existingCartItemIndex] = {
        ...updatedCart[existingCartItemIndex],
        count: updatedCart[existingCartItemIndex].count + 1
      };
    } else {
      updatedCart = [...store.cart, cartItem];
    }

    setStore((prevState) => {
      const newStore = {
        ...prevState,
        cart: updatedCart,
        cartCount: prevState.cartCount + 1
      };
      localStorage.setItem('cart', JSON.stringify(newStore.cart));
      localStorage.setItem('cartCount', newStore.cartCount.toString());
      return newStore;
    });
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) {
        pages.push('...');
      }
      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(totalPages - 1, page + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const deleteFromCart = (product) => {
    const { price, selectedVariant } = product;
    const name = product.product;

    const existingCartItemIndex = store.cart.findIndex(item =>
      item.product === name &&
      item.price === price &&
      JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
    );

    if (existingCartItemIndex !== -1) {
      const updatedCart = [...store.cart];

      if (updatedCart[existingCartItemIndex].count === 1) {
        updatedCart.splice(existingCartItemIndex, 1);
      } else {
        updatedCart[existingCartItemIndex] = {
          ...updatedCart[existingCartItemIndex],
          count: updatedCart[existingCartItemIndex].count - 1
        };
      }

      setStore(prevState => ({
        ...prevState,
        cart: updatedCart,
        cartCount: prevState.cartCount - 1
      }));

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      localStorage.setItem('cartCount', (store.cartCount - 1).toString());
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked, id } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFilters(prevFilters => ({
          ...prevFilters,
          category: [...prevFilters.category, value]
        }));
      } else {
        setFilters(prevFilters => ({
          ...prevFilters,
          category: prevFilters.category.filter(cat => cat !== value)
        }));
      }
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };

  const handlePriceChange = (type, value) => {
    if (type === 'min') {
      setMinPrice(value);
      setFilters(prevFilters => ({
        ...prevFilters,
        priceRange: `${value}-${maxPrice}`
      }));
    } else if (type === 'max') {
      setMaxPrice(value);
      setFilters(prevFilters => ({
        ...prevFilters,
        priceRange: `${minPrice}-${value}`
      }));
    }
  };

  const handleRatingChange = (value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      rating: value
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleNameFilterChange = (e) => {
    const { value } = e.target;
    setName(value); // Update the name state
  };

  const handleSearch = () => {
    fetchProducts();
    // Trigger the fetchProducts function on search button click
  };



  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible); // Toggle the visibility state
  };

  const productOptions = [
    { value: '', label: 'All Products' },
    { value: 'offers', label: 'Offers' },
    { value: 'featured', label: 'Featured' }
  ];

  const priceOptions = [
    { value: '', label: 'None' },
    { value: 'lowToHigh', label: 'Low to High' },
    { value: 'highToLow', label: 'High to Low' },
  ];

  const [sortByPrice, setSortByPrice] = useState('');
  const [productFilter, setProductFilter] = useState('');

  useEffect(() => {
    if (filter === 'featured') {
      setProductFilter('featured');
    } else if (filter === 'offers') {
      setProductFilter('offers');
    } else {
      setProductFilter('');
    }
  }, [filter])


  useEffect(() => {
    if (storeName) {
      fetchProducts();
    }
  }, [storeName, page, productFilter]); // Dependency includes storeName and page for initial fetch

  const handleProductFilterChange = (e) => {
    const selectedValue = e.target.value;
    setProductFilter(selectedValue);
  };

  if (loading) {
    return <Loader />
  }



  return (
    color && products && store && (
      <div className="flex flex-col mt-16 ">
        <Navbar setColor={setColor} store={store} color={color} addToCart={addToCart} deleteFromCart={deleteFromCart} setStore={setStore} />

        <div className="relative w-full h-[350px] flex justify-center items-center">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover z-0 opacity-70"
            style={{
              backgroundImage:
                `url(${allproductBanner})`, // Set the background image
              // Adjusts the image position
            }}
          ></div>

          <div className="relative z-10 text-3xl font-bold text-black">
            All Product Page
          </div>
        </div>


        <div className="flex flex-col lg:flex-row sm:px-2 lg:px-0">
          <div className="flex-grow p-2 sm:p-4 w-full lg:w-3/4 min-h-screen">
            <div className="flex flex-wrap justify-start gap-4">
              <div className="w-full bg-white py-2 md:p-3 flex items-center justify-between gap-5 md:gap-16  lg:px-16 shadow-md">
                {/* Left Section: Filter and Results Count */}
                <div className="flex gap-3 sm:gap-5 items-center">
                  <div
                    className="flex text-base sm:text-lg md::text-xl items-center space-x-1 sm:space-x-2 cursor-pointer"
                    onClick={toggleFilterVisibility}
                  >
                    <FaFilter className="text-gray-600" />
                    <span className="font-medium text-gray-700">Filter</span>
                  </div>

                  <div className="text-xs md:text-base text-gray-500">Showing {products.length === 0 ? `0` : `1-${products.length}`} of page {page}</div>
                </div>

                {/* Right Section: Search and Sort */}
                <div className="flex gap-10 items-center">
                  <div className="hidden lg:block relative">
                    <input
                      type="text"
                      name="productName"
                      value={name}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key press
                      onChange={handleNameFilterChange} // Handle change for name filter input
                      placeholder="Search..."

                      className=" lg:flex-grow lg:min-w-[500px] px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-gray-500 "
                    />

                    <button onClick={handleSearch} className="absolute right-3 top-4 text-base text-gray-500">
                      <FaSearch />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="text-sm sm:text-base relative w-32 sm:w-36 md:w-48">
                    <select
                      className="appearance-none w-full px-4 py-2 border bg-white font-medium text-gray-700 border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      value={productFilter}
                      onChange={handleProductFilterChange}
                    >
                      {productOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FaChevronDown className="ml-2" />
                    </div>
                  </div>
                </div>
              </div>


              <AnimatePresence>
                {isFilterVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className='h-auto py-8 border-b border-gray-300 shadow-md px-6 sm:px-10 w-full'>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-6 lg:mt-4">
                      <div className="lg:hidden relative">
                        <input
                          type="text"
                          name="productName"
                          value={name}
                          onChange={handleNameFilterChange} // Handle change for name filter input
                          placeholder="Search..."
                          className=" w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 "
                        />

                        <button onClick={handleSearch} className="absolute right-3 top-4 text-base text-gray-500">
                          <FaSearch />
                        </button>
                      </div>
                      {/* Price Range */}
                      <div className="text-sm lg:text-base flex flex-col">
                        <label className="font-medium text-gray-700 mb-2">Price Range:</label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            name="minPrice"
                            value={minPrice}
                            onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                            placeholder="Min"
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                          />
                          <span className="">-</span>
                          <input
                            type="number"
                            name="maxPrice"
                            value={maxPrice}
                            onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                            placeholder="Max"
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                          />
                        </div>
                      </div>

                      <div className='text-sm lg:text-base flex flex-col '>
                        <h4 className="font-medium text-gray-700 mb-2">Sort By Price:</h4>
                        <div className="relative  w-48 lg:mb-5 flex justify-between items-center">
                          <select
                            className="appearance-none w-full px-4 py-2 border bg-white font-medium text-gray-700 border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            value={sortByPrice}
                            onChange={(e) => setSortByPrice(e.target.value)}
                          >
                            {priceOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <FaChevronDown className="ml-2" />

                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex flex-col text-sm lg:text-base ">
                        <label className="font-medium text-gray-700 mb-2">Rating:</label>
                        <div className="flex gap-8 lg:mb-5 items-center">
                          <StarRating
                            className=''
                            value={parseInt(filters.rating)}
                            onChange={handleRatingChange}
                          />
                          <Tooltip message="Clear Rating">
                            <button
                              onClick={() => handleRatingChange(null)}

                            >
                              <GrClear className='text-amber-700 mt-2' size={20} />
                            </button>
                          </Tooltip>
                        </div>
                      </div>

                      {/* Sub Categories */}
                      {store?.subCategories && (
                        <div className="mb-4 text-sm lg:text-base ">
                          <h4 className=" mb-2 font-medium text-gray-700">Subcategories:</h4>
                          {store.subCategories.map((subCategory, index) => (
                            <div key={subCategory._id} className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                id={`subCategory-${index}`}
                                value={subCategory.name}
                                onChange={handleFilterChange}
                                className="mr-2"
                              />
                              <label htmlFor={`subCategory-${index}`} className="text-gray-600">{subCategory.name}</label>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>

                    <div className="mt-2 flex justify-start">
                      <button onClick={handleSearch} // Handle click on search button
                        className="w-full md:w-fit px-28 py-2 bg-gray-600 text-white rounded-lg flex items-center space-x-2 hover:bg-gray-700 focus:outline-none">
                        <FaSearch />
                        <span>Search</span>
                      </button>
                    </div>
                  </motion.div>

                )}
              </AnimatePresence>


              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-x-8 lg:gap-y-8 w-full rounded-lg lg:px-16 ">
                {products.map(product => (

                  <AllProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    store={store}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className={`px-4 py-2 rounded ${page <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                &lt;
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  disabled
                  key={index + 1}
                  className={`mx-1 px-4 py-2 rounded  bg-white text-gray-700 border border-gray-300`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={products.length === 0}
                onClick={() => handlePageChange(page + 1)}
                className={`px-4 py-2 roundedbg-white ${products.length === 0 ? 'cursor-not-allowed' : ''} text-gray-700 border border-gray-300`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <ModernReactPlayer store={store} />
      </div >
    )
  );
};

export default AllProducts;

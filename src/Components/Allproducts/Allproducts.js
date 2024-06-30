import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import StarRating from './StarRating'; // Import the StarRating component
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'; // Import the icons

const AllProducts = () => {
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
    if (storeName) {
      fetchProducts();
    }
  }, [storeName, page]); // Dependency includes storeName and page for initial fetch

  useEffect(() => {
    if (store) {
      initializeLocalStorageWithStoreData();
    }
  }, [store?.name, store?.fetchedFromBackend]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/product/getStoreProducts/${storeName}`, {
        params: {
          page,
          limit: 12,
          ...filters,
          productName: name // Pass the name filter to the backend
        }
      });
      const data = response.data;
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
    const { name, value, type, checked } = e.target;

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
    fetchProducts(); // Trigger the fetchProducts function on search button click
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible); // Toggle the visibility state
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    color && products && store && (
      <div className="flex flex-col mt-20">
        <Navbar setColor={setColor} store={store} color={color} addToCart={addToCart} deleteFromCart={deleteFromCart} setStore={setStore} />

        <div className="flex flex-col md:flex-row"
          style={{ backgroundColor: color.productListColor.backgroundColor }}
        >
          <button
            onClick={toggleFilterVisibility} // Handle click to toggle filter visibility
            className="md:hidden px-4 py-2 bg-blue-500 text-white rounded m-2"
          >
            {isFilterVisible ? <FaTimes /> : <FaBars />}
          </button>

          {(isFilterVisible || window.innerWidth >= 768) && ( // Conditionally render the filter section based on visibility state or screen width
            <div className="   relative top-8 md:left-12  w-full md:w-1/4 h-[688px]  my md:max-w-[250px] p-5 py-0   md:-mt-4 rounded-lg border-2  shadow-xl"
              style={{ backgroundColor: color.productListColor.backgroundColor, color: color.productListColor.textColor, borderColor: color.productListColor.borderColor }}
            >
              <h3 className="font-bold mb-4 text-xl border-b-2  text-center mt-10  ">Filters</h3>
              <div className="block mb-4">
                <label className="block mb-2 font-semibold">Price Range:</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="minPrice"
                    value={minPrice}
                    onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                    placeholder="Min"
                    className="mt-1 p-2 border rounded w-1/2 mr-2 border-blue-300 focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  <span className="">-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                    placeholder="Max"
                    className="mt-1 p-2 border rounded w-1/2 ml-2 border-blue-300 focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
              </div>
              <label className="block mb-4  font-semibold ">
                <div className=' mb-2'>
                  Rating:
                </div>
                <StarRating
                  className=' '
                  value={parseInt(filters.rating)}
                  onChange={handleRatingChange}
                />
              </label>

              {store?.subCategories && (
                <div className="mb-4">
                  <h4 className=" mb-2 font-semibold">Subcategories:</h4>
                  {store.subCategories.map((subCategory, index) => (
                    <div key={subCategory._id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`subCategory-${index}`}
                        name="category"
                        value={subCategory.name}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      <label htmlFor={`subCategory-${index}`} className="text-gray-600">{subCategory.name}</label>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handleSearch} // Handle click on search button
                className="px-4 py-1   rounded  transition ease-in-out duration-200  border-2"
                style={
                  { backgroundColor: color.productListColor.buttonBgColor, color: color.productListColor.buttonTextColor, borderColor: color.productListColor.buttonBorderColor }
                }
              >
                Search
              </button>
            </div>
          )}

          <div className="md:ml-16 flex-grow p-4 w-full md:w-3/4">
            <div className="flex flex-wrap justify-start gap-4">
              <div className="flex items-center space-x-2 mb-4 ml-0 w-full">
                <input
                  type="text"
                  name="productName"
                  value={name}
                  onChange={handleNameFilterChange} // Handle change for name filter input
                  placeholder="Search..."
                  className="p-2 border border-gray-300 rounded-sm w-[144px] h-[28px] max-w-md"
                />
                <button
                  onClick={handleSearch} // Handle click on search button
                  className="p-2 bg-gray-300 border h-[28px] border-l-0 border-gray-300 rounded-r-lg flex items-center justify-center"
                >
                  <FaSearch className="text-gray-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-8 md:w-[900px]  2xl:w-[1500px]">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    productColor={color.productListColor}
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
        // disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
        className={`px-4 py-2 roundedbg-white text-gray-700 border border-gray-300`}
      >
        &gt;
      </button>
    </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AllProducts;

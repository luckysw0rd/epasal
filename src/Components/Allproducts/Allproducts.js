import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import StarRating from './StarRating'; // Import the StarRating component

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
          limit: 10,
          ...filters,
          productName: name // Pass the name filter to the backend
        }
      });
      const data = response.data;
      setProducts(data.products);
      setLoading(false);
      setColor(data.color);
      setStore(data.store);
      setTotalPages(data.totalPages);
      setStore(prevState => ({
        ...prevState,
        cart: [],
        cartCount: 1
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const initializeLocalStorageWithStoreData = () => {
    if (!localStorage.getItem('store')) {
      localStorage.setItem('store', JSON.stringify({ name: store.name }));
    }

    const storedStore = JSON.parse(localStorage.getItem('store'));

    if (storedStore && storedStore.name !== store.name) {
      localStorage.setItem('cart', JSON.stringify([]));
      localStorage.setItem('cartCount', '0');
      localStorage.setItem('store', JSON.stringify({ name: store.name }));
    }

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedCartCount = parseInt(localStorage.getItem('cartCount'), 10) || 0;

    if (store) {
      setStore(prevState => ({
        ...prevState,
        cart: storedCart,
        cartCount: storedCartCount
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    color && products && store && (
      <div className="flex flex-col mt-20">
        <Navbar setColor={setColor} store={store} color={color} addToCart={addToCart} deleteFromCart={deleteFromCart} setStore={setStore} />

        <div className="flex">
          <div className="w-64 p-4 py-0 ml-2 h-screen -mt-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="font-bold mb-4 text-lg">Filters</h3>
            <div className="block mb-4">
              <input
                type="text"
                name="productName"
                value={name}
                onChange={handleNameFilterChange} // Handle change for name filter input
                placeholder="Search by name"
                className="mt-1 p-2 border rounded w-full"
              />
              <label className="block mb-2">Price Range:</label>
              <div className="flex items-center">
                <input
                  type="number"
                  name="minPrice"
                  value={minPrice}
                  onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                  placeholder="Min"
                  className="mt-1 p-2 border rounded w-1/2 mr-2"
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={maxPrice}
                  onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                  placeholder="Max"
                  className="mt-1 p-2 border rounded w-1/2 ml-2"
                />
              </div>
            </div>
            <label className="block mb-4">
              Rating:
              <StarRating
                value={parseInt(filters.rating)}
                onChange={handleRatingChange}
              />
            </label>

            {store?.subCategories && (
              <div className="mb-4">
                <h4 className="font-bold mb-2">Subcategories:</h4>
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
                    <label htmlFor={`subCategory-${index}`}>{subCategory.name}</label>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleSearch} // Handle click on search button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          <div className="flex-grow p-4">
            <div className="flex flex-wrap justify-center gap-4">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  productColor={color.productListColor}
                  addToCart={addToCart}
                />
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="mx-2">Page {page} of {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AllProducts;

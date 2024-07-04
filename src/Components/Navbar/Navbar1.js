import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import CartDropdown from './CartDropDown';
import CartDropdown from '../Allproducts/CartDropDown';
import axios from 'axios';

const Navbar1 = ({
    setNewCategory,
    store,
    setStore,
    color,
    previewMode,
    isSidebarOpen,
    searchInput,
    setIsSidebarOpen,
    setSearchInput,
    setLogoFile,
    isEdit, fetchedFromBackend
}) => {
    const [scrolling, setScrolling] = useState(false);
    const [editableText, setEditableText] = useState("Ecom Template-2");
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const sidebarRef = useRef();
    const [searchItem, setSearchItem] = useState([])
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Item 1',
            variant: [{ options: [{ price: 10, image: { imageUrl: 'https://via.placeholder.com/50' } }] }]
        },
        {
            id: 2,
            name: 'Item 2',
            variant: [{ options: [{ price: 20, image: { imageUrl: 'https://via.placeholder.com/50' } }] }]
        }
    ]);
    const cart = [
        {
            product: "Item 1",
            price: 100,
            discountAmount: 10,
            count: 4,
            selectedvariant: [
                {
                    name: "default",
                    options: {
                        name: "default"
                    }
                }
            ]
        },
        {
            product: "Item 2",
            price: 200,
            discountAmount: 20,
            count: 4,
            selectedvariant: [
                {
                    name: "default",
                    options: {
                        name: "default"
                    }
                }
            ]
        }
    ];

    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));

        if (fetchedFromBackend && !isEdit)
            navigate("/productlanding", { state: { product, store } })
    };
    
    const loadCartFromLocalStorage = () => {
        console.log('Attempting to load cart from localStorage');
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    console.log('Loaded cart from localStorage:', parsedCart);
                    setStore(prevStore => ({ ...prevStore, cart: parsedCart }));
                } else {
                    console.warn('Invalid cart data in localStorage');
                }
            } catch (error) {
                console.error('Error parsing cart data from localStorage:', error);
            }
        } else {
            console.log('No cart data found in localStorage');
        }
    };
    useEffect(() => {
        loadCartFromLocalStorage();
        console.log("hellleoeoeoeoe", isEdit, fetchedFromBackend)
    }, [setStore]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        const saveCartToLocalStorage = () => {
            // Load existing cart data from localStorage
            const savedCart = localStorage.getItem('cart');
            console.log(savedCart);
            // Initialize mergedCart with store.cart
            let mergedCart = [...store.cart];

            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);

                    if (Array.isArray(parsedCart)) {
                        // Merge store.cart with existing localStorage cart, ignoring common elements
                        mergedCart = [
                            ...parsedCart.filter(item => !store.cart.some(storeItem => storeItem.id === item.id)),
                            ...store.cart
                        ];
                    } else {
                        console.warn('Invalid cart data in localStorage');
                    }
                } catch (error) {
                    console.error('Error parsing cart data from localStorage:', error);
                }
            }

            // Save mergedCart to localStorage
            console.log('Cart updated: saving to localStorage', mergedCart);
            localStorage.setItem('cart', JSON.stringify(mergedCart));
        };

        saveCartToLocalStorage(); // Invoke the function on mount and whenever store.cart changes

    }, [store.cart]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    console.log(store.cartCount)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const deleteFromCart = (product) => {
        const { product: name, price, selectedVariant } = product;

        // Find the index of the item in cart
        const existingCartItemIndex = store.cart.findIndex(item =>
            item.product === name &&
            item.price === price &&
            JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
        );

        // If item exists in cart
        if (existingCartItemIndex !== -1) {
            const updatedCart = [...store.cart];

            // Decrease quantity or remove item if count is 1
            if (updatedCart[existingCartItemIndex].count === 1) {
                updatedCart.splice(existingCartItemIndex, 1);
            } else {
                updatedCart[existingCartItemIndex] = {
                    ...updatedCart[existingCartItemIndex],
                    count: updatedCart[existingCartItemIndex].count - 1
                };
            }

            // Update React state
            setStore(prevState => ({
                ...prevState,
                cart: updatedCart,
                cartCount: prevState.cartCount - 1
            }));

            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            localStorage.setItem('cartCount', (store.cartCount - 1).toString());
        }
    };
    const handleInputChange = (e) => {
        if (!previewMode) {
            setNewCategory(e.target.value);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const onDrop = (acceptedFiles) => {
        if (!previewMode) {
            const file = acceptedFiles[0];
            if (file) {
                setLogoFile(file);
                const reader = new FileReader
                reader.onload = () => {
                    setStore(prevState => ({
                        ...prevState,
                        logo: {
                            ...prevState.logo,
                            logoUrl: reader.result
                        }
                    }));
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleIncreaseQuantity = (index) => {
        setStore(prevStore => {
            const updatedCart = [...prevStore.cart];
            updatedCart[index] = {
                ...updatedCart[index],
                count: updatedCart[index].count + 1
            };
            return { ...prevStore, cart: updatedCart };
        });
    };

    const handleDecreaseQuantity = (index) => {
        setStore(prevStore => {
            if (prevStore.cart[index].count > 1) {
                const updatedCart = [...prevStore.cart];
                updatedCart[index] = {
                    ...updatedCart[index],
                    count: updatedCart[index].count - 1
                };
                return { ...prevStore, cart: updatedCart };
            }
            return prevStore; // No change if count is 1
        });
    };

    const handleDeleteFromCart = (item) => {
        setStore(prevStore => {
            const updatedCart = prevStore.cart.filter(cartItem => cartItem !== item);
            return { ...prevStore, cart: updatedCart };
        });
        deleteFromCart(item); // Call the prop function to delete item from cart
    };


    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
        console.log(store.cart);  // Log the cart items to the console
    };

    const handleEditableTextChange = (e) => {
        setEditableText(e.target.value);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}product/getStoreProducts/${store.name}`, {
                params: {
                    page: 1,
                    limit: 5,
                    productName: searchInput // Pass the name filter to the backend
                }
            });
            const data = response.data;
            setSearchItem(response.data.products)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => { console.log(searchItem, "search item") }, [searchItem])
    const handleSearchIconClick = () => {
        if (searchInput === '')
            setIsSearchClicked(!isSearchClicked)
        else fetchProducts();
    };


    // const deleteFromCart = (itemToDelete) => {
    //     setCartItems(cartItems.filter(item => item.id !== itemToDelete.id));
    // };

    return (
        <motion.nav
            className={`flex  items-center justify-between px-6 py-4 shadow-md fixed w-full z-20 transition-all duration-300 ${scrolling ? 'bg-brown-700' : 'bg-transparent'
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120 }}
            style={{
                fontFamily: store?.fonts?.Navbar,
                backgroundColor: scrolling ? color?.navColor?.backgroundnavColor : 'transparent',
                color: color.navColor.storeNameTextColor,
            }}

        >
            <div className="flex items-center ">
                {!isSidebarOpen && (
                    <button
                        style={{ color: color.navColor.storeNameTextColor }}
                        className="block focus:outline-none md:hidden mr-2"
                        onClick={toggleSidebar}
                    >
                        <FiMenu className="h-6 w-6 fill-current" />
                    </button>
                )}
                {previewMode ? (
                    store.logo && (
                        <img
                            src={store?.logo?.logoUrl}
                            alt="Logo"
                            className="h-12 w-12 rounded-full object-cover mr-4"
                        />
                    )
                ) : (
                    <div {...getRootProps()} className="cursor-pointer flex items-center">
                        <input {...getInputProps()} />
                        <img
                            src={store?.logo?.logoUrl || 'https://via.placeholder.com/50'}
                            alt="Logo"
                            className="h-12 w-12 rounded-full object-cover mr-4"
                        />

                    </div>
                )}
                <span className="text-xl font-bold" onClick={() => navigate('./')}>
                    {store.name}
                </span>
            </div>

            <div className={`flex items-center space-x-4 relative ${isSidebarOpen ? 'mr-10' : 'lg:mr-20'}`}>
                <div className="hidden md:flex space-x-4 mr-8">
                    <Link to={!isEdit && fetchedFromBackend && `/store/products/${store.name}`} className="hover:underline">All Products</Link>
                    <Link to={!isEdit && fetchedFromBackend && `/store/products/${store.name}`} className="hover:underline">Featured</Link>
                    <Link to={!isEdit && fetchedFromBackend && `/store/products/${store.name}`} className="hover:underline">Offers</Link>
                    <Link to={!isEdit && previewMode && `/`} className="hover:underline">Banau Page</Link>
                </div>
                <div className="relative flex items-center hidden md:flex">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        placeholder="Search"
                        className={`bg-transparent border-b border-black focus:outline-none placeholder-black placeholder:text-sm text-xl ${isSearchClicked ? 'block' : 'hidden'}`}
                    />
                    <FaSearch className="text-2xl cursor-pointer" onClick={handleSearchIconClick} />
                    {searchItem.length > 0 &&
                        <ul className='absolute top-10 -left-2 flex flex-col gap-3 w-full px-3 py-3 rounded-b-2xl' style={{
                            fontFamily: store?.fonts?.Navbar,
                            backgroundColor: color?.navColor?.backgroundnavColor,
                            color: color?.navColor?.storeNameTextColor,
                        }}>
                            {searchItem.map((n, i) => {
                                return <li   onClick={() => {
                                    handleProductClick(n)
                                }} key={i} className='flex items-center gap-4'>
                                    <img src={n.image.imageUrl} className='w-10 h-10 rounded-full border border-2 border-black ' />
                                    <div>{n.name}</div>
                                </li>
                            })}
                        </ul>}
                </div>
                <button onClick={handleCartClick} className="relative">
                    <FaShoppingCart className="text-2xl" />
                    {cartItems.length > 0 && (
                        <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 rounded-full text-white px-1 py-0.5 text-xs">
                            {store.cart.length}
                        </span>
                    )}
                </button>
                {isCartOpen && <CartDropdown cart={store.cart} deleteFromCart={deleteFromCart} backgroundColor={color.navColor.backgroundnavColor} store={store} setStore={setStore} />} {/* Conditionally render the CartDropdown */}
                {(store.isEdit || !store.fetchedFromBackend) &&
                    <button
                        onClick={() => { setStore(prev => ({ ...prev, previewMode: !store.previewMode })) }}
                        className="bg-black hover:bg-white text-white hover:text-black hover:border-black hover:border-1 font-bold py-2 px-4 text-sm rounded transition duration-200"
                    >
                        {store.previewMode ? 'Preview Mode' : 'Edit'}
                    </button>}
            </div>

            {
                isSidebarOpen && (
                    <button
                        style={{ color: color.navColor.storeNameTextColor }}
                        className="block focus:outline-none md:hidden absolute right-6"
                        onClick={toggleSidebar}
                    >
                        <FaTimes className="h-6 w-6 fill-current" />
                    </button>
                )
            }

            {
                isSidebarOpen && (
                    <div
                        className="md:hidden fixed top-0 left-0 h-full w-64 text-white shadow-lg z-30"
                        style={{ backgroundColor: color.navColor.backgroundnavColor }}
                        ref={sidebarRef}
                    >
                        <div className="flex flex-col items-start space-y-4 p-4">
                            <div className="flex items-center mb-4">
                                {store.logo && (
                                    <img
                                        src={store?.logo?.logoUrl}
                                        alt="Logo"
                                        className="h-8 mr-4"
                                    />
                                )}
                                <span className="text-xl font-bold">{store.name}</span>
                            </div>
                            <div className="relative flex gap-3 items-center w-full">
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={handleSearchInputChange}
                                    placeholder="Search"
                                    className="bg-transparent border-b border-white focus:outline-none placeholder-white text-xl w-full placeholder:text-sm"
                                />
                                <FaSearch className="text-2xl cursor-pointer" onClick={handleSearchIconClick} />
                            </div>
                            <a to={!isEdit && fetchedFromBackend && `/store/products/${store.name}`} className="hover:underline">All Products</a>
                            <a to={!isEdit && fetchedFromBackend && `/store/products/${store.name}`} className="hover:underline">Featured</a>
                            <a to={!isEdit && fetchedFromBackend && `/store/products/${store.name}`} className="hover:underline">Offers</a>

                        </div>
                    </div>
                )
            }
        </motion.nav >
    );
};

export default Navbar1;

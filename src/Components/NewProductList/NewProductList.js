import React, { useState, useEffect, useContext } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import NewProductListCard from './NewProductListCard';
import NewProductListCard2 from './NewProductListCard2';
import NewProductListCard3 from './NewProductListCard3';
import useFetch from '../../Hooks/useFetch';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Hooks/AuthContext';
import Loader from '../Loading/Loading';
const NewProductList = ({ productListProps, productListType, storeName }) => {
    const initialProducts = [];
    const { products, productColor, setStore, store } = productListProps
    const navigate = useNavigate();
    const { sendRequest, isLoading } = useFetch();
    const handleExploreClick = (e) => {
        if (store.fetchedFromBackend && !store.isEdit) {
            navigate(`${process.env.REACT_APP_BASE_URL}/store/products/:${storeName}`)
        }
    }
    const [setProducts] = useState(initialProducts);
    // Filtered products state
    const [filteredProducts, setFilteredProducts] = useState(products);
    const auth = useContext(AuthContext);

    // Delayed filtering function
    useEffect(() => {
        setFilteredProducts(products.slice(0, 12));
    }, [products]);



    const handleDeleteProduct = (productId) => {
        const productIndex = store.products.findIndex(data => data.id == productId)
        setStore(prevStore => ({
            ...prevStore,
            featuredProducts: prevStore.featuredProducts.filter(product => product !== productIndex)
        }));
    };

    const handleRemoveProduct = async (productName) => {

        if (store?.isEdit) {
            try {
                const response = await sendRequest(
                    `product/deleteProduct`,
                    'POST',
                    JSON.stringify(productName),
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token,
                    }
                );
                toast(response.message);
            } catch (err) {

                toast("Error Deleting Product")
            }
            setStore(prevStore => ({
                ...prevStore,
                products: prevStore.products.filter(product => product._id !== productName.id)
            }));
        }
        else {

            setStore(prevStore => ({
                ...prevStore,
                products: prevStore.products.filter(product => product.id !== productName.id)
            }));
        }
    };



    const renderProductList = () => {
        switch (productListType) {
            case 'default':
                return (
                    <div className='space-y-5 md:space-y-10 py-20 w-full flex items-center relative flex-col px-4  ' style={{ backgroundColor: productColor.backgroundColor }}>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">New Products</h1>
                        <div style={{}} className=''>
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-x-10 gap-y-8 md:gap-y-12 lg:gap-10 ">
                                {filteredProducts.map((product, i) => (
                                    (product?.id || product?._id) && <NewProductListCard
                                        key={product.id}
                                        product={product}
                                        productListProps={productListProps}
                                        handleRemoveProduct={handleRemoveProduct}
                                        store={store}
                                        handleDeleteProduct={handleDeleteProduct}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'Modern Minimalistic':
                return (
                    <div className='space-y-10 py-20 w-full flex items-center relative flex-col' style={{ backgroundColor: productColor.backgroundColor }}>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">New Products</h1>
                        <div style={{}} className=''>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12 lg:gap-10 ">
                                {filteredProducts.map((product, i) => (
                                    (product?.id || product?._id) && <NewProductListCard3
                                        key={product.id}
                                        product={product}
                                        productListProps={productListProps}
                                        handleRemoveProduct={handleRemoveProduct}
                                        store={store}

                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'Slider':
                return (
                    <div className='space-y-10 py-20 w-full flex items-center relative flex-col' style={{ backgroundColor: productColor.backgroundColor }}>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">New Products</h1>
                        <div style={{}} className=''>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12 lg:gap-10 ">
                                {filteredProducts.map((product, i) => (
                                    (product?.id || product?._id) && <NewProductListCard2
                                        key={product.id}
                                        product={product}
                                        productListProps={productListProps}
                                        handleRemoveProduct={handleRemoveProduct}
                                        store={store}

                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            // Add more cases for other product list types
            default:
                <div className='space-y-5 md:space-y-10 py-20 w-full flex items-center relative flex-col' style={{ backgroundColor: productColor.backgroundColor }}>
                    <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">New Products</h1>
                    <div style={{}} className=''>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12 lg:gap-10 ">
                            {filteredProducts.map((product, i) => (
                                (product?.id || product?._id) && <NewProductListCard
                                    key={product.id}
                                    product={product}
                                    productListProps={productListProps}
                                    handleRemoveProduct={handleRemoveProduct}
                                    store={store}

                                />
                            ))}
                        </div>
                    </div>
                </div>
        }
    };


    return (

        <div className='mb-16' style={{ fontFamily: store?.fonts?.NewProduct }}>
            {renderProductList()}
            <Link>
                <button className="flex items-center absolute right-10  font-semibold pt-6 px-4 transition ease-in duration-200 border-nore focus:outline-none"
                >
                    <span>
                        <Link to={`/store/products/${store.name}`} >
                            View More
                        </Link>
                    </span> <IoIosArrowForward />
                </button>
            </Link>
        </div>

    );
}

export default NewProductList;

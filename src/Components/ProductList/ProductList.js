import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import ProductListCard1 from './ProductListCard1';
import ProductListCard2 from './ProductListCard2';
import ProductListcard3 from './ProductListCard3';
const ProductList = ({ productListProps, productListType }) => {
    const { products, isEdit, productColor, setStore, store, fetchedFromBackend } = productListProps

    // Filtered products state
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Delayed filtering function
    useEffect(() => {
        setFilteredProducts(products.slice(0, 4));
    }, [products]);

    const handleDeleteProduct = (productId) => {
        const productIndex = store?.products?.findIndex(data => data.id == productId)
        if (store.isEdit) {

        }
        setStore(prevStore => ({
            ...prevStore,
            featuredProducts: prevStore.featuredProducts.filter(product => product !== productIndex) || []
        }));
    };

    const renderProductList = () => {
        switch (productListType) {
            case 'default':
                return (
                    <div className='space-y-10 py-10 flex items-center relative flex-col mb-16' style={{ backgroundColor: productColor.backgroundColor }}>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">Featured Products</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12 lg:gap-10">
                            {filteredProducts?.map((product, i) => (
                                (product?.id || product?._id) && (
                                    <ProductListCard1
                                        product={product}
                                        productListProps={productListProps}
                                        handleDeleteProduct={handleDeleteProduct}
                                        store={store}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                );

            case 'Modern Minimalistic':
                return (
                    <div className='space-y-10 py-20 flex items-center relative flex-col' style={{ backgroundColor: productColor.backgroundColor }}>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">Featured Products</h1>
                        <div >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12 lg:gap-10 ">
                                {filteredProducts?.map((product, i) => (
                                    (product?.id || product?._id) && <ProductListcard3
                                        key={product.id}
                                        product={product}
                                        productListProps={productListProps}
                                        handleDeleteProduct={handleDeleteProduct}
                                        store={store}

                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'Slider':
                return (
                    <div className='space-y-10 py-20 flex items-center relative flex-col' style={{ backgroundColor: productColor.backgroundColor }}>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">Featured Products</h1>
                        <div >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12 lg:gap-10 ">
                                {filteredProducts?.map((product, i) => (
                                    (product?.id || product?._id) && <ProductListCard2
                                        key={product.id}
                                        product={product}
                                        productListProps={productListProps}
                                        handleDeleteProduct={handleDeleteProduct}
                                        store={store}

                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            // Add more cases for other product list types
            default:
                return (<div className='space-y-10 py-20 flex items-center relative flex-col' style={{ backgroundColor: productColor.backgroundColor }}>
                    <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">Featured Products</h1>
                    <div >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12 lg:gap-10 ">
                            {filteredProducts?.map((product, i) => (
                                (product?.id || product?._id) && <ProductListCard1
                                    key={product.id}
                                    product={product}
                                    productListProps={productListProps}
                                    handleDeleteProduct={handleDeleteProduct}
                                    store={store}

                                />
                            ))}
                        </div>
                    </div>
                </div>)
        }
    };
    return (

        <div className='relative' style={{ fontFamily: store?.fonts?.Featured, backgroundColor:"#ffff" }}>
            {renderProductList()}
            <Link>
                <button className="flex items-center absolute right-10 bottom-2 font-semibold transition ease-in duration-200 border-nore focus:outline-none">
                    <span>View More</span> <IoIosArrowForward />
                </button>
            </Link>
        </div>

    );
};

export default ProductList;

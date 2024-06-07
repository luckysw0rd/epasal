import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import ProductListCard1 from './ProductListCard1';


const ProductList = ({ productListProps, productListType }) => {
    const { products, productColor, setStore } = productListProps

    // Filtered products state
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Delayed filtering function
    useEffect(() => {
        setFilteredProducts(products.slice(0, 4));
    }, [products]);

    const handleDeleteProduct = (productId) => {
        setStore(prevStore => ({
            ...prevStore,
            products: prevStore.products.filter(product => product.id !== productId)
        }));
    };

    const renderProductList = () => {
        switch (productListType) {
            case 'ProductList1':
                return (
                    <div className='space-y-10 flex items-center relative flex-col'>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">Featured Products</h1>
                        <div style={{ backgroundColor: productColor.backgroundColor }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12 lg:gap-10 ">
                                {filteredProducts.map(product => (
                                    <ProductListCard1
                                        key={product.id}
                                        product={product}
                                        productListProps={productListProps}
                                        handleDeleteProduct={handleDeleteProduct}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            // Add more cases for other product list types
            default:
                return null;
        }
    };
    return (

        <div className=''>
            {renderProductList()}
            <Link>
                <button className="flex items-center absolute right-10 font-semibold pt-6 px-4 transition ease-in duration-200 border-nore focus:outline-none">
                    <span>View More</span> <IoIosArrowForward />
                </button>
            </Link>
        </div>

    );
};

export default ProductList;

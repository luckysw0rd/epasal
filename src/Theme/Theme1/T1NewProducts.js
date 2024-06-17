import React from 'react';

import { useStore } from './T1Context';
import NewProductList from '../../Components/NewProductList/NewProductList';

const T1NewProducts = () => {
    const { store, setStore, addToCart } = useStore();
    const { previewMode, featuredProducts, products } = store;
    const { newProductColor } = store.color;
    const productColor = { ...newProductColor };

    // Map featured product indices to their actual product objects
    const featuredProductList = products;

    const productListProps = { store, productColor, products: featuredProductList, previewMode, setStore, addToCart };

    return (
        <div className=' w-full'>
            <NewProductList productListProps={productListProps} productListType="ProductList1" />
        </div>
    );
}

export default T1NewProducts;

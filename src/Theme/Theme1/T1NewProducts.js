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

    var categoryType = 'default'
    if (store?.componentSkin[2]?.activeSkin && store?.componentSkin[2]?.activeSkin !== '') {
        categoryType = store?.componentSkin[2]?.activeSkin || 'default';
    } else {
        categoryType = 'default';
    }


    return (
        <div className=' w-full'>
            <NewProductList productListProps={productListProps} productListType={categoryType} />
        </div>
    );
}

export default T1NewProducts;

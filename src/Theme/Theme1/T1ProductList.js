import React from 'react';
import ProductList from '../../Components/ProductList/ProductList';
import { useStore } from './T1Context';

const T1ProductList = () => {
    const { store, setStore, addToCart } = useStore();
    const { previewMode, featuredProducts, products, isEdit, fetchedFromBackend } = store;
    const { productListColor } = store.color;
    const productColor = { ...productListColor };

    // Map featured product indices to their actual product objects
    const featuredProductList = featuredProducts.map(index => products[index]);
    console.log(featuredProductList)

    var categoryType;
    if (store?.componentSkin[3]?.activeSkin && store?.componentSkin[3]?.activeSkin !== '') {
        categoryType = store?.componentSkin[3]?.activeSkin || 'default';
    } else {
        categoryType = 'default';
    }

    const productListProps = { store, isEdit, productColor, products: featuredProductList, previewMode, setStore, addToCart, store, fetchedFromBackend };



    return (
        <div className=''>
            <ProductList productListProps={productListProps} productListType={categoryType} />
        </div>
    );
}

export default T1ProductList;

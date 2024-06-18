import React from 'react';
import ProductList from '../../Components/ProductList/ProductList';
import { useStore } from './T1Context';

const T1ProductList = () => {
    const { store, setStore, addToCart } = useStore();
    const { previewMode, featuredProducts, products,isEdit } = store;
    const { productListColor } = store.color;
    const productColor = { ...productListColor };

    // Map featured product indices to their actual product objects
    const featuredProductList = featuredProducts.map(index => products[index]);

    const productListProps = { store,isEdit, productColor, products: featuredProductList, previewMode, setStore, addToCart };

    return (
        <div className='px-8 md:px-10'>
            <ProductList productListProps={productListProps} productListType="ProductList1" />
        </div>
    );
}

export default T1ProductList;

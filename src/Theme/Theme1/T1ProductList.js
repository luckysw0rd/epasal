import React from 'react'
import ProductList from '../../Components/ProductList/ProductList'
import { useStore } from './T1Context';

const T1ProductList = () => {
    const { store, setStore, addToCart } = useStore();
    const { products, previewMode } = store;
    const { productListColor } = store.color;
    const productColor = { ...productListColor }

    const productListProps = { productColor, products, previewMode, setStore, addToCart }
    return (
        <div className='px-8 md:px-10'>
            <ProductList productListProps={productListProps} productListType="ProductList1" />
        </div>
    )
}

export default T1ProductList
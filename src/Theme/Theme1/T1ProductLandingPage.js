import React from 'react';
import ProductLanding from '../../Components/ProductLanding/ProductLanding';
import { useStore } from './T1Context';

const T1ProductLanding = () => {
    const { store } = useStore();
    const { products } = store;
    // const { productListColor } = store.color;
    // const productColor = { ...productListColor };

    // Map featured product indices to their actual product objects
    // const featuredProductList = featuredProducts.map(index => products[index]);

    const productLandingProps = { store, products };

    return (
        <div className='px-8 md:px-10'>
            <ProductLanding productLandingProps={productLandingProps} productLandingType="ProductLandingType1" />
        </div>
    );
}

export default T1ProductLanding;

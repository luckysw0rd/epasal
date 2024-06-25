import React from 'react';
import SubProductCard from '../../../Components/SubProductCard/SubProductCard';


const ProductCard = ({ product, handleStyleSelect, handleRemoveProduct, store }) => { // Pass handleRemoveProduct prop
    
    var categoryType;
    if (store?.componentSkin[1]?.activeSkin && store?.componentSkin[1]?.activeSkin !== '') {
        categoryType = store?.componentSkin[1]?.activeSkin || 'default';
    } else {
        categoryType = 'default';
    }
    // const categoryType = store?.componentSkin[1]?.activeSkin ||  'default';
    const ProductProps = { categoryType, product, handleStyleSelect, handleRemoveProduct, store };
    console.log(categoryType);
    return (
        <SubProductCard {...ProductProps} />
    );
};

export default ProductCard;

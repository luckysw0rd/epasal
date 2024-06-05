import React from 'react';
import SubProductCard from '../../../Components/SubProductCard/SubProductCard';


const ProductCard = ({ product, handleStyleSelect, handleRemoveProduct }) => { // Pass handleRemoveProduct prop
    const categoryType = 'Category1';
    const ProductProps={categoryType, product, handleStyleSelect, handleRemoveProduct };

    return (
        <SubProductCard {...ProductProps}/>
    );
};

export default ProductCard;

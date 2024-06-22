import React from 'react';
import SubProductCard from '../../../Components/SubProductCard/SubProductCard';


const ProductCard = ({ product, handleStyleSelect, handleRemoveProduct ,store }) => { // Pass handleRemoveProduct prop
    const categoryType = 'Category1';
    const ProductProps={categoryType, product, handleStyleSelect, handleRemoveProduct,store };

    return (
        <SubProductCard {...ProductProps}/>
    );
};

export default ProductCard;

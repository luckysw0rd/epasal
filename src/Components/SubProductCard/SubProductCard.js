import React from 'react'
import SubProductCard1 from './SubProductCard1';

const SubProductCard = ({ categoryType, ...props }) => {
    switch (categoryType) {
        case 'Category1':
            return <SubProductCard1 {...props} />;
        default:
            return <div>Unknown Products</div>;
    }
}

export default SubProductCard
import React from 'react'
import SubProductCard1 from './SubProductCard1';
import SubProductCard2 from './SubProductCard2';
const SubProductCard = ({ categoryType, ...props }) => {
    switch (categoryType) {
        case 'Category1':
            return <SubProductCard2 {...props}></SubProductCard2>
            // return <SubProductCard1 {...props} />;
        default:
            return <div>Unknown Products</div>;
    }
}

export default SubProductCard
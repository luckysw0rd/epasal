import React from 'react'
import SubProductCard1 from './SubProductCard1';
import SubProductCard2 from './SubProductCard2';
const SubProductCard = ({ categoryType, ...props }) => {
    console.log(props);

    switch (categoryType) {
        case 'default':
            return <SubProductCard1 {...props} />;
        case 'Modern Minimalistic':
            return <SubProductCard2 {...props}></SubProductCard2>

        default:
            return <SubProductCard1 {...props} />;
    }
}

export default SubProductCard
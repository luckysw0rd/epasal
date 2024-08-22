import React from 'react'
import SubProductCard1 from './SubProductCard1';
import SubProductCard2 from './SubProductCard2';
import SubProductCard3 from './SubProductCard3';
import SubProductCard4 from './SubProductCard4';
const SubProductCard = ({ categoryType, ...props }) => {
    
    
    switch (categoryType) {
        case 'default':
            return <SubProductCard1 {...props} />;
        case 'Modern Minimalistic':
            return <SubProductCard3 {...props} />
        case 'Slider':
            return <SubProductCard2 {...props} />
        case 'Sleek':
            return <SubProductCard4 {...props} />
        default:
            return <SubProductCard1 {...props} />;
    }
}

export default SubProductCard
import React from 'react'
import SubProductCard1 from './SubProductCard1';
import SubProductCard2 from './SubProductCard2';
import SubProductCard3 from './SubProductCard3';
const SubProductCard = ({ categoryType, ...props }) => {
    console.log(props);

    switch (categoryType) {
        case 'default':
            return <SubProductCard1 {...props} />;
        case 'Modern Minimalistic':
            return <SubProductCard3 {...props}/>
        case 'Slider':
            return <SubProductCard2 {...props}/>
            
        default:
            return <SubProductCard1 {...props} />;
    }
}

export default SubProductCard
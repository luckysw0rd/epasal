import React from 'react';
import SubProduct1 from './SubProduct1';

const SubProduct = (props) => {
    const { subProductType } = props;

    switch (subProductType) {
        case 'Category1':
            return <SubProduct1 {...props} />;
        default:
            return null;
    }
};

export default SubProduct;


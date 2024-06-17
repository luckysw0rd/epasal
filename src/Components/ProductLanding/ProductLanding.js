import React from 'react';
import ProductLanding1 from './ProductLanding1';


const ProductLanding = ({ productLandingProps, productLandingType }) => {

  const renderProductLandingPage = () => {
    switch (productLandingType) {
      case 'productLanding1':
        return (
          <ProductLanding1 productLandingProps={productLandingProps} />
        );
      default:
        return null;
    }
  };
  return (

    <div >
      {renderProductLandingPage()}
    </div>

  );
};

export default ProductLanding;

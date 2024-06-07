import React from "react";
import OfferBanner1 from "./OfferBanner1";

const OfferBanner = (props) => {
  const { previewMode } = props;

  const renderBanner = () => {
    switch (previewMode) {
      case true:
        return <OfferBanner1 {...props} />;
      case false:
        return <OfferBanner1 {...props} />;
      default:
        return <OfferBanner1 {...props} />;
    }
  };

  return <>{renderBanner()}</>;
};

export default OfferBanner;

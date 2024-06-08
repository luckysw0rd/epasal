import React from "react";
import OfferBanner1 from "./OfferBanner1";

const OfferBanner = (props) => {
  const { previewMode } = props;
  const offerBannerType = "offer1"
  const renderBanner = () => {
    switch (offerBannerType) {
      case "offer1":
        return <OfferBanner1 {...props} />;
      default:
        return <OfferBanner1 {...props} />;
    }
  };

  return <>{renderBanner()}</>;
};

export default OfferBanner;

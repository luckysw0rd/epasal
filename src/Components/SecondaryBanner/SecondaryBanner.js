import React from "react";
import SecondaryBanner1 from "./SecondaryBanner1";

const SecondaryBanner = (props) => {
  const { previewMode } = props;

  const renderBanner = () => {
    switch (previewMode) {
      case true:
        return <SecondaryBanner1 {...props} />;
      case false:
        return <SecondaryBanner1 {...props} />;
      default:
        return <SecondaryBanner1 {...props} />;
    }
  };

  return <>{renderBanner()}</>;
};

export default SecondaryBanner;

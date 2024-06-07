

import React from "react";
import { useStore } from "./T1Context";
import SecondaryBanner1 from "../../Components/SecondaryBanner/SecondaryBanner1";
import secondary from "../../Assets/ImageGroup.png";

const T1SecondaryBanner = () => {
  const { store } = useStore();
  const { previewMode } = store;

  return (
    <SecondaryBanner1 previewMode={previewMode} defaultBgImage={secondary} /> 
  );
};

export default T1SecondaryBanner;

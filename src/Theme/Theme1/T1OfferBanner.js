
import React from "react";
import { useStore } from "./T1Context";
import OfferBanner1 from "../../Components/OfferBanner/OfferBanner1";
import offerBanner from "../../Assets/offerbanner.webp";

const T1OfferBanner = () => {
  const { store } = useStore();
  const { previewMode,isEdit ,fetchedFromBackend } = store;

  return (
    <OfferBanner1 previewMode={previewMode} isEdit={isEdit} fetchedFromBackend={fetchedFromBackend} defaultBgImage={offerBanner} />
  );
};

export default T1OfferBanner;



import React from "react";
import { useStore } from "../ThemeContext";
import SecondaryBanner1 from "../../Components/SecondaryBanner/SecondaryBanner1";
import secondary from "../../Assets/ImageGroup.png";

const T1SecondaryBanner = () => {
  const { store,setStore } = useStore();

  const { previewMode, isEdit ,fetchedFromBackend} = store;

  return (
    <SecondaryBanner1 previewMode={previewMode} isEdit={isEdit} fetchedFromBackend={fetchedFromBackend} defaultBgImage={secondary} store={store} setStore={setStore}/>
  );
};

export default T1SecondaryBanner;

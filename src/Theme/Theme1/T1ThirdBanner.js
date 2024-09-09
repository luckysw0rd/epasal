
import React from "react";
import { useStore } from "../ThemeContext";

import secondary from "../../Assets/ImageGroup.png";
import ThirdBanner1 from "../../Components/ThirdBanner/ThirdBanner1";

const T1ThirdBanner = () => {
  const { store, setStore  } = useStore();
  const { previewMode,isEdit,fetchedFromBackend } = store;

  return (
    <ThirdBanner1 previewMode={previewMode} isEdit={isEdit} fetchedFromBackend={fetchedFromBackend} defaultBgImage={secondary} store={store} setStore={setStore}/> 
  );
};

export default T1ThirdBanner;

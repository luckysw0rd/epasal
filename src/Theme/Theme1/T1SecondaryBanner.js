import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useStore } from "./T1Context";
import SecondaryBanner1 from "../../Components/SecondaryBanner/SecondaryBanner1"; // Adjust the import if necessary
import secondary from "../../Assets/ImageGroup.png";

const T1SecondaryBanner = () => {
  const { store, setStore } = useStore();
  const { previewMode, secondaryBannerText } = store;
  const [bgImage, setBgImage] = useState(secondary);

  const onDropBackground = (acceptedFiles) => {
    const backgroundImage = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setBgImage(reader.result);
      setStore((prevState) => ({
        ...prevState,
        secondaryBanner: reader.result,
      }));
    };
    reader.readAsDataURL(backgroundImage);
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStore((prevState) => ({
      ...prevState,
      secondaryBannerText: {
        ...prevState.secondaryBannerText,
        [name]: value,
      },
    }));
  };

  const {
    getRootProps: getRootPropsBackground,
    getInputProps: getInputPropsBackground,
  } = useDropzone({ onDrop: onDropBackground });

  return (
    <SecondaryBanner1
      bgImage={bgImage}
      previewMode={previewMode}
      getRootPropsBackground={getRootPropsBackground}
      getInputPropsBackground={getInputPropsBackground}
      handleTextChange={handleTextChange}
    />
  );
};

export default T1SecondaryBanner;

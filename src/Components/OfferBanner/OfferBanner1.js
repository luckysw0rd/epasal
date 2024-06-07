import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useStore } from "../../Theme/Theme1/T1Context"; // Adjust the path as necessary

const OfferBanner1 = ({ previewMode, defaultBgImage }) => {
  const { store, setStore } = useStore();
  const { color, offerBannerText } = store;
  const [bgImage, setBgImage] = useState(store.offerBanner.offerBannerUrl);

  const onDropBackground = (acceptedFiles) => {
    const backgroundImage = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setBgImage(reader.result);
      setStore((prevState) => ({
        ...prevState,
        offerBanner:  {
          ...prevState.offerBanner,
          offerBannerUrl: reader.result
      }
,
      }));
    };
    reader.readAsDataURL(backgroundImage);
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStore((prevState) => ({
      ...prevState,
      offerBannerText: {
        ...prevState.offerBannerText,
        [name]: value,
      },
    }));
  };

  const {
    getRootProps: getRootPropsBackground,
    getInputProps: getInputPropsBackground,
  } = useDropzone({ onDrop: onDropBackground });

  return (
    <div className="box-border py-8 ">
      <motion.div
        className="box-border font-roboto relative shadow-lg min-h-[300px] sm:h-[350px] md:h-[350px] lg:min-h-[450px] flex flex-col sm:flex-col md:flex-row lg:flex-row justify-around items-center px-10 py-10 text-black  "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: color.offerBannerColor.backgroundThemeColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: previewMode ? 0.4 : 1,
        }}
      >
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 flex flex-col justify-between     sm:py-1 md:py-1 lg:py-1 font-Roboto ">
          <div
            className=" mx-auto mb-8 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0 md:mx-auto  "
            style={{
              backgroundColor: color.offerBannerColor.backgroundBoxThemeColor1,
            }}
          >
            {" "}
            <div
              className=" border-2   mx-4 my-4 p-4  py-4 text-center"
              style={{ borderColor: color.offerBannerColor.textColor }}
            >
              {previewMode ? (
                <>
                  <p
                    className="my-2 lg:my-4 text-base md:text-base lg:text-2xl font-normal"
                    style={{ color: color.offerBannerColor.textColor }}
                  >
                    {offerBannerText.para1 || "OUR NISCHE COLLECTION"}
                  </p>
                  <p
                    className="mt-2 lg:my-4  text-base md:text-2xl lg:text-4xl font-normal font-Sanchez"
                    style={{ color: color.offerBannerColor.textColor }}
                  >
                    {offerBannerText.para2 || "40% OFF"}
                  </p>
                  <p
                    className="mt-2  lg:my-4  text-base md:text-xl lg:text-3xl font-normal underline underline-offset-8  font-Sanchez"
                    style={{ color: color.offerBannerColor.textColor }}
                  >
                    {offerBannerText.para3 || "GET YOURS NOW"}
                  </p>
                </>
              ) : (
                <>
                  <textarea
                    name="para1"
                    value={offerBannerText?.para1 || ""}
                    onChange={handleTextChange}
                    className="mt-2 text-base md:text-2xl font-normal w-[90%] border border-gray-500"
                    style={{ color: color.offerBannerColor.textColor }}
                    placeholder="OUR NISCHE COLLECTION"
                  />
                  <textarea
                    name="para2"
                    value={offerBannerText?.para2 || ""}
                    onChange={handleTextChange}
                    className="mt-2 text-base md:text-2xl font-normal w-[90%] border border-gray-500"
                    style={{ color: color.offerBannerColor.textColor }}
                    placeholder="40% OFF"
                  />{" "}
                  <textarea
                    name="para3"
                    value={offerBannerText?.para3 || ""}
                    onChange={handleTextChange}
                    className="mt-2 text-base md:text-2xl font-normal w-[90%] border border-gray-500"
                    style={{ color: color.offerBannerColor.textColor }}
                    placeholder="GET YOURS NOW"
                  />{" "}
                </>
              )}
            </div>
          </div>
        </div>

        <input {...getInputPropsBackground()} />
        <div className="w-full sm:w-full md:w-3/4 lg:w-4/5 sm:pl-10">
          <img
            src={store.offerBanner.offerBannerUrl}
            alt="Product"
            className="w-full  sm:mb-0 sm:h-[300px] md:h-auto lg:h-[360px] lg:w-[740px] lg:pr-12 object-fit"
          />
        </div>

        {!previewMode && (
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <div
              className="inline-block bg-gray-100 h-10 rounded border-2 border-success px-6 pb-[6px] pt-2 p-auto text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none hover:bg-slate-400"
              {...getRootPropsBackground()}
            >
              Upload Image
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OfferBanner1;

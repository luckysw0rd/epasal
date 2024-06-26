import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useStore } from "../../Theme/Theme1/T1Context"; // Adjust the path as necessary

const OfferBanner1 = ({ previewMode,isEdit, defaultBgImage }) => {
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
        offerBanner: {
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
    <div className="box-border py-8 mb-16" style={{
      backgroundColor: color.offerBannerColor.backgroundThemeColor,}}>
      <motion.div
        className="box-border relative shadow-lg min-h-[300px] sm:h-[600px] md:h-[800px] lg:h-[400px] lg:min-h-[450px] flex flex-col sm:flex-col sm:space-y-5 lg:space-y-0  lg:flex-row md:justify-center items-center  space-x-0 lg:space-x-20 px-10  py-10 text-black  "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: color.offerBannerColor.backgroundThemeColor,
          fontFamily:store?.fonts?.Banner3,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: previewMode ? 0.4 : 1,
        }}
      >
        <div className="     text-center  md:w-full lg:w-[500px] xl:w-[800px]    flex flex-col justify-between       sm:py-1 md:py-1 lg:py-1 ">
          <div
            className=" mx-auto w-[300px] sm:w-[500px] md:w-[500px] lg:w-[450px]   xl:w-[500px] 2xl:w-[650px]    mb-8 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0 md:mx-auto  "
            style={{
              backgroundColor: color.offerBannerColor.backgroundBoxThemeColor1,
            }}
          >
            {" "}
            <div
              className=" border-2 md:h-[270px] lg:h-[200px] 2xl:h-[300px] flex flex-col justify-center items-center   mx-4 my-4 p-4  py-4 text-center"
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

        <div className=" ">
          <input {...getInputPropsBackground()} />
          <div className="w-full h-full ">
            <img
              src={store.offerBanner.offerBannerUrl}
              alt="Product"
              className="relative rounded-md  md:h-[400px]   w-[400px] sm:w-[600px] md:w-[800px] lg:w-[600px] lg:h-[300px] xl:w-[800px] xl:h-[380px] xl:pr-10 2xl:w-[800px] 2xl:h-[380px]  "
            />
          </div>
        </div>

        {(!previewMode) && (
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

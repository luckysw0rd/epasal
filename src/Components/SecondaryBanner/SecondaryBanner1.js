// import React from "react";
// import { motion } from "framer-motion";
// import { useStore } from "../../Theme/Theme1/T1Context"; // Adjust the path as necessary

// const SecondaryBanner1 = ({
//   bgImage,
//   previewMode,
//   getRootPropsBackground,
//   getInputPropsBackground,
//   handleTextChange,
// }) => {
//   const { store } = useStore();
//   const { color, secondaryBannerText } = store;

//   return (
//     <div className="box-border py-8">
//       <motion.div
//         className="box-border font-roboto relative shadow-lg min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[450px] flex flex-col sm:flex-col md:flex-row lg:flex-row justify-between items-center text-black"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         style={{
//           backgroundColor: color.secondaryBannerColor.backgroundThemeColor1,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           opacity: previewMode ? 0.4 : 1,
//         }}
//       >
//         <input {...getInputPropsBackground()} />
//         <div className="w-full sm:w-full md:w-1/2 lg:w-1/2">
//           <img
//             src={bgImage}
//             alt="Product"
//             className="w-full h-60 sm:h-[350px] md:h-[400px] lg:h-[400px] object-contain"
//           />
//         </div>
//         <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-start p-4 sm:py-1 md:py-1 lg:py-1 h-full font-Roboto">
//           {previewMode ? (
//             <>
//               <h2
//                 className="text-3xl lg:text-5xl xl:text-6xl font-bold"
//                 style={{ color: color.secondaryBannerColor.textColor }}
//               >
//                 {secondaryBannerText.heading || "Rekindle with class"}
//               </h2>
//               <p
//                 className="mt-2 text-base md:text-2xl font-normal"
//                 style={{ color: color.secondaryBannerColor.textColor }}
//               >
//                 {secondaryBannerText.paragraph ||
//                   "Step into a realm of refined allure with the latest masterpiece in beauty."}
//               </p>
//             </>
//           ) : (
//             <>
//               <input
//                 type="text"
//                 name="heading"
//                 value={secondaryBannerText?.heading || ""}
//                 onChange={handleTextChange}
//                 className="text-3xl lg:text-5xl xl:text-6xl font-bold mb-2 w-[90%] border border-gray-500"
//                 style={{ color: color.secondaryBannerColor.textColor }}
//                 placeholder="Rekindle with class"
//               />
//               <textarea
//                 name="paragraph"
//                 value={secondaryBannerText?.paragraph || ""}
//                 onChange={handleTextChange}
//                 className="mt-2 text-base md:text-2xl font-normal w-[90%] border border-gray-500"
//                 style={{ color: color.secondaryBannerColor.textColor }}
//                 placeholder="Step into a realm of refined allure with the latest masterpiece in beauty."
//               />
//             </>
//           )}
//           <button
//             className="mt-4 md:mt-4 lg:mt-12 inline-block h-12 rounded-lg border-2 border-success px-6 py-auto text-xs md:text-xs lg:text-base font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none hover:border-2"
//             style={{
//               color: color.secondaryBannerColor.buttonText,
//               backgroundColor: color.secondaryBannerColor.buttonColor,
//             }}
//           >
//             Explore More
//             <span className="text-lg ml-3 my-auto">&gt;</span>
//           </button>
//         </div>
//         {!previewMode && (
//           <div className="absolute top-0 left-0 mt-2 mr-2">
//             <div
//               className="inline-block bg-gray-100 h-10 rounded border-2 border-success px-6 pb-[6px] pt-2 p-auto text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none hover:bg-slate-400"
//               {...getRootPropsBackground()}
//             >
//               Upload Image
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default SecondaryBanner1;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useStore } from "../../Theme/Theme1/T1Context"; // Adjust the path as necessary
import { useImage } from "../../Hooks/useImage";
const SecondaryBanner1 = ({ previewMode,isEdit, defaultBgImage }) => {
  const { store, setStore } = useStore();
  const { color, secondaryBannerText } = store;
  const { uploadImage } = useImage();

  const onDropBackground = (acceptedFiles) => {
    const backgroundImage = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = async () => {

      setStore((prevState) => ({
        ...prevState,
        secondaryBanner: {
          ...prevState.secondaryBanner,
          secondaryBannerUrl: reader.result
        },

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
    })
    );
  };

  const {
    getRootProps: getRootPropsBackground,
    getInputProps: getInputPropsBackground,
  } = useDropzone({ onDrop: onDropBackground });

  useEffect(() => {
    console.log(store.secondaryBanner)
  }, [store])
  return (
    <div className="box-border py-8 relative mb-16" style={{
      backgroundColor: color.secondaryBannerColor.backgroundThemeColor1,}}>
      <motion.div
        className="box-border font-roboto  shadow-lg min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[400px] flex flex-col sm:flex-col md:flex-row lg:flex-row justify-between items-center text-black"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          
          fontFamily:store?.fonts?.Banner2,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: previewMode ? 0.4 : 1,
        }}
      >
        <input {...getInputPropsBackground()} />
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2">
          <img
            src={store.secondaryBanner.secondaryBannerUrl}
            alt="Product"
            className="w-full px-0  h-60 sm:h-[350px] md:h-[400px] lg:h-[400px] object-cover"
          />
        </div>
        <div className="w-full gap-y-5  pl-16  sm:w-full ml-4 md:w-1/2  lg:w-1/2 flex flex-col justify-center items-start md:py-4 py-4 sm:py-5  h-full ">
          {previewMode ? (
            < >
              <h2
                className="text-3xl lg:text-5xl xl:text-6xl font-bold"
                style={{ color: color.secondaryBannerColor.textColor }}
              >
                {secondaryBannerText.heading || "Rekindle with class"}
              </h2>
              <p
                className="mt-2 text-base md:text-2xl font-normal"
                style={{ color: color.secondaryBannerColor.textColor }}
              >
                {secondaryBannerText.paragraph ||
                  "Step into a realm of refined allure with the latest masterpiece in beauty."}
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                name="heading"
                value={secondaryBannerText?.heading || "Rekindle with class"}
                onChange={handleTextChange}
                className="text-3xl lg:text-5xl xl:text-6xl font-bold mb-2 w-[90%] border border-gray-500"
                style={{ color: color.secondaryBannerColor.textColor }}
                
              />
              <textarea
                name="paragraph"
                value={secondaryBannerText?.paragraph || ""}
                onChange={handleTextChange}
                className="mt-2 text-base md:text-2xl font-normal w-[90%] border border-gray-500"
                style={{ color: color.secondaryBannerColor.textColor }}
                placeholder="Step into a realm of refined allure with the latest masterpiece in beauty."
              />
            </>
          )}
          <button
            className="mt-4 md:mt-2 lg:mt-8 inline-block h-12 rounded-lg border-2 border-success px-6 py-auto text-xs md:text-xs lg:text-base font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none hover:border-2"
            style={{
              color: color.secondaryBannerColor.buttonText,
              backgroundColor: color.secondaryBannerColor.buttonColor,
            }}
          >
            Explore More
            <span className="text-lg ml-3 my-auto">&gt;</span>
          </button>
        </div>
        {(!previewMode) && (
          <div className="absolute top-0 left-0 mt-10 mr-2">
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

export default SecondaryBanner1;

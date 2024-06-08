import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import banner from "../../Assets/banner2.png"
const HeroSection1 = ({ previewMode,store,setStore }) => {

    const [bgImage, setBgImage] = useState(banner);
    const [logoImage, setLogoImage] = useState(null);
    const [heroText, setHeroText] = useState("Welcome to Our Store");

    const onDropBackground = acceptedFiles => {
        const backgroundImage = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setBgImage(reader.result);
            setStore(n=>({...n,banner:reader.result}))
        };
        reader.readAsDataURL(backgroundImage);
    };

    const onDropLogo = acceptedFiles => {
        const logoImageFile = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setLogoImage(reader.result);
            
        };
        reader.readAsDataURL(logoImageFile);
    };

    const { getRootProps: getRootPropsBackground, getInputProps: getInputPropsBackground } = useDropzone({ onDrop: onDropBackground });
    const { getRootProps: getRootPropsLogo, getInputProps: getInputPropsLogo } = useDropzone({ onDrop: onDropLogo });


    const handleTextChange = (e) => {
        setHeroText(e.target.value);
    };

    return (
        <div className='box-border py-19'>
            <motion.div
                className="bg-white h-full box-border font-kode-mono relative shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] min-h-[600px] flex flex-col justify-center items-start text-black"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    backgroundImage: `url(${banner})`,  //Currently using the imported banner cause of the missing context otherwise use store.banner
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.4,
                    width: '100%',
                }}
                {...(!previewMode && getRootPropsBackground())}
            >
                {!previewMode && <input {...getInputPropsBackground()} />}
                <div className='absolute left-8 top-1/4'>
                    {previewMode ? (
                        <h1 className="text-4xl font-bold text-white">{heroText}</h1>  //After updating the context use store.desc or the update store description text
                    ) : (
                        <input
                            type="text"
                            value={heroText}
                            onChange={handleTextChange}
                            className="bg-transparent border-b border-white focus:outline-none text-4xl font-bold text-white"
                        />
                    )}
                </div>
                {!previewMode && (

                    <div className='flex justify-center items-center w-full h-full'>
                        <div className="inline-block w-40 h-30 rounded border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none mt-4">
                            Upload Background
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default HeroSection1;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useStore } from './T1Context';
import secondary from '../../Assets/banner3.jpg';

const SecondaryBanner = () => {
    const { store, updateSecondaryBanner } = useStore();
    const { previewMode } = store;
    const [bgImage, setBgImage] = useState(secondary);

    const onDropBackground = (acceptedFiles) => {
        const backgroundImage = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setBgImage(reader.result);
            // Update the store context with the new banner image URL
            updateSecondaryBanner(reader.result);
        };
        reader.readAsDataURL(backgroundImage);
    };

    const { getRootProps: getRootPropsBackground, getInputProps: getInputPropsBackground } = useDropzone({ onDrop: onDropBackground });

    if (previewMode) {
        return (
            <div className='box-border md:px-5 py-8'>
                <motion.div
                    className="bg-white box-border font-kode-mono relative shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] min-h-[300px] flex flex-col justify-center items-start text-black"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        backgroundImage: `url(${bgImage || ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.4,
                        height: '200px', // Decrease the height of the banner
                    }}
                />
            </div>
        );
    } else {
        return (
            <div className='box-border md:px-5 py-8'>
                <motion.div
                    className="bg-white box-border font-kode-mono relative shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] min-h-[300px] flex flex-col justify-center items-start text-black"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        backgroundImage: `url(${bgImage || ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.4,
                        height: '200px', // Decrease the height of the banner
                    }}
                    {...getRootPropsBackground()}
                >
                    <input {...getInputPropsBackground()} />
                    <div className='flex justify-center items-center w-full h-full'>
                        <div className="inline-block w-40  bg-gray-300 h-30 rounded border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none hover:bg-slate-400">
                            Upload Image
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
};

export default SecondaryBanner;

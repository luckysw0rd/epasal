import React, { useContext, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import banner from "../../Assets/banner2.png";
import Bgpng from "../../Assets/Bgpng.jpg";
import { AuthContext } from '../../Hooks/AuthContext';

const HeroSection1 = ({ previewMode, store, setStore }) => {
    const auth = useContext(AuthContext);
    const [desktopBgImage, setDesktopBgImage] = useState(store?.banner?.bannerUrl);
    const [mobileBgImage, setMobileBgImage] = useState(store?.mobileBanner?.bannerUrl);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    useEffect(() => {
        if (!auth.token && !store.fetchedFromBackend) {
            toast.warning('Please Ensure you are logged in first, Changes will not be saved', {
                theme: "dark",
                autoClose: 10000,
                position: "top-center",
                pauseOnFocusLoss: false,
                pauseOnHover: false
            });
        }
    }, [auth.token, store.fetchedFromBackend]);

    const handleImageUpload = (acceptedFiles, setImage, bannerType) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result;
            setImage(imageUrl);
            setStore((prevState) => ({
                ...prevState,
                [bannerType]: {
                    ...prevState[bannerType],
                    bannerUrl: imageUrl,
                },
            }));
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps: getRootPropsBackground, getInputProps: getInputPropsBackground } = useDropzone({ onDrop: (files) => handleImageUpload(files, isMobile ? setMobileBgImage : setDesktopBgImage, isMobile ? 'mobileBanner' : 'banner') });
    const { getRootProps: getRootPropsDesktop, getInputProps: getInputPropsDesktop } = useDropzone({ onDrop: (files) => handleImageUpload(files, setDesktopBgImage, 'banner') });
    const { getRootProps: getRootPropsMobile, getInputProps: getInputPropsMobile } = useDropzone({ onDrop: (files) => handleImageUpload(files, setMobileBgImage, 'mobileBanner') });

    return (
        <div className='box-border py-19 mb-16'>
            <motion.div
                className="bg-white mt-0 box-border font-kode-mono relative shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] min-h-[600px] flex flex-col justify-center items-start text-black"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    backgroundImage: `url(${isMobile ? store?.mobileBanner?.bannerUrl : store?.banner?.bannerUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.4,
                    width: '100%',
                    height: '740px',
                }}
            >
                {!previewMode && <input {...getInputPropsBackground()} />}

                {!previewMode && (
                    <>
                        {!open ? (
                            <div className='flex justify-center items-center w-full h-full'>
                                <div
                                    onClick={() => setOpen(!open)}
                                    className="inline-block w-40 h-30 rounded border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none mt-4">
                                    Upload Background
                                </div>
                            </div>
                        ) : (
                            <div className='flex justify-center items-center w-full'>
                                <div className="relative p-5 font-Poppins px-5 md:px-0 w-full md:w-1/2 lg:w-1/3 bg-gray-100 flex-col ">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                        &times;
                                    </button>

                                    <div className="w-full mb-5 px-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">For Mobile</label>
                                        <div className="relative" {...getRootPropsMobile()}>
                                            <img src={store?.mobileBanner?.bannerUrl || Bgpng || store?.banner?.bannerUrl } className="border border-gray-300 rounded w-full h-40 object-contain mb-2" alt="Mobile Image" />
                                            <input {...getInputPropsMobile()} />
                                            <button className="mt-2 w-full py-2 bg-gray-500 text-white font-bold rounded">Upload Image</button>
                                        </div>
                                    </div>a

                                    <div className="w-full px-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">For Desktop/Laptop</label>
                                        <div className="w-full relative" {...getRootPropsDesktop()}>
                                            <img src={store?.banner?.bannerUrl || Bgpng || store?.mobileBanner?.bannerUrl} className="border border-gray-300 rounded w-full h-48 object-cover mb-2" alt="Desktop Image" />
                                            <input {...getInputPropsDesktop()} />
                                            <button className="mt-2 w-full py-2 bg-gray-500 text-white font-bold rounded">Upload Image</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default HeroSection1;

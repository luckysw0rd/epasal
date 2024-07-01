import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";


import { motion } from "framer-motion"
const Footer1 = ({
    logo,
    socialMediaLinks,
    footerDescription,
    color,
    previewMode,
    location: initialLocation,
    email: initialEmail,
    phoneNumber: initialPhoneNumber,
    setStore,
    store,
    isEdit
}) => {
    const { bgColor, textColor, linkColor, linkHeaderColor, btnBgColor, btnBgColorOnHover } = color.footerColor
    // const [location, setLocation] = useState(initialLocation || '');
    const [email, setEmail] = useState(initialEmail || '');
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
    const [newSocialMediaLinks, setNewSocialMediaLinks] = useState({ ...socialMediaLinks });

    const handleLocationChange = (e) => {
        // setLocation(e.target.value);
        setStore(prevState => ({ ...prevState, location: e.target.value }));
    };

    const handleEmailChange = (e) => {
        // setEmail(e.target.value);
        setStore(prevState => ({ ...prevState, email: e.target.value }));
    };

    const handlePhoneNumberChange = (e) => {
        // setPhoneNumber(e.target.value);
        setStore(prevState => ({ ...prevState, phoneNumber: e.target.value }));
    };

    const handleFacebookChange = (e) => {
        setNewSocialMediaLinks(prevLinks => ({ ...prevLinks, facebook: e.target.value }));
        setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, facebook: e.target.value } }));
    };

    const handleTwitterChange = (e) => {
        setNewSocialMediaLinks(prevLinks => ({ ...prevLinks, twitter: e.target.value }));
        setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, twitter: e.target.value } }));
    };

    const handleInstagramChange = (e) => {
        setNewSocialMediaLinks(prevLinks => ({ ...prevLinks, instagram: e.target.value }));
        setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, instagram: e.target.value } }));
    };

    const handleLinkedInChange = (e) => {
        setNewSocialMediaLinks(prevLinks => ({ ...prevLinks, linkedin: e.target.value }));
        setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, linkedin: e.target.value } }));
    };
    console.log(previewMode);
    if (!previewMode) {
        return (
            <footer style={{ backgroundColor: bgColor, color: textColor, fontFamily: store?.fonts?.Footer }} className="px-10 lg:px-16 py-10">
                <div className='flex flex-col md:flex-row gap-7 justify-between'>
                    <div className='flex flex-col justify-center gap-3 lg:w-1/3'>
                        <div className="flex flex-col">
                            <div style={{ color: textColor }} className="flex flex-row md:flex-col">
                                <div className='font-bold text-xl'>{store.name}</div>
                                {logo && <img src={logo.logoUrl} alt="Store Logo" className="hidden md:block h-12 w-12 my-4 mx-auto md:mx-0" />}
                            </div>
                        </div>
                        <div style={{ color: textColor }} className="flex flex-col text-base">
                            <p className="">{store.location}</p>
                            <p className=""> {store.email}</p>
                            <p className="">{store.phoneNumber}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
                            <div className="flex flex-col">
                                <p style={{ color: linkHeaderColor }} className="mb-2 font-bold text-base lg:text-lg text-center">Edit Contact:</p>

                                <div className='flex gap-4 items-center'>
                                    <FaLocationDot className="text-lg md:text-xl hover:text-red-500" />
                                    <input
                                        type="text"
                                        placeholder='Location'
                                        value={store.location}
                                        onChange={handleLocationChange}
                                        className="w-full py-1 px-2 mb-2 border border-gray-300 text-black rounded text-sm lg:text-base"
                                    />
                                </div>

                                <div className='flex gap-4 items-center'>
                                    <IoMail className="text-lg md:text-xl hover:text-orange-500" />
                                    <input
                                        type="email"
                                        placeholder='Email Address'
                                        value={store.email}
                                        onChange={handleEmailChange}
                                        className="w-full py-1 px-2 mb-2 border border-gray-300 text-black rounded text-sm lg:text-base"
                                    />
                                </div>

                                <div className='flex gap-4 items-center'>
                                    <FaPhoneAlt className="text-lg md:text-xl hover:text-blue-500" />
                                    <input
                                        type="tel"
                                        placeholder='Phone Number'
                                        value={store.phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        className="w-full py-1 px-2 mb-2 border border-gray-300 text-black rounded text-sm lg:text-base"
                                    />
                                </div>

                            </div>
                            <div className="flex flex-col justify-center mb-4 md:mb-0">
                                <p style={{ color: linkHeaderColor }} className="mb-2 font-bold text-base lg:text-lg text-center">Edit Social Links:</p>
                                <div>
                                    <div className='flex gap-4 items-center'>
                                        <FaFacebook className="text-lg md:text-xl hover:text-blue-500" />
                                        <input
                                            type="text"
                                            placeholder='Facebook'
                                            value={socialMediaLinks.facebook}
                                            onChange={handleFacebookChange}
                                            className="py-1 px-2 w-full mb-2 border border-gray-300 text-black rounded text-sm lg:text-base mr-2"
                                        />
                                    </div>
                                    <div className='flex gap-4 items-center'>
                                        <FaTwitter className="text-lg md:text-xl hover:text-blue-400" />
                                        <input
                                            type="text"
                                            placeholder='Facebook'
                                            value={socialMediaLinks.twitter}
                                            onChange={handleTwitterChange}
                                            className="w-full py-1 px-2 mb-2 border border-gray-300 text-black rounded text-sm lg:text-base mr-2"
                                        />
                                    </div>
                                    <div className='flex gap-4 items-center'>
                                        <FaInstagram className="text-lg md:text-xl hover:text-pink-500" />
                                        <input
                                            type="text"
                                            placeholder='Facebook'
                                            value={socialMediaLinks.instagram}
                                            onChange={handleInstagramChange}
                                            className="w-full py-1 px-2 mb-2 border border-gray-300 text-black rounded text-sm lg:text-base mr-2"
                                        />
                                    </div>
                                    <div className='flex gap-4 items-center'>
                                        <FaLinkedin className="text-lg md:text-xl hover:text-blue-600" />
                                        <input
                                            type="text"
                                            placeholder='Facebook'
                                            value={socialMediaLinks.linkedin}
                                            onChange={handleLinkedInChange}
                                            className="w-full py-1 px-2 mb-2 border border-gray-300 text-black rounded text-sm lg:text-base mr-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </footer >
        );
    } else {
        return (
            <footer style={{ backgroundColor: bgColor, color: textColor, fontFamily: store?.fonts?.Footer }} className="lg:px-16 md:px-8  px-1 pt-14 pb-4">
                <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 justify-center px-4 gap-10 md:gap-14 lg:gap-32 ">
                    <div className="mb-4">
                        <span className='font-bold text-lg lg:text-xl'>{store.name}</span>
                        {logo && <img src={logo.logoUrl} alt="Store Logo" className="h-12 w-auto my-2 lg:my-4" />}
                        <div className="flex my-5 gap-2 lg:gap-4">
                            <>
                                <a href={newSocialMediaLinks.facebook}>
                                    <FaFacebook className="text-lg md:text-xl hover:text-blue-500" />
                                </a>
                                <a href={newSocialMediaLinks.twitter}>
                                    <FaTwitter className="text-lg md:text-xl hover:text-blue-400" />
                                </a>
                                <a href={newSocialMediaLinks.instagram}>
                                    <FaInstagram className="text-lg md:text-xl hover:text-pink-500" />
                                </a>
                                <a href={newSocialMediaLinks.linkedin}>
                                    <FaLinkedin className="text-lg md:text-xl hover:text-blue-600" />
                                </a>
                            </>
                        </div>
                        <div style={{ color: textColor }} className="flex gap-1 flex-col text-xs lg:text-base">
                            <p className="">{store.location}</p>
                            <p className=""> {store.email}</p>
                            <p className="">{store.phoneNumber}</p>
                        </div>
                    </div>


                    {/* QUICK LINKS  */}
                    <div className='text-xs lg:text-sm flex flex-col gap-3 '>
                        <p style={{ color: linkHeaderColor }} className="font-bold text-sm lg:text-lg">Products</p>
                        <div style={{ color: linkColor }} className="flex flex-col items-start gap-2">
                            <Link to="" className=" sm:transition-colors duration-300">All Products</Link>
                            <Link to="/" className=" transition-colors duration-300">Featured</Link>
                            {/* <Link to="/" className=" transition-colors duration-300">Perfumes</Link>
                            <Link to="/" className=" transition-colors duration-300">Skin Care</Link>
                            <Link to="/" className=" transition-colors duration-300">Others</Link> */}
                        </div>
                    </div>
                    <div className='text-xs lg:text-sm flex flex-col gap-3 '>
                        <p style={{ color: linkHeaderColor }} className="font-bold text-sm lg:text-lg">Support</p>
                        <div style={{ color: linkColor }} className="flex flex-col items-start gap-2">
                            <Link to="/" className=" sm:transition-colors duration-300">Contact Us</Link>
                            <Link to="/" className=" transition-colors duration-300">FAQs</Link>
                            <Link to="/" className=" transition-colors duration-300">Downloads</Link>
                        </div>
                    </div>
                    <div className='text-xs lg:text-sm flex flex-col gap-3 '>
                        <p style={{ color: linkHeaderColor }} className="font-bold text-sm lg:text-lg">Quick Links</p>
                        <div style={{ color: linkColor }} className="flex flex-col items-start gap-2">
                            <Link to="/" className=" sm:transition-colors duration-300">Cookie Policy</Link>
                            <Link to="/" className=" transition-colors duration-300">Private Policy</Link>
                            <Link to="/" className=" transition-colors duration-300">Terms and Condition</Link>
                            <Link to="/" className=" transition-colors duration-300">Ordering and Payment</Link>
                        </div>
                    </div>


                </div>
                <div className='w-full flex justify-center text-lg mt-16'>
                    <p>
                        &copy; Brought To You By <a href="/" target="_blank" className=" underline hover:text-orange-200">Shop At Banau</a>, By <a href="https://www.saikanepal.com" target="_blank" className=" underline hover:text-blue-300">Saika Nepal</a> @ {new Date().getFullYear()}
                    </p>
                </div>
            </footer >
        );
    }
};

export default Footer1;


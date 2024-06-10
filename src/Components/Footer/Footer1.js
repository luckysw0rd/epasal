import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
    store
}) => {
    const { bgColor, textColor, linkColor, linkHeaderColor, btnBgColor, btnBgColorOnHover } = color.footerColor
    const [location, setLocation] = useState(initialLocation || '');
    const [email, setEmail] = useState(initialEmail || '');
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
    const [newSocialMediaLinks, setNewSocialMediaLinks] = useState({ ...socialMediaLinks });

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        setStore(prevState => ({ ...prevState, location: e.target.value }));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setStore(prevState => ({ ...prevState, email: e.target.value }));
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
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
            <footer style={{ backgroundColor: bgColor }} className="px-7 pt-14 pb-4 mt-20">
                <div className="container mx-auto flex flex-col md:flex-row px-4 gap-16">
                    <div style={{ color: textColor }} className="md:w-1/3 mb-4 md:mb-0">
                        <span className='font-bold text-2xl'>{store.name}</span>
                        {logo && <img src={logo.logoUrl} alt="Store Logo" className="h-12 w-auto my-4 mx-auto md:mx-0" />}
                    </div>
                    <div className="flex flex-col md:flex-row gap-10 w-full">
                        <div className="flex flex-col w-1/2">
                            <p className="mb-2 font-bold text-lg text-center">Edit Contact:</p>
                            <input
                                type="text"
                                placeholder='Location'
                                value={location}
                                onChange={handleLocationChange}
                                className="py-1 px-2 mb-2 border border-gray-300 text-black rounded"
                            />
                            <input
                                type="email"
                                placeholder='Email Address'
                                value={email}
                                onChange={handleEmailChange}
                                className="py-1 px-2 mb-2 border border-gray-300 text-black rounded"
                            />
                            <input
                                type="tel"
                                placeholder='Phone Number'
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                className="py-1 px-2 mb-2 border border-gray-300 text-black rounded"
                            />
                        </div>
                        <div className="flex flex-col justify-center mb-4 md:mb-0 w-1/2">
                            <p className="mb-2 font-bold text-lg text-center">Edit Social Links:</p>
                            <>
                                <input
                                    type="text"
                                    placeholder='Facebook'
                                    value={socialMediaLinks.facebook}
                                    onChange={handleFacebookChange}
                                    className="py-1 px-2 mb-2 border border-gray-300 text-black rounded mr-2"
                                />
                                <input
                                    type="text"
                                    placeholder='Facebook'
                                    value={socialMediaLinks.twitter}
                                    onChange={handleTwitterChange}
                                    className="py-1 px-2 mb-2 border border-gray-300 text-black rounded mr-2"
                                />
                                <input
                                    type="text"
                                    placeholder='Facebook'
                                    value={socialMediaLinks.instagram}
                                    onChange={handleInstagramChange}
                                    className="py-1 px-2 mb-2 border border-gray-300 text-black rounded mr-2"
                                />
                                <input
                                    type="text"
                                    placeholder='Facebook'
                                    value={socialMediaLinks.linkedin}
                                    onChange={handleLinkedInChange}
                                    className="py-1 px-2 mb-2 border border-gray-300 text-black rounded mr-2"
                                />

                            </>
                        </div>
                    </div>
                </div>

                {/* <div className="text-center mt-10">
                    <motion.button
                        whileHover={{ backgroundColor: btnBgColorOnHover }} style={{ backgroundColor: btnBgColor }} className="py-2 px-4 border border-gray-300 text-white rounded-sm">
                        Save Changes
                    </motion.button>
                </div> */}
            </footer>
        );
    } else {
        return (
            <footer style={{ backgroundColor: bgColor, color: textColor }} className="md:px-16 px-1 pt-14 pb-4 mt-20">
                <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 justify-center px-4 gap-10 md:gap-14 lg:gap-32 ">
                    <div className="mb-4">
                        <span className='font-bold text-lg md:text-xl'>{store.name}</span>
                        {logo && <img src={logo.logoUrl} alt="Store Logo" className="h-12 w-auto my-4" />}
                        <div className="flex my-5 gap-2 md:gap-4">
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
                        <div style={{ color: textColor }} className="flex flex-col text-sm md:text-base">
                            <p className="">{location}</p>
                            <p className=""> {email}</p>
                            <p className="">{phoneNumber}</p>
                        </div>
                    </div>


                    {/* QUICK LINKS  */}
                    <div className='text-sm flex flex-col gap-3 '>
                        <p style={{ color: linkHeaderColor }} className="font-bold text-sm md:text-lg">Products</p>
                        <div style={{ color: linkColor }} className="flex flex-col items-start gap-2">
                            <Link to="/" className=" sm:transition-colors duration-300">All Products</Link>
                            <Link to="/" className=" transition-colors duration-300">Featured</Link>
                            <Link to="/" className=" transition-colors duration-300">Perfumes</Link>
                            <Link to="/" className=" transition-colors duration-300">Skin Care</Link>
                            <Link to="/" className=" transition-colors duration-300">Others</Link>
                        </div>
                    </div>
                    <div className='text-sm flex flex-col gap-3 '>
                        <p style={{ color: linkHeaderColor }} className="font-bold text-sm md:text-lg">Support</p>
                        <div style={{ color: linkColor }} className="flex flex-col items-start gap-2">
                            <Link to="/" className=" sm:transition-colors duration-300">Contact Us</Link>
                            <Link to="/" className=" transition-colors duration-300">FAQs</Link>
                            <Link to="/" className=" transition-colors duration-300">Downloads</Link>
                        </div>
                    </div>
                    <div className='text-sm flex flex-col gap-3 '>
                        <p style={{ color: linkHeaderColor }} className="font-bold text-sm md:text-lg">Quick Links</p>
                        <div style={{ color: linkColor }} className="flex flex-col items-start gap-2">
                            <Link to="/" className=" sm:transition-colors duration-300">Cookie Policy</Link>
                            <Link to="/" className=" transition-colors duration-300">Private Policy</Link>
                            <Link to="/" className=" transition-colors duration-300">Terms and Condition</Link>
                            <Link to="/" className=" transition-colors duration-300">Ordering and Payment</Link>
                        </div>
                    </div><div className='text-sm flex flex-col gap-3 '>
                        <p style={{ color: linkHeaderColor }} className="font-bold text-sm md:text-lg">Quick Links</p>
                        <div style={{ color: linkColor }} className="flex flex-col items-start gap-2">
                            <Link to="/" className=" sm:transition-colors duration-300">Cookie Policy</Link>
                            <Link to="/" className=" transition-colors duration-300">Private Policy</Link>
                            <Link to="/" className=" transition-colors duration-300">Terms and Condition</Link>
                            <Link to="/" className=" transition-colors duration-300">Ordering and Payment</Link>
                        </div>
                    </div>

                    {/* <div className="text-center mt-4 md:mt-0">
                        <div className="flex items-center gap-2">
                            <motion.input
                                type="email"
                                placeholder="Enter your email"
                                className="p-2 border bg-transparent border-gray-300 placeholder:text-white rounded-sm focus:outline-none"
                            />
                            <motion.button whileHover={{ backgroundColor: btnBgColorOnHover }} style={{ backgroundColor: btnBgColor }} className="py-2 px-4 border border-gray-300 text-white rounded-sm">
                                Subscribe
                            </motion.button>
                        </div>
                        <p className="text-sm mt-4">{footerDescription}</p>
                    </div> */}
                </div>
                <div className='w-full flex justify-center text-sm mt-16'>
                    <p>&copy;Copyright {new Date().getFullYear()}</p>
                </div>

            </footer >
        );
    }
};

export default Footer1;


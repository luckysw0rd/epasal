import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

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

    if (!previewMode) {
        return (
            <footer style={{ backgroundColor: color.footerColor.background, color: color.footerColor.textColor }} className="py-8">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        {logo.logoUrl && <img src={logo.logoUrl} alt="Store logo" className="h-12 w-auto mb-2" />}
                        <p className="mt-2 text-center">Contact us:</p>
                        <div className="flex flex-col">
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
                    </div>

                    <div className="flex justify-center mb-4 md:mb-0">
                        <>
                            <input
                                type="text"
                                placeholder='Facebook'
                                value={newSocialMediaLinks.facebook}
                                onChange={handleFacebookChange}
                                className="py-1 px-2 mb-2 border border-gray-300 text-black rounded mr-2"
                            />
                            <input
                                type="text"
                                placeholder='Twitter'
                                value={newSocialMediaLinks.twitter}
                                onChange={handleTwitterChange}
                                className="py-1 px-2 mb-2 border border-gray-300 rounded mr-2"
                            />
                            <input
                                type="text"
                                placeholder='Instagram'
                                value={newSocialMediaLinks.instagram}
                                onChange={handleInstagramChange}
                                className="py-1 px-2 mb-2 border border-gray-300 rounded mr-2"
                            />
                            <input
                                type="text"
                                placeholder='Linked In'
                                value={newSocialMediaLinks.linkedin}
                                onChange={handleLinkedInChange}
                                className="py-1 px-2 mb-2 border border-gray-300 rounded mr-2"
                            />
                        </>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <input
                        type="text"
                        value={footerDescription}
                        onChange={(e) => setStore(prevState => ({ ...prevState, footerDescription: e.target.value }))}
                        className="py-1 px-2 mb-2 border border-gray-300 rounded"
                    />
                </div>
            </footer>
        );
    } else {
        return (
            <footer style={{ backgroundColor: color.footerColor.background, color: color.footerColor.textColor }} className="py-8 mt-20">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                        {store.name}
                        {logo.logoUrl && <img src={logo.logoUrl} alt="Store logo.logoUrl" className="h-12 w-auto mb-2 mx-auto md:mx-0" />}
                        <p className="mt-2 text-center md:text-left">Contact us:</p>
                        <div className="mt-2 text-center md:text-left">
                            <p className="text-sm"><strong>Location:</strong> {location}</p>
                            <p className="text-sm"><strong>Email:</strong> {email}</p>
                            <p className="text-sm"><strong>Phone:</strong> {phoneNumber}</p>
                        </div>
                    </div>

                    <div className="flex justify-center md:w-1/3 mb-4 md:mb-0">
                        <>
                            <a href={newSocialMediaLinks.facebook} className="mr-4">
                                <FaFacebook className="text-2xl hover:text-blue-500" />
                            </a>
                            <a href={newSocialMediaLinks.twitter} className="mr-4">
                                <FaTwitter className="text-2xl hover:text-blue-400" />
                            </a>
                            <a href={newSocialMediaLinks.instagram} className="mr-4">
                                <FaInstagram className="text-2xl hover:text-pink-500" />
                            </a>
                            <a href={newSocialMediaLinks.linkedin} className="mr-4">
                                <FaLinkedin className="text-2xl hover:text-blue-600" />
                            </a>
                        </>
                    </div>

                    <div className="md:w-1/3 text-center mt-4 md:mt-0">
                        <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
                        <p className="mt-2">{footerDescription}</p>
                    </div>
                </div>
            </footer>
        );
    }
};

export default Footer1;

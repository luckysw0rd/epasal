import React from 'react';
import Footer1 from './Footer1';


const Footer = ({ footerProps, footerType }) => {
    const renderFooter = () => {
        switch (footerType) {
            case 'Footer1':
                return <Footer1 {...footerProps} />;
            // case 'Footer2':
            //     return <Footer2 {...footerProps} />;
            // case 'Footer3':
            //     return <Footer3 {...footerProps} />;
            default:
                return null;
        }
    };

    return <>{renderFooter()}</>;
};

export default Footer;

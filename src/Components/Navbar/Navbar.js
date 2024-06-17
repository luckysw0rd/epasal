import React from 'react';
import Navbar1 from './Navbar1';
// import Navbar2 from './Navbar2';
// import Navbar3 from './Navbar3';

const Navbar = ({ navbarProps, navbarType }) => {
    const renderNavbar = () => {
        switch (navbarType) {
            case 'Navbar1':
                return <Navbar1 {...navbarProps} />;
            // case 'Navbar2':
            //     return <Navbar2 {...navbarProps} />;
            // case 'Navbar3':
            //     return <Navbar3 {...navbarProps} />;
            default:
                return null;
        }
    };
    return <>{renderNavbar()}</>;
};

export default Navbar;

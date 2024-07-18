import React from 'react';

const Header1 = ({ color, text }) => {
    
    return (
        <div
            className="font-sans w-full h-8 flex justify-center items-center"
            style={{ backgroundColor: color.headerColor.headerBackground }}
        >
            <h1 className="font-Cinzel text-sm" style={{ color: color.headerColor.headerText }}>{text}</h1>
        </div>
    );
};

export default Header1;

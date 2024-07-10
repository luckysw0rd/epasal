import React, { useState } from 'react';

const Tooltip = ({ message, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <span className="relative flex items-center">
            <span
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
                className="cursor-pointer text-blue-500 ml-1"
            >
                {children}
            </span>
            {isVisible && (
                <div className="absolute left-5 mt-2 w-40 p-2 bg-gray-700 text-white text-xs rounded shadow-lg">
                    {message}
                </div>
            )}
        </span>
    );
};

export default Tooltip;

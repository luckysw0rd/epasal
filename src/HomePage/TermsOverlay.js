import React from 'react';

const TermsOverlay = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0   text-black left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
                <p className="text-sm mb-4">
                    Insert your Terms and Conditions content here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <button className="bg-[#FF7C1D] text-white px-4 py-2 rounded-lg hover:bg-[#FFA06D]" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TermsOverlay;

import React, { useState, useEffect } from 'react';
import { useStore } from './T1Context';

const ColorPicker = () => {
    const { store, setStore } = useStore();
    const { color } = store;
    const { fetchedFromBackend } = store;
    const { previewMode } = store;
    const [showColorPicker, setShowColorPicker] = useState(false);
    const handleColorChange = (value, field, colorValueObject) => {
        setStore((prevState) => ({
            ...prevState,
            color: {
                ...prevState.color,
                [colorValueObject]: {
                    ...prevState.color[colorValueObject],
                    [field]: value,
                },
            },
        }));
    };

    const handleHexCodeChange = (e, field) => {
        const hexCode = e.target.value;
        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode)) {
            handleColorChange(hexCode, field);
        }
    };

    const handleSingleColorChange = (e, field) => {
        const newValue = e.target.value;
        setStore((prevState) => ({
            ...prevState,
            color: {
                ...prevState.color,
                [field]: newValue,
            },
        }));
    };

    // Function to toggle preview mode
    const togglePreviewMode = () => {
        setStore((prevState) => ({
            ...prevState,
            previewMode: !prevState.previewMode, // Toggle the value of previewMode
        }));
    };

    // Function to toggle color picker visibility
    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    if (fetchedFromBackend) {
        return null;
    }
    else
        return (
            <div className={`fixed ${showColorPicker ? 'w-0 ' : 'w-0'} right-28 top-40  md:top-40  md:right-10 border bg-transparent rounded-md shadow-l z-10 `}>
                <button onClick={toggleColorPicker} className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center focus:outline-none ">
                </button>

                {showColorPicker && (
                    <div className="relative w-60 right-60 bg-[#EEEDEB] p-4 border border-gray-300 rounded-md shadow-lg z-10 h-80 overflow-y-auto">
                        <div className="flex flex-col gap-4">
                            {Object.entries(color).map(([colorKey, colorValue], index) => {
                                if (typeof colorValue === 'object') {
                                    return (
                                        <div key={index}>
                                            <h4 className="text-lg font-semibold mb-2">{colorKey}</h4>
                                            {Object.entries(colorValue).map(([nestedKey, nestedValue], nestedIndex) => (
                                                <div key={nestedIndex} className="flex flex-col justify-start items-start">
                                                    <label className="text-gray-700 w-24">{nestedKey}</label>
                                                    <div className="flex mt-2 md:flex-row items-center justify-center flex-grow ml-4">
                                                        <input
                                                            type="color"
                                                            value={nestedValue}
                                                            onChange={(e) => handleColorChange(e.target.value, nestedKey, colorKey)}
                                                            className="  rounded-full px-1 border border-gray-300 shadow-md focus:outline-none"
                                                        />

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="flex flex-col items-start">
                                            <label className="text-gray-700 w-24">{colorKey}</label>
                                            <div className="flex items-center flex-grow ml-4">
                                                <input
                                                    type="color"
                                                    value={colorValue}
                                                    onChange={(e) => handleSingleColorChange(e, colorKey)}
                                                    className="rounded-full px-1 border border-gray-300 shadow-md focus:outline-none"
                                                />

                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                )}

                <button onClick={togglePreviewMode} className="absolute bottom-0 right-1 w-20 h-8 rounded bg-blue-500 text-white focus:outline-none">
                    {previewMode ? 'Edit' : 'Preview'}
                </button>
            </div>
        );
};

export default ColorPicker;

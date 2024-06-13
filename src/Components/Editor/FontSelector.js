import React from "react";
import { useStore } from "../../Theme/Theme1/T1Context";

const FontSelector = ({ section }) => {
    const { store, updateFont } = useStore();
    const fonts = [
        "Anta", "VT323", "Kode Mono", "Sixtyfour", "Oleo Script", "Mansalva",
        "Genos", "Orbitron", "Cinzel", "Exo 2", "Roboto", "Sanchez", "DM Serif Text"
    ];

    const handleFontChange =  async(event) => {
        const newFont = event.target.value;
        await updateFont(section, newFont);
    };

    return (
        <div className="flex flex-col my-3">
            <label htmlFor={`${section}-font`}>{section} Font:</label>
            <select
                id={`${section}-font`}
                value={store?.fonts[section] || ""}
                onChange={handleFontChange}
            >
                {fonts.map((font, index) => (
                    <option key={index} value={font}>
                        {font}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FontSelector;

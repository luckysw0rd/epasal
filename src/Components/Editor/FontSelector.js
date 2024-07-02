import React from "react";
import { useStore } from "../../Theme/Theme1/T1Context";

const FontSelector = ({ section }) => {
    const { store, updateFont } = useStore();
    const fonts = [

        "Anta","Saira", "VT323", "Kode Mono","Open Sans", "Open Sans","Sixtyfour", "Oleo Script", "Mansalva","Inter"
        ,"Genos", "Orbitron", "Cinzel", "Exo 2", "Roboto", "Sanchez", "DM Serif Text","Zen Tokyo Zoo","Poppins",,,"Plus Jakarta Sans","Source Serif 4", "Mohave","Asap"
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

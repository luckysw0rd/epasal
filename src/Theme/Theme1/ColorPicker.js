// import React, { useState, useEffect } from 'react';
// import { useStore } from './T1Context';

// const ColorPicker = () => {
//     const { store, setStore } = useStore();
    

//     // Function to toggle preview mode
//     const togglePreviewMode = () => {
//         setStore((prevState) => ({
//             ...prevState,
//             previewMode: !prevState.previewMode, // Toggle the value of previewMode
//         }));
//     };

//     // Function to toggle color picker visibility
//     const toggleColorPicker = () => {
//         setShowColorPicker(!showColorPicker);
//     };

//     if (fetchedFromBackend){
//         return null;
//     }
//     else
//     return (
//         <div className={`fixed ${showColorPicker ?  'w-0 ' : 'w-0'} right-28 mt-20 top-0  md:top-0  md:right-10 border bg-transparent rounded-md shadow-l z-10 `}>
//             <button onClick={toggleColorPicker} className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center focus:outline-none ">
//             </button>
//             <button onClick={togglePreviewMode} className="absolute bottom-0 right-1 w-20 h-8 rounded bg-blue-500 text-white focus:outline-none">
//                 {previewMode ? 'Edit' : 'Preview'}
//             </button>
//             {/* {showColorPicker && (
                
//             )} */}

            
//         </div>
//     );
// };

// export default ColorPicker;

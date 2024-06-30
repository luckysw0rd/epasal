import React from 'react'
import { FaPlay } from "react-icons/fa";


const BanauTheme = () => {
    return (

        <div className="p-8 md:p-4 lg:p-8">
            <div className="flex gap-5 lg:gap-10 p-8 lg:p-16 bg-gray-800 rounded-lg text-white">
                <div className="flex flex-col gap-5 lg:gap-10">
                    <h1 className="text-2xl lg:text-3xl font-bold">Banau <span className="text-blue-400">Themes</span></h1>
                    <p className="md:text-xs lg:text-base mt-2">
                        "Transform your online store with Banau's stunning skins, featuring customizable design cards and banners—some free, some premium!"
                    </p>
                    <button className="text-xs lg:text-base mt-5 lg:mt-10 w-1/2 md:w-[90%] lg:w-2/3 bg-gray-700 border border-white text-white py-2 px-2 lg:px-3 rounded-lg flex justify-center items-center gap-3 md:gap-1 lg:gap-3">
                        Watch Video
                        <FaPlay />
                    </button>
                </div>
                <div className='hidden md:flex '>
                    <div className="flex items-center h-80 lg:h-96 space-x-4">
                        <div className="w-[130px] lg:w-[200px] md:h-[302px] lg:h-[382px] rounded-xl bg-purple-200 flex items-center justify-center ">
                            <span className="text-sm lg:text-base text-gray-800">Lavender</span>
                        </div>
                        <div className="w-[130px] lg:w-[200px] md:h-[224px] lg:h-[304px] rounded-xl bg-yellow-200 flex items-center justify-center ">
                            <span className="text-sm lg:text-base text-gray-800">Wheat Yellow</span>
                        </div>
                        <div className="w-[130px] lg:w-[200px] md:h-[150px] lg:h-[230px] rounded-xl bg-gray-200 flex items-center justify-center ">
                            <span className="text-sm lg:text-base text-gray-800">Ash Beige</span>
                        </div>
                        <div className="w-[130px] lg:w-[200px] md:h-[302px] lg:h-[382px] rounded-xl bg-blue-200 flex items-center justify-center ">
                            <span className="text-sm lg:text-base text-gray-800">Fresh Blue</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BanauTheme

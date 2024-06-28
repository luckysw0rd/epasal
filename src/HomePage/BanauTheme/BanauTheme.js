import React from 'react'

const BanauTheme = () => {
    return (

        <div className="p-5">
            <div className="flex gap-10 p-16 bg-gray-800 rounded-lg text-white">
                <div className="flex flex-col gap-10">
                    <h1 className="text-3xl font-bold">Banau <span className="text-blue-400">Themes</span></h1>
                    <p className="mt-2">
                        "Transform your online store with Banau's stunning skins, featuring customizable design cards and banners—some free, some premium!"
                    </p>
                    <button className="mt-10 w-1/2 bg-gray-700 text-white py-1 px-3 rounded">Watch Video</button>
                </div>
                <div className='flex '>
                    <div className="flex items-center h-96 space-x-4">
                        <div className="w-[200px] h-[382px] rounded-xl bg-purple-200 flex items-center justify-center ">
                            <span className="text-gray-800">Lavender</span>
                        </div>
                        <div className="w-[200px] h-[304px] rounded-xl bg-yellow-200 flex items-center justify-center ">
                            <span className="text-gray-800">Wheat Yellow</span>
                        </div>
                        <div className="w-[200px] h-[230px] rounded-xl bg-gray-200 flex items-center justify-center ">
                            <span className="text-gray-800">Ash Beige</span>
                        </div>
                        <div className="w-[200px] h-[382px] rounded-xl bg-blue-200 flex items-center justify-center ">
                            <span className="text-gray-800">Fresh Blue</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BanauTheme

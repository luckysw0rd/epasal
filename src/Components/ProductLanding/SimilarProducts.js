import React from 'react'

const SimilarProducts = () => {
    const displayedImage = "https://cms.cloudinary.vpsvc.com/image/upload/v1675872460/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile004_en-us.png"
    return (
        <div className="w-1/3 p-5 bg-gray-50 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <img src={displayedImage} className="w-[350px] h-[400px] object-contain mx-auto " style={{ aspectRatio: '1/1' }} />
            <img src={displayedImage} className="w-[350px] h-[400px] object-contain mx-auto" style={{ aspectRatio: '1/1' }} />
            <img src={displayedImage} className="w-[350px] h-[400px] object-contain mx-auto" style={{ aspectRatio: '1/1' }} />
        </div>
    )
}

export default SimilarProducts

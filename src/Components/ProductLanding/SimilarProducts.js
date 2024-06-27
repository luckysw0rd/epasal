import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/16/solid';

const SimilarProducts = ({ store, onProductSelect, product: currentProduct, handleImage }) => {
    const handleProductClick = (product) => {
        onProductSelect(product);
        handleImage(product);
    };
    const similarProducts = store.products.filter(product => product._id !== currentProduct._id).slice(0, 3)

    return (
        <div >
            <h1 className='text-sm lg:text-lg font-semibold'>Similar Products</h1>
            {similarProducts.map((product) => (
                <div onClick={() => handleProductClick(product)} className="flex flex-col items-center md:items-start mb-10" >
                    <img src={product.image.imageUrl} className="w-[200px] h-[200px] lg:-[300px] lg:h-[300px] object-contain mb-5 mx-auto " style={{ aspectRatio: '1/1' }} />
                    <h1 className='text-lg text-[#4F3100] font-bold'>{product.name}</h1>
                    <div className='flex my-2'>
                        {[...Array(5)].map((option, index) => {
                            if (index < product.rating)
                                return <StarIcon className='w-4 h-4 text-[#8B5A08]' />
                            else
                                return <StarIcon className='w-4 h-4 text-[#959595]' />
                        })}
                    </div>
                    <div className='border-b border-gray-300 mt-2'></div>
                </div>
            ))
            }
        </div >
    )
}

export default SimilarProducts

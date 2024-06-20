import React from 'react'
import { StarIcon } from '@heroicons/react/16/solid';
import { useStore } from '../../Theme/Theme1/T1Context';


const SimilarProducts = () => {
    const { store } = useStore()
    const { products } = store
    return (
        <div >
            <h1 className='text-sm lg:text-lg font-semibold'>Similar Products</h1>
            {products.slice(0, 3).map((product) => (
                <div className="flex flex-col items-center md:items-start mb-10" >
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
            ))}
        </div>
    )
}

export default SimilarProducts

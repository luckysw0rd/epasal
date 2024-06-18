import React from 'react';
import { StarIcon } from '@heroicons/react/16/solid';

const ProductReview = () => {
    const count = 3
    return (
        <div className='w-2/3 bg-gray-50 rounded-sm shadow-[5px_5px_5px_rgba(0,0,0,0.2)] p-5'>
            <div className=" flex gap-10 bg-white">
                <div className='flex flex-col items-center gap-5 border border-orange-600 py-7 px-10'>
                    <div className="text-center">
                        <div className="text-4xl font-bold">4.5</div>
                        <div className="text-lg text-[#8B5A08]">Excellent</div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center">
                            <div className='flex mb-2 justify-center md:justify-start'>
                                {[...Array(5)].map((option, index) => {
                                    if (index < count)
                                        return <StarIcon className='w-8 h-8 text-[#8B5A08]' />
                                    else
                                        return <StarIcon className='w-8 h-8 text-[#959595]' />
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-600">Number of reviews</div>
                </div>
                <div className='border border-orange-600 p-5 px-10 w-full'>
                    <div className="flex flex-col justify-between">
                        {[5, 4, 3, 2, 1].map((rating, index) => (
                            <div key={index} className="flex gap-16 items-center">
                                <div className='flex mb-2 items-center'>
                                    {[...Array(5)].map((option, index) => {
                                        if (index < rating)
                                            return <StarIcon className='w-6 h-6 text-[#8B5A08]' />
                                        else
                                            return <StarIcon className='w-6 h-6 text-[#959595]' />
                                    })}
                                </div>
                                <div className='flex gap-6 items-center'>
                                    <div className="w-64 h-2 bg-[#8C5A09] rounded-full">
                                        <div
                                            className={`h-2 rounded-full bg-[#F29C0F]`}
                                            style={{
                                                width: `${rating === 5 ? 60 : rating === 4 ? 45 : rating === 3 ? 38 : 20}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <span>{rating === 5 ? 24 : rating === 4 ? 18 : rating === 3 ? 15 : 5}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="mt-8">
                    <div className="flex items-center">
                        <span className="text-lg font-semibold mr-2">D</span>
                        <span className="text-gray-800 font-medium">Dolma</span>
                        <div className="ml-auto text-yellow-500">
                            {Array(5).fill('').map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.971a1 1 0 00.95.69h4.18c.969 0 1.372 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.971c.3.92-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.198-1.539-1.118l1.286-3.971a1 1 0 00-.364-1.118L2.454 9.4c-.784-.57-.381-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.049 2.927z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2 text-gray-600">
                        It turned out to be better than I had expected. Good product.
                    </div>
                    <div className="mt-2 text-gray-400 text-sm">2 mon</div>
                </div> */}
                </div>
            </div>
        </div>
    );
};

export default ProductReview;

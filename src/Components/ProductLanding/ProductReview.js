import React from 'react';
import { StarIcon } from '@heroicons/react/16/solid';

const ProductReview = ({ product }) => {
    const { rating } = product
    return (
        <div className='flex flex-col gap-3'>
            <h1 className="text-lg font-semibold">Reviews and Rating</h1>
            <div className='w-full flex flex-col gap-10 relative '>
                <div className="flex gap-10 bg-white">
                    <div className='w-[40%] flex flex-col items-center gap-5 rounded-md border border-[#AD7A29] p-7 py-4'>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl text-[#818181] font-semibold">{rating}</div>
                            <div className="text-xl text-[#8B5A08]">Excellent</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex items-center">
                                <div className='flex mb-2 justify-center md:justify-start'>
                                    {[...Array(5)].map((option, index) => {
                                        if (index < rating)
                                            return <StarIcon className='w-6 h-6 text-[#8B5A08]' />
                                        else
                                            return <StarIcon className='w-6 h-6 text-[#959595]' />
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="text-base text-gray-600">Number of reviews</div>
                    </div>
                    <div className='border rounded-md border-[#AD7A29] p-5 px-10 w-full'>
                        <div className="flex flex-col justify-between">
                            {[5, 4, 3, 2, 1].map((rating, index) => (
                                <div key={index} className="flex gap-16 items-center">
                                    <div className='flex mb-2 items-center'>
                                        {Array(5).fill('').map((_, index) => {
                                            if (index < rating)
                                                return <StarIcon className='w-6 h-6 text-[#8B5A08]' />
                                            else
                                                return <StarIcon className='w-6 h-6 text-[#959595]' />
                                        })}
                                    </div>
                                    <div className='flex gap-10 items-center'>
                                        <div className="w-56 h-2 bg-[#8C5A09] rounded-full">
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

                    </div>

                </div>
                <div className='flex gap-2'>
                    <input type="text" placeholder='Write your reviews' className='w-full p-2 rounded-md border border-gray-400' />
                    <button className='py-2 px-8 border rounded-md border-gray-400'>Submit</button>
                </div>
                <div className=" text-[#808080]">
                    <div className="flex w-full gap-2 items-center">
                        <span className="text-lg font-semibold mr-2">D</span>
                        <span className="font-medium">Dolma</span>
                        <div className='flex items-center'>
                            {[...Array(5)].map((option, index) => {
                                if (index < rating)
                                    return <StarIcon className='w-4 h-4 text-[#8B5A08]' />
                                else
                                    return <StarIcon className='w-4 h-4 text-[#959595]' />
                            })}
                        </div>
                        <div className="ml-auto text-gray-400 text-sm">2 mon</div>

                    </div>
                    <div className="mt-2 text-gray-600">
                        It turned out to be better than I had expected. Good product.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReview;

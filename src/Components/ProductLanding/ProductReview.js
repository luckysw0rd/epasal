import React from 'react';
import { StarIcon } from '@heroicons/react/16/solid';

const ProductReview = ({ product }) => {
    const { rating } = product
    const getRatingText = (rating) => {
        if (rating >= 4) {
            return "Excellent";
        } else if (rating >= 3) {
            return "Very Good";
        } else if (rating >= 2) {
            return "Good";
        } else if (rating >= 1) {
            return "Fair";
        } else {
            return "Poor";
        }
    };
    return (
        <div className='flex flex-col gap-3'>
            <h1 className="text-sm lg:text-lg font-semibold">Reviews and Rating</h1>
            <div className='w-full flex flex-col gap-5 lg:gap-8 '>
                <div className="flex gap-3 lg:gap-10 bg-white">
                    {/* SHOWS DIRECT RATING  */}
                    <div className='flex flex-col items-center gap-1 lg:gap-3 rounded-sm md:rounded-md border border-[#AD7A29] px-4 md:px-5 lg:px-7 py-2 lg:py-4'>
                        <div className="flex flex-col items-center">
                            <div className="text-xl md:text-2xl lg:text-3xl text-[#818181] font-semibold">{rating}</div>
                            <div className="text-sm md:text-base lg:text-xl text-[#8B5A08]">
                                {getRatingText(rating)}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex items-center">
                                <div className='flex mb-2 justify-center md:justify-start'>
                                    {[...Array(5)].map((option, index) => {
                                        if (index < rating)
                                            return <StarIcon className='w-4 h-4 lg:w-6 lg:h-6 text-[#8B5A08]' />
                                        else
                                            return <StarIcon className='w-4 h-4 lg:w-6 lg:h-6 text-[#959595]' />
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block text-xs lg:text-base text-gray-600">Reviews</div>
                    </div>

                    {/* SHOWS REVIEWS ON THE BASIS OF RATING  */}
                    <div className='border rounded-sm md:rounded-md border-[#AD7A29] py-2 lg:py-5 px-5 md:px-7 lg:px-10 w-full'>
                        <div className="flex flex-col justify-between">
                            {[5, 4, 3, 2, 1].map((rating, index) => (
                                <div key={index} className="flex gap-5 md:gap-10 lg:gap-16 items-center">
                                    <div className='flex items-center'>
                                        {Array(5).fill('').map((_, index) => {
                                            if (index < rating)
                                                return <StarIcon className='w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 text-[#8B5A08]' />
                                            else
                                                return <StarIcon className='w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 text-[#959595]' />
                                        })}
                                    </div>
                                    <div className='flex gap-5 lg:gap-10 items-center'>
                                        <div className="w-20 md:w-36 lg:w-56 h-1 md:h-2 bg-[#8C5A09] rounded-full">
                                            <div
                                                className={`h-1 md:h-2 rounded-full bg-[#F29C0F]`}
                                                style={{
                                                    width: `${rating === 5 ? 60 : rating === 4 ? 45 : rating === 3 ? 38 : 20}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className='text-xs md:text-sm lg:text-base'>{rating === 5 ? 24 : rating === 4 ? 18 : rating === 3 ? 15 : 5}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
                <div className='flex gap-2'>
                    <input type="text" placeholder='Write your reviews' className='w-full p-1 lg:p-2 rounded-md border border-gray-400' />
                    <button className='py-1 lg:py-2 px-5 lg:px-8 border text-sm md:text-base rounded-md border-gray-400'>Submit</button>
                </div>
                <div className="mb-10 text-[#808080]">
                    <div className="flex w-full gap-2 items-center">
                        <span className="text-sm lg:text-lg font-semibold mr-2">D</span>
                        <span className="text-sm lg:text-base font-medium">Dolma</span>
                        <div className='flex items-center'>
                            {[...Array(5)].map((option, index) => {
                                if (index < rating)
                                    return <StarIcon className='w-3 h-3 text-[#8B5A08]' />
                                else
                                    return <StarIcon className='w-3 h-3 text-[#959595]' />
                            })}
                        </div>
                        <div className="ml-auto text-gray-400 text-xs lg:text-sm">2 mon</div>

                    </div>
                    <div className="mt-2 text-sm lg:text-base text-gray-600">
                        It turned out to be better than I had expected. Good product.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReview;

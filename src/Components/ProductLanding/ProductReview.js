import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/16/solid';
import { AuthContext } from "../../Hooks/AuthContext";
import useFetch from '../../Hooks/useFetch';
import { useContext } from 'react';

const ProductReview = ({ product }) => {
    const { rating } = product
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [userRating, setUserRating] = useState('');
    const [description, setDescription] = useState('');
    const [reviews, setReviews] = useState([])
    const auth = useContext(AuthContext);
    const { sendRequest } = useFetch();

    const totalRating = reviews?.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews?.length || 0;
    const getRatingText = (averageRating) => {
        if (averageRating >= 4) {
            return "Excellent";
        } else if (averageRating >= 3) {
            return "Very Good";
        } else if (averageRating >= 2) {
            return "Good";
        } else if (averageRating >= 1) {
            return "Fair";
        } else {
            return "Poor";
        }
    };

    const handleSubmit = async (productId) => {
        const rating = userRating
        const reviewData = { name, rating, description }
        try {
            const responseData = await sendRequest(
                `review/products/${productId}/reviews`,
                'POST',
                JSON.stringify(reviewData),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            console.log(responseData); // Handle response data as needed
        } catch (error) {
            // Handle error if needed
            console.log(error);
        }
        finally {
            fetchReview()
            setIsModalOpen(false); // Close the modal after submission           
            setDescription("")
            setUserRating("")
            setName("")
        }
    };

    async function fetchReview() {
        try {
            const responseData = await sendRequest(
                `review/products/${product._id}/reviews`,
                'Get',
                null, {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token,
            }
            );
            console.log(responseData)
            setReviews(responseData) // Handle response data as needed
        } catch (error) {
            // Handle error if needed
            console.log(error);
        }
    }

    useEffect(() => {
        fetchReview()
    }, [product])

    return (
        <div className='flex flex-col gap-3'>
            <h1 className="text-sm lg:text-lg font-semibold">Reviews and Rating</h1>
            <div className='w-full flex flex-col gap-5 lg:gap-8 '>
                <div className="flex gap-3 lg:gap-10 bg-white">
                    {/* SHOWS DIRECT RATING  */}
                    <div className='flex flex-col items-center gap-1 lg:gap-3 rounded-sm md:rounded-md border border-[#AD7A29] px-4 md:px-5 lg:px-7 py-2 lg:py-4'>
                        <div className="flex flex-col items-center">
                            <div className="text-xl md:text-2xl lg:text-3xl text-[#818181] font-semibold">{parseFloat(averageRating.toFixed(1))}</div>
                            <div className="text-sm md:text-base lg:text-xl text-[#8B5A08]">
                                {getRatingText(averageRating)}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex items-center">
                                <div className='flex mb-2 justify-center md:justify-start'>
                                    {[...Array(5)].map((option, index) => {
                                        if (index < Math.ceil(averageRating))
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

                {/* GET REVIEWS  */}

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border border-gray-400 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-5"
                >
                    Write a Review
                </button>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg px-6 py-10 max-w-lg w-full">
                            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Submit Your Review</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 p-2 w-full border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Rating</label>
                                    <select
                                        value={userRating}
                                        onChange={(e) => setUserRating(e.target.value)}
                                        className="mt-1 p-2 w-full border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    >
                                        <option value="" disabled>Select rating</option>
                                        <option value="1">1 Star</option>
                                        <option value="2">2 Star</option>
                                        <option value="3">3 Star</option>
                                        <option value="4">4 Star</option>
                                        <option value="5">5 Star</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="mt-1 p-2 w-full border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button onClick={() => handleSubmit(product._id)}
                                        type="submit"
                                        className="border border-gray-400 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {reviews?.map(review => (
                <div className="mb-3 text-[#808080]">
                    <div className="flex w-full gap-2 items-center">
                        <span className="text-sm lg:text-lg font-semibold flex items-center justify-center w-8 h-8 rounded-full border-2 border-black">{review?.name.charAt(0)}</span>
                        <span className="text-sm lg:text-base font-medium">{review?.name}</span>
                        {review &&
                            <div className='flex items-center'>

                                {[...Array(5)].map((option, index) => {
                                    if (index < review.rating)
                                        return <StarIcon className='w-3 h-3 text-[#8B5A08]' />
                                    else
                                        return <StarIcon className='w-3 h-3 text-[#959595]' />
                                })}
                            </div>
                        }
                        <div className="ml-auto text-gray-400 text-xs lg:text-sm">2 mon</div>

                    </div>
                    <div className="mt-3 text-sm lg:text-base text-gray-600">
                        {review?.description}
                    </div>
                </div>
            ))}

        </div >
    );
};

export default ProductReview;

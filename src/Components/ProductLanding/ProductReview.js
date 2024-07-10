import React, { useEffect, useState, useContext } from 'react';
import { StarIcon } from '@heroicons/react/16/solid';
import { AuthContext } from "../../Hooks/AuthContext";
import useFetch from '../../Hooks/useFetch';

const ProductReview = ({ product }) => {
    const { rating } = product
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [userRating, setUserRating] = useState('');
    const [description, setDescription] = useState('');
    const [reviews, setReviews] = useState([]);
    const [ratingsCount, setRatingsCount] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const auth = useContext(AuthContext);
    const { isLoading, sendRequest } = useFetch();

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
        const rating = parseInt(userRating);
        const reviewData = { name, rating, description };
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
            setReviews(prevReviews => [...prevReviews, reviewData]);
            setRatingsCount(prevCounts => ({
                ...prevCounts,
                [rating]: prevCounts[rating] + 1
            }));
        } catch (error) {
            console.log(error); // Handle error if needed
        } finally {
            setIsModalOpen(false); // Close the modal after submission           
            setDescription("");
            setUserRating("");
            setName("");
        }
    };

    async function fetchReview() {
        try {
            const responseData = await sendRequest(
                `review/products/${product._id}/reviews`,
                'GET',
                null, {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token,
            }
            );
            setReviews(responseData);
            const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            responseData.forEach(review => counts[review.rating]++);
            setRatingsCount(counts);
        } catch (error) {
            console.log(error); // Handle error if needed
        }
    }

    useEffect(() => {
        fetchReview();
    }, [product]);

    return (
        <div className='flex flex-col gap-6'>
            <h1 className="text-lg lg:text-2xl font-semibold text-gray-900">Reviews and Rating</h1>
            <div className='w-full flex flex-col gap-6 lg:gap-10'>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-white p-5 rounded-lg shadow-md">
                    <div className='flex flex-col items-center gap-3 rounded-lg border border-gray-300 px-5 py-4'>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl lg:text-4xl text-gray-900 font-semibold">{parseFloat(averageRating.toFixed(1))}</div>
                            <div className="text-lg lg:text-xl text-blue-500">
                                {getRatingText(averageRating)}
                            </div>
                        </div>
                        <div className="flex justify-center mt-2">
                            {[...Array(5)].map((option, index) => (
                                <StarIcon
                                    key={index}
                                    className={`w-5 h-5 lg:w-6 lg:h-6 ${index < Math.ceil(averageRating) ? 'text-blue-500' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <div className="text-base lg:text-lg text-gray-600 mt-2">Reviews</div>
                    </div>

                    <div className='border rounded-lg border-gray-300 py-4 px-6 lg:py-5 lg:px-10 w-full'>
                        <div className="flex flex-col justify-between gap-4">
                            {[5, 4, 3, 2, 1].map((rating, index) => (
                                <div key={index} className="flex gap-4 lg:gap-6 items-center">
                                    <div className='flex items-center'>
                                        {Array(5).fill('').map((_, idx) => (
                                            <StarIcon
                                                key={idx}
                                                className={`w-5 h-5 lg:w-6 lg:h-6 ${idx < rating ? 'text-blue-500' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <div className='flex gap-4 lg:gap-6 items-center w-full'>
                                        <div className="w-32 lg:w-56 h-2 bg-gray-300 rounded-full overflow-hidden">
                                            <div
                                                className="h-2 bg-blue-500 rounded-full"
                                                style={{
                                                    width: `${(ratingsCount[rating] / reviews?.length) * 100 || 0}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className='text-base lg:text-lg text-gray-600'>{ratingsCount[rating]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 hover:bg-gray-100 transition duration-300"
                >
                    Write a Review
                </button>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-lg w-full">
                            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">Submit Your Review</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="p-3 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Rating</label>
                                    <select
                                        value={userRating}
                                        onChange={(e) => setUserRating(e.target.value)}
                                        className="p-3 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        required
                                    >
                                        <option value="" disabled>Select rating</option>
                                        <option value="1">1 Star</option>
                                        <option value="2">2 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="5">5 Stars</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="p-3 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleSubmit(product._id)}
                                        type="submit"
                                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {reviews?.map((review, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg shadow-md text-gray-800">
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300">
                                {review?.name.charAt(0)}
                            </span>
                            <div>
                                <div className="text-lg font-medium">{review?.name}</div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, idx) => (
                                        <StarIcon
                                            key={idx}
                                            className={`w-5 h-5 ${idx < review.rating ? 'text-blue-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 text-gray-600">
                            {review?.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReview;

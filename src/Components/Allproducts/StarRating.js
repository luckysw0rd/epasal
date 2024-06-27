import React from 'react';

const StarRating = ({ value, onChange }) => {
    const stars = [1, 2, 3, 4, 5]; // Number of stars


    
    return (
        <div className="flex items-center">
            {stars.map(star => (
                <label key={star} className="cursor-pointer">
                    <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={value === star}
                        onChange={() => onChange(star)}
                        className="hidden"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={star <= value ? '#faca15' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-yellow-500"
                    >
                        <path
                            d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 L12 2 Z"
                        />
                    </svg>
                </label>
            ))}
        </div>
    );
};

export default StarRating;

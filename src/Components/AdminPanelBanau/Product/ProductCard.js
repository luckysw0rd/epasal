import React from 'react';

const ProductCard = ({ product, onEditClick }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <div className="p-6">
                <img className="w-full h-48 object-cover" src={product.image.imageUrl} alt={product.name} />
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-gray-700 mb-2">Price: ${product.price}</p>
                <p className="text-gray-700 mb-2">Rating: {product.rating}</p>
                <p className="text-gray-700 mb-2">Revenue: ${product.revenueGenerated}</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    onClick={onEditClick}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

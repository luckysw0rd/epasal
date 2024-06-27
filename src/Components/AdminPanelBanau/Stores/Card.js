import React from 'react';
import { FaStar } from 'react-icons/fa';

const Card = ({ store }) => {
    return (
        <div key={store._id} className="bg-white p-6 text-sm rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white bg-indigo-600 p-2 rounded">{store.name.toUpperCase()}</h2>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-2 gap-4 mt-5">
                <div className="text-gray-700 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{store.location}</span>
                </div>
                <div className="text-gray-700 mb-2 flex items-center">
                    <FaPhone className="mr-2" />
                    <span>{store.phoneNumber}</span>
                </div>
                <div className="text-gray-700 mb-2 flex items-center">
                    <FaEnvelope className="mr-2" />
                    <span>{store.email}</span>
                </div>
                <div className="text-gray-700 mb-2 flex items-center">
                    <FaUser className="mr-2" />
                    <span>{store.owner.name}</span>
                </div>
                <div className="text-green-500 mb-2 flex items-center">
                    <FaDollarSign className="mr-2" />
                    <span>$ {store.revenueGenerated}</span>
                </div>
                <div className="text-red-500 mb-2 flex items-center">
                    <FaExclamationCircle className="mr-2" />
                    <span>$ {store.dueAmount}</span>
                </div>
                <div className="text-red-500 mb-2 flex items-center">
                    <FaHourglassHalf className="mr-2" />
                    <span>$ {store.pendingAmount}</span>
                </div>
                <div>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => console.log(store)}>
                        View Transactions
                    </button>
                </div>
            </div>
            {store.staff.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mt-2">Staff:</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                        {store.staff.map((staff, index) => (
                            <li key={index}>{staff.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Card;
// DeliveryCodeModal.js
import React, { useState } from 'react';

const DeliveryCodeModal = ({ isOpen, onClose, onSubmit }) => {
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        onSubmit(code);
        setCode('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Enter Delivery Code</h2>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryCodeModal;

// AddCategoryModal.js
import React, { useState } from 'react';
import { useStore } from './T1Context';
import { motion } from 'framer-motion';

const AddCategoryModal = ({ onClose }) => {
    const [newCategory, setNewCategory] = useState('');
    const { addSubCategory } = useStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCategory.trim() !== '') {
            addSubCategory(newCategory.trim());
            setNewCategory('');
            onClose(); // Close the modal after adding the subcategory
        }
    };

    return (
        <motion.div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div className="bg-white text-black p-8 rounded-lg shadow-xl"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                        placeholder="Enter subcategory name"
                    />
                    <div className="flex justify-end space-x-4">
                        <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg focus:outline-none" onClick={onClose}>Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg focus:outline-none">Add</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddCategoryModal;


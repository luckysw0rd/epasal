import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from "../../Assets/epasal.png";

const LeftSidebar1 = ({ isOpen, onClose, store, setStore }) => {
    const { categories } = store;
    const [newCategory, setNewCategory] = useState('');

    const handleCategoryClick = (category) => {
        console.log(`Clicked on category: ${category}`);
    };

    const handleLogoClick = () => {
        console.log("Clicked on logo");
    };

    const handleSearchClick = () => {
        console.log("Clicked on search");
    };

    const addCategory = () => {
        if (newCategory.trim() !== '') {
            setStore(prevState => ({
                ...prevState,
                categories: [...prevState.categories, { name: newCategory }]
            }));
            setNewCategory('');
        }
    };

    const removeCategory = (index) => {
        setStore(prevState => ({
            ...prevState,
            categories: prevState.categories.filter((_, i) => i !== index)
        }));
    };

    return (
        <motion.div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}>
            <motion.div className="fixed inset-y-0 left-0 bg-white w-64 overflow-y-auto border-r border-gray-300 shadow-md"
                initial={{ x: '-100%' }}
                animate={{ x: isOpen ? 0 : '-100%' }}
                transition={{ duration: 0.3 }}>
                <div className="flex items-center justify-center p-4 cursor-pointer" onClick={handleLogoClick}>
                    <motion.img src={logo.logoUrl} alt="logo" className="h-8 mr-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120 }} />
                    <motion.span className="font-bold text-2xl mr-10 font-Orbitron"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}>{store.name}</motion.span>
                </div>
                <motion.div className="p-4 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    onClick={handleSearchClick}>
                    <input type="text" placeholder="Search..."
                        className="w-full px-4 py-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none" />
                </motion.div>
                <ul className="py-2 text-2xl font-Genos">
                    {categories.map((category, index) => (
                        <motion.li key={index} className="flex items-center justify-between px-4 py-2 cursor-pointer"
                            onClick={() => handleCategoryClick(category.name)}>
                            <span>{category.name}</span>
                            <button className="text-red-500 focus:outline-none" onClick={() => removeCategory(index)}>
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7 9V11H13V9H7Z" />
                                </svg>
                            </button>
                        </motion.li>
                    ))}
                </ul>
                <div className="p-4 flex items-center">
                    <input
                        type="text"
                        placeholder="New Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none mr-2"
                    />
                    <button onClick={addCategory} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">Add</button>
                </div>
                <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 focus:outline-none">
                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </motion.div>
        </motion.div>
    );
};

export default LeftSidebar1;

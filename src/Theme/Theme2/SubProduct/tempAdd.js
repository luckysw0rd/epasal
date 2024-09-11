import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../StoreContext';

const AddProduct = ({ onClose }) => {
    const { addProduct } = useStore();
    const { categories, subCategories } = useStore().store;
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [sizes, setSizes] = useState(['']);
    const [prices, setPrices] = useState([{ size: '', price: '' }]);

    const onDrop = acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });

    const handleSizeChange = (index, value) => {
        const updatedPrices = [...prices];
        updatedPrices[index] = { ...updatedPrices[index], price: value };
        setPrices(updatedPrices);
    };

    const handleSizeAdd = () => {
        setSizes([...sizes, '']);
        setPrices([...prices, { size: '', price: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate inputs
        if (!image || !name || !category || !subcategory || sizes.length === 0 || prices.length === 0) {
            alert('Please fill in all fields.');
            return;
        }

        const newProduct = {
            id: Math.floor(Math.random() * 1000), // Generate a random ID
            name,
            image,
            categories: [category],
            subcategories: [subcategory],
            styles: sizes.map((size, index) => ({
                size,
                color: '', // You may add color input field to your form if needed
                price: prices[index]?.price || 0,
            })),
        };
        addProduct(newProduct);
        // Close the AddProduct overlay
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <motion.div
                className="bg-white rounded-lg p-8 w-full max-w-md flex flex-col"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <div {...getRootProps()} className="border-2 border-gray-300 border-dashed rounded-md p-6 mb-2">
                            <input {...getInputProps()} />
                            <p className="text-sm text-gray-400">Drop an image here, or click to select an image.</p>
                        </div>
                        {image && (
                            <img src={image} alt="Uploaded" className="w-full h-40 object-contain mb-2" />
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat.name} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
                        <select id="subcategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option value="">Select a subcategory</option>
                            {subCategories.map(subcat => (
                                <option key={subcat.name} value={subcat.name}>{subcat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Sizes and Prices</label>
                        {sizes.map((size, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={size}
                                    onChange={(e) => {
                                        const updatedSizes = [...sizes];
                                        updatedSizes[index] = e.target.value;
                                        setSizes(updatedSizes);
                                    }}
                                    placeholder="Size"
                                    className="w-1/2 mr-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <input
                                    type="number"
                                    value={prices[index]?.price}
                                    onChange={(e) => handleSizeChange(index, e.target.value)}
                                    placeholder="Price"
                                    className="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        ))}
                        <button type="button" className="text-sm text-blue-500 underline" onClick={handleSizeAdd}>Add Size</button>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={onClose}>Cancel</button>
                        <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Product</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddProduct;
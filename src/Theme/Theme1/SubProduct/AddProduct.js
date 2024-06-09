import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import jeans from '../../../Assets/jeans.jpg';
import 'tailwindcss/tailwind.css';

const AddProduct = ({ onClose }) => {
    const [image, setImage] = useState(jeans);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [costPerUnit, setCostPerUnit] = useState('');
    const [sku, setSku] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [brand, setBrand] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [remainingQuantity, setRemainingQuantity] = useState('');
    const [variantOptions, setVariantOptions] = useState([{ type: '', sub: '', price: '' }]);

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

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...variantOptions];
        updatedVariants[index][field] = value;
        setVariantOptions(updatedVariants);
    };

    const handleAddVariant = () => {
        setVariantOptions([...variantOptions, { type: '', sub: '', price: '' }]);
    };

    const handleRemoveVariant = (index) => {
        const updatedVariants = [...variantOptions];
        updatedVariants.splice(index, 1);
        setVariantOptions(updatedVariants);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate inputs
        if (!image || !name || !category || !productDescription || !price || !costPerUnit || !sku || !manufacturer || !brand || !stockQuantity || !remainingQuantity) {
            alert('Please fill in all fields.');
            return;
        }

        const newProduct = {
            id: Math.floor(Math.random() * 1000), // Generate a random ID
            name,
            image,
            category,
            productDescription,
            price: parseFloat(price),
            discountedPrice: parseFloat(discountedPrice),
            costPerUnit: parseFloat(costPerUnit),
            sku,
            manufacturer,
            brand,
            stockQuantity: parseInt(stockQuantity, 10),
            remainingQuantity: parseInt(remainingQuantity, 10),
            variantOptions,
        };

        // Add product logic here
        console.log(newProduct);

        // Close the AddProduct overlay
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-h-full overflow-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select a category</option>
                                {/* Populate options dynamically */}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Product Description</label>
                        <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <div {...getRootProps()} className="border-2 border-dashed rounded-md p-6 mt-1 flex justify-center items-center">
                            <input {...getInputProps()} />
                            <p className="text-gray-500">Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        {image && <img src={image} alt="Product" className="mt-4 w-full h-48 object-cover rounded-md" />}
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
                            <input type="number" value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cost per Unit</label>
                            <input type="number" value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">SKU (Stock Keeping Unit)</label>
                            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                            <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Brand</label>
                            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Remaining Quantity</label>
                            <input type="number" value={remainingQuantity} onChange={(e) => setRemainingQuantity(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900">Variant Options</h3>
                        {variantOptions.map((variant, index) => (
                            <div key={index} className="grid grid-cols-3 gap-6 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Variant Type</label>
                                    <input type="text" value={variant.type} onChange={(e) => handleVariantChange(index, 'type', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sub Variant</label>
                                    <input type="text" value={variant.sub} onChange={(e) => handleVariantChange(index, 'sub', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input type="number" value={variant.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="col-span-3">
                                    <button type="button" onClick={() => handleRemoveVariant(index)} className="mt-2 text-sm text-red-500 hover:text-red-700 focus:outline-none">Remove</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddVariant} className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none">Add Variant</button>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none">Add Product</button>
                    </div>
                </form>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <span className="sr-only">Close</span>
                    &#10005;
                </button>
            </div>
        </div>
    );
};

export default AddProduct;

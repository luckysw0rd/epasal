    import React, { useState } from 'react';
    import { useDropzone } from 'react-dropzone';
    import { FaPlus, FaTrash } from 'react-icons/fa';
    import { FaTimesCircle } from 'react-icons/fa';
    export default function ProductForm() {
        const [formState, setFormState] = useState({
            name: '',
            description: '',
            category: '',
            subcategories: '',
            price: 0,
            discount: 0, // Main product discount field
            image: {
                imageID: '',
                imageUrl: '',
            },
            rating: 0,
            variant: [{
                name: '',
                options: [{
                    name: '',
                    price: 0,
                    image: {
                        imageId: '',
                        imageUrl: '',
                    },
                    discount: 0,
                    count: 0
                }]
            }],
            soldQuantity: 0,
            revenueGenerated: 0,
            inventory: 1,
        });

        const onDrop = (acceptedFiles) => {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setFormState(prevState => ({
                    ...prevState,
                    image: {
                        ...prevState.image,
                        imageUrl: reader.result
                    }
                }));
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };

        

        const { getRootProps, getInputProps } = useDropzone({ onDrop });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormState(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleVariantChange = (index, e) => {
            const { name, value } = e.target;
            const updatedVariants = [...formState.variant];
            updatedVariants[index][name] = value;
            setFormState(prevState => ({
                ...prevState,
                variant: updatedVariants
            }));
        };

        const handleOptionChange = (variantIndex, optionIndex, e) => {
            const { name, value } = e.target;
            const updatedVariants = [...formState.variant];
            updatedVariants[variantIndex].options[optionIndex][name] = value;
            setFormState(prevState => ({
                ...prevState,
                variant: updatedVariants
            }));
        };

        const handleAddVariant = () => {
            setFormState(prevState => ({
                ...prevState,
                variant: [...prevState.variant, { name: '', options: [{ name: '', price: 0, image: { imageId: '', imageUrl: '' }, discount: 0, count: 0 }] }]
            }));
        };

        const handleAddOption = (variantIndex) => {
            const updatedVariants = [...formState.variant];
            const newOption = {
                name: '',
                price: 0,
                image: {
                    imageId: '',
                    imageUrl: '', // Initialize imageUrl here
                },
                discount: 0,
                count: 0
            };
            updatedVariants[variantIndex].options.push(newOption);
            setFormState(prevState => ({
                ...prevState,
                variant: updatedVariants
            }));
        };

        const handleRemoveVariant = (variantIndex) => {
            const updatedVariants = formState.variant.filter((_, index) => index !== variantIndex);
            setFormState(prevState => ({
                ...prevState,
                variant: updatedVariants
            }));
        };

        const handleRemoveOption = (variantIndex, optionIndex) => {
            const updatedVariants = [...formState.variant];
            updatedVariants[variantIndex].options = updatedVariants[variantIndex].options.filter((_, index) => index !== optionIndex);
            // If the last option is removed, remove the entire variant
            if (updatedVariants[variantIndex].options.length === 0) {
                updatedVariants.splice(variantIndex, 1);
            }
            setFormState(prevState => ({
                ...prevState,
                variant: updatedVariants
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formState);
            // Submit form logic
        };

        const handleUploadImageClick = (variantIndex, optionIndex) => {
            if (typeof variantIndex === 'undefined' || typeof optionIndex === 'undefined') {
                // If variantIndex or optionIndex is undefined, it means it's for the product image
                document.getElementById('productImageInput').click();
            } else {
                // If variantIndex and optionIndex are defined, it's for the option image
                document.getElementById(`option-image-${variantIndex}-${optionIndex}`).click();
            }
        };

        const handleOptionImageUpload = (variantIndex, optionIndex, acceptedFiles) => {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                const updatedVariants = [...formState.variant];
                updatedVariants[variantIndex].options[optionIndex].image.imageUrl = reader.result;
                setFormState(prevState => ({
                    ...prevState,
                    variant: updatedVariants
                }));
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };

        return (
            <div className="p-10 w-screen h-screen bg-[#FBFBFB]">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-1">Add Product</h2>
                        <hr className='mb-3' style={{ borderWidth: '1px', borderColor: '#DDDDDD' }} />
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Product Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Product Name"
                                        value={formState.name}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formState.category}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="category1">Category 1</option>
                                        <option value="category2">Category 2</option>
                                        <option value="category3">Category 3</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Product Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Product Description"
                                        value={formState.description}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImage">
                                        Product Image
                                    </label>
                                    <input
                                        id="productImageInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={onDrop}
                                        className="hidden"
                                    />
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <button
                                            type="button"
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={handleUploadImageClick}
                                        >
                                            Upload image
                                        </button>
                                    </div>
                                    {formState.image.imageUrl && (
                                        <div className="border mt-4 p-2">
                                            <img className="object-contain w-full h-48" src={formState.image.imageUrl} alt="Product" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg md:col-span-1 lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-1">Pricing</h2>
                        <hr className='mb-3' style={{ borderWidth: '1px', borderColor: '#DDDDDD' }} />

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                        Price
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="Price"
                                        value={formState.price}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
                                        Discount
                                    </label>
                                    <input
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        placeholder="Discount"
                                        value={formState.discount}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                {/* Inventory Stock Section */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inventory">
                                        Inventory Stocks
                                    </label>
                                    <input
                                        id="inventory"
                                        name="inventory"
                                        type="number"
                                        placeholder="Inventory Stocks"
                                        value={formState.inventory}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white mt-10 p-8 rounded-lg shadow-lg col-span-2">
                        <div className=' flex flex-row space-x-5'>
                            <h2 className="text-xl font-semibold mb-1">Variants</h2>
                            <button
                                type="button"
                                className="bg-[#FFEBCB] hover:bg-blue-600 text-[#CE840C] font-bold py-2 px-2 mb-3 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleAddVariant}
                            >
                                <FaPlus className="mr-0" />
                            </button>
                        </div>
                        <hr className='mb-3' style={{ borderWidth: '1px', borderColor: '#DDDDDD' }} />

                        <div className="space-y-4">
                            {formState.variant.map((variant, variantIndex) => (
                                <div key={variantIndex} className="space-y-4 border p-4 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-full">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`variant-name-${variantIndex}`}>
                                                Variant Name
                                            </label>

                                            <input
                                                id={`variant-name-${variantIndex}`}
                                                name="name"
                                                type="text"
                                                placeholder="Variant Name"
                                                value={variant.name}
                                                onChange={(e) => handleVariantChange(variantIndex, e)}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                        
                                        <button
                                            type="button"
                                            className="bg-orange-600 hover:bg-orange-800 mt-7 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() => handleRemoveVariant(variantIndex)}
                                        >
                                            <FaTimesCircle />
                                        </button>
                                    </div>
                                    {variant.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="pl-4 border-l-4 border-gray-300 ml-4">
                                            
                                            <div className="space-y-4">
                                                
                                                <div className="flex items-center space-x-4">
                                                    
                                                    <div className="w-full">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-name-${variantIndex}-${optionIndex}`}>
                                                            Option Name
                                                        </label>
                                                        <input
                                                            id={`option-name-${variantIndex}-${optionIndex}`}
                                                            name="name"
                                                            type="text"
                                                            placeholder="Option Name"
                                                            value={option.name}
                                                            onChange={(e) => handleOptionChange(variantIndex, optionIndex, e)}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            required
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="bg-orange-600 hover:bg-orange-800 mt-7 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                        onClick={() => handleRemoveOption(variantIndex, optionIndex)}
                                                    >
                                                        <FaTimesCircle />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-price-${variantIndex}-${optionIndex}`}>
                                                            Option Price
                                                        </label>
                                                        <input
                                                            id={`option-price-${variantIndex}-${optionIndex}`}
                                                            name="price"
                                                            type="number"
                                                            placeholder="Option Price"
                                                            value={option.price}
                                                            onChange={(e) => handleOptionChange(variantIndex, optionIndex, e)}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-discount-${variantIndex}-${optionIndex}`}>
                                                            Option Discount
                                                        </label>
                                                        <input
                                                            id={`option-discount-${variantIndex}-${optionIndex}`}
                                                            name="discount"
                                                            type="number"
                                                            placeholder="Option Discount"
                                                            value={option.discount}
                                                            onChange={(e) => handleOptionChange(variantIndex, optionIndex, e)}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-count-${variantIndex}-${optionIndex}`}>
                                                            Option Count
                                                        </label>
                                                        <input
                                                            id={`option-count-${variantIndex}-${optionIndex}`}
                                                            name="count"
                                                            type="number"
                                                            placeholder="Option Count"
                                                            value={option.count}
                                                            onChange={(e) => handleOptionChange(variantIndex, optionIndex, e)}
                                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-image-${variantIndex}-${optionIndex}`}>
                                                            Option Image
                                                        </label>
                                                        <input
                                                            id={`option-image-${variantIndex}-${optionIndex}`}
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleOptionImageUpload(variantIndex, optionIndex, e.target.files)}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                            onClick={() => handleUploadImageClick(variantIndex, optionIndex)}
                                                        >
                                                            Upload image
                                                        </button>
                                                        {option.image.imageUrl && (
                                                            <div className="border mt-4 p-2">
                                                                <img className="object-contain w-full h-48" src={option.image.imageUrl} alt="Option" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className=" flex flex-row bg-[#FFEBCB] hover:bg-orange-200 text-[#CE840C] font-bold py-2 px-4 mb-3 ml-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => handleAddOption(variantIndex)}
                                    >
                                        Add Option
                                        <FaPlus className="  mt-1 ml-2" /> 
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

import React, { useEffect, useState, useContext } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaImage } from "react-icons/fa6";
import { useStore } from '../../../Theme/ThemeContext';
import ImageDrop from '../../../Components/Editor/ImageDrop';
import useFetch from '../../../Hooks/useFetch';
import { useImage } from '../../../Hooks/useImage';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Hooks/AuthContext';
import Tooltip from '../../../Theme/Theme1/SubProduct/Tooltip';
import Loader from '../../../Components/Loading/Loading';
export default function ProductForm({ onClose, store, onProductAdded }) {
    const storeContext = useStore();
    const setStore = storeContext?.setStore;
    const { sendRequest, isLoading } = useFetch();
    const { uploadImage } = useImage();
    const [tempLoading, setTempLoading] = useState(false);
    const auth = useContext(AuthContext);
    
    const initialState = {
        name: '',
        description: '',
        price: '',
        discount: '',
        inventory: '',
        image: { imageUrl: '' },
        variant: [],
        category: [],
        subcategories: [store?.subCategories[0]?.name]
    };
    
    const [onEditDataUpload, setOnEditDataUpload] = useState(false);
    const [formState, setFormState] = useState(initialState);
    
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setFormState({ ...formState, subcategories: [value] });
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };
    
    const handleVariantChange = (index, e) => {
        const { name, value } = e.target;
        const newVariants = [...formState.variant];
        newVariants[index][name] = value;
        setFormState({ ...formState, variant: newVariants });
    };
    
    const handleOptionChange = (variantIndex, optionIndex, e) => {
        const { name, value } = e.target;
        const newVariants = [...formState.variant];
        newVariants[variantIndex].options[optionIndex][name] = value;
        setFormState({ ...formState, variant: newVariants });
    };
    
    const handleAddVariant = () => {
        setFormState({
            ...formState,
            variant: [
                ...formState.variant,
                { name: '', options: [{ name: '', price: formState?.price, discount: formState?.discount, count: '', image: { imageUrl: '' } }] }
            ]
        });
    };
    
    const handleRemoveVariant = (variantIndex) => {
        const newVariants = [...formState.variant];
        newVariants.splice(variantIndex, 1);
        setFormState({ ...formState, variant: newVariants });
    };
    
    const handleAddOption = (variantIndex) => {
        const newVariants = [...formState.variant];
        newVariants[variantIndex].options.push({ name: '', price: '', discount: '', count: '', image: { imageUrl: '' } });
        setFormState({ ...formState, variant: newVariants });
    };
    
    const handleRemoveOption = (variantIndex, optionIndex) => {
        const newVariants = [...formState.variant];
        newVariants[variantIndex].options.splice(optionIndex, 1);
        if (newVariants[variantIndex].options.length === 0) {
            newVariants.splice(variantIndex, 1);
        }
        setFormState({ ...formState, variant: newVariants });
    };
    
    const handleOptionImageUpload = (variantIndex, optionIndex, files) => {
        const newVariants = [...formState.variant];
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            newVariants[variantIndex].options[optionIndex].image.imageUrl = reader.result;
            setFormState({ ...formState, variant: newVariants });
        };
        reader.readAsDataURL(file);
    };
    
    const handleUploadImageClick = (variantIndex, optionIndex) => {
        document.getElementById(`option-image-${variantIndex}-${optionIndex}`).click();
    };
    
    const handleProductImageUpload = (files) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormState({ ...formState, image: { imageUrl: reader.result } });
        };
        reader.readAsDataURL(file);
    };
    
    const handleUploadProductImageClick = () => {
        document.getElementById('product-image').click();
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedVariants = formState.variant.map((variant, variantIndex) => {
            const updatedOptions = variant.options.map((option, optionIndex) => ({
                ...option,
                name: option.name || `default`
            }));
    
            return {
                ...variant,
                name: variant.name || `default`,
                options: updatedOptions
            };
        });
    
        setFormState(prevFormState => ({
            ...prevFormState,
            variant: updatedVariants
        }));
    
        try {
            setTempLoading(true);
            const productImg = await uploadImage(formState?.image?.imageUrl);
            const newFormState = {
                ...formState,
                image: {
                    ...formState.image,
                    imageUrl: productImg.img,
                    imageID: productImg.id
                }
            };
    
            if (formState.variant.length > 0 && formState.variant[0].options.length > 0) {
                for (let i = 0; i < formState.variant[0].options.length; i++) {
                    const optionImage = await uploadImage(formState.variant[0].options[i].image.imageUrl);
    
                    newFormState.variant[0].options[i].image = {
                        imageUrl: optionImage.img,
                        imageID: optionImage.id
                    };
                }
            }
    
            setFormState(newFormState);
            setTempLoading(false);
            await new Promise(resolve => setTimeout(resolve, 0));
            setOnEditDataUpload(prev => !prev);
            onProductAdded(newFormState);
        } catch (err) {
            toast("error uploading variant images ");
        }
    };
    
    const uploadData = async () => {
        try {
            const response = await sendRequest(
                'product/addProduct',
                'POST',
                JSON.stringify({ formState, storeID: store._id }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            toast.success(response.message);
    
            if (typeof setStore === 'function') {
                const newProduct = {
                    ...formState,
                    id: Math.random().toString(36).substr(2, 9),
                };
                setStore(prevStore => ({
                    ...prevStore,
                    products: [...prevStore.products, newProduct]
                }));
            } else {
                console.error('setStore is not a function:', setStore);
            }
    
            onClose();
            setOnEditDataUpload(false);
        } catch (err) {
            /*  toast.error(err.message); */
        }
    };
    
    useEffect(() => {
        if (onEditDataUpload) {
            uploadData();
        }
    }, [onEditDataUpload]);
    if (isLoading || tempLoading) {
        return <Loader></Loader>
    } else {
        return (
            <>

                <div className=''>
                    <div className="fixed inset-0 flex h-3/4 items-center justify-center z-50 ">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={() => onClose()}></div>
                        <div className="relative h-full bg-white p-8 rounded-lg mt-[200px] py-10 shadow-lg  z-10 w-full max-w-3xl mx-auto overflow-y-scroll">
                            <div>
                                <h2 className="text-xl font-semibold mb-1">Product Information</h2>
                                <div className='flex justify-center absolute top-4 right-4 items-center w-6 h-6 border border-red-600 rounded-full'>
                                    <button
                                        className="text-lg text-red-600 hover:text-red-800"
                                        onClick={() => onClose()}
                                    >
                                        &#x2715;
                                    </button>
                                </div>
                            </div>
                            <hr className='mb-3' style={{ borderWidth: '1px', borderColor: '#DDDDDD' }} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
                                <div className=''>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Product Name"
                                        value={formState.name}
                                        onChange={handleInputChange}
                                        onWheel={(e) => e.target.blur()}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                        required
                                    />
                                </div>
                                <div className=''>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
                                        Category
                                    </label>
                                    {store && store.subCategories ? (
                                        <select
                                            id="subcategory"
                                            name="category"
                                            value={formState.subcategories}
                                            onChange={handleCategoryChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                        >
                                            {store.subCategories.map(subcategory => (
                                                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p>Loading categories...</p>
                                    )}
                                </div>
                                <div className=''>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Product Description"
                                        value={formState.description}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full h-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="relative h-[250px]">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Image</label>
                                    <input
                                        id="product-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleProductImageUpload(e.target.files)}
                                        className="hidden "
                                    />
                                    <div className="flex items-center h-[250px] justify-center mb-2">
                                        <button
                                            type="button"
                                            // bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                                            className="h-[250px] w-full px-2  flex justify-center items-center text-4xl shadow appearance-none border rounded"
                                            onClick={handleUploadProductImageClick}
                                        >
                                            <FaImage />
                                        </button>

                                    </div>
                                    {formState.image.imageUrl && (
                                        <div className="absolute h-[250px] top-7 w-full left-0 z-0 pointer-events-none">
                                            <img className="rounded w-full h-[250px]" src={formState.image.imageUrl} alt="Product" />
                                        </div>
                                    )}
                                </div>



                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div>
                                    <div className=' flex flex-row items-center my-auto'>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                            Price (Nrs)
                                        </label>
                                        <Tooltip message="We apply a 3% transaction fee, so please adjust the price accordingly.">
                                            <span className=' absolute -bottom-2 text-yellow-600 text-xl font-bold'>?</span>
                                        </Tooltip>

                                    </div>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="Price (Nrs)"
                                        value={formState.price}
                                        onChange={handleInputChange}
                                        onWheel={(e) => e.target.blur()}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                        required
                                    />
                                </div>
                                <div>
                                    <div className=' flex flex-row items-center my-auto'>

                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
                                            Discount (Nrs)
                                        </label>
                                        <Tooltip message=" Discount Amount">
                                            <span className=' absolute -bottom-2 text-yellow-600 text-xl font-bold'>?</span>
                                        </Tooltip>
                                    </div>
                                    <input
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        placeholder="Discount"
                                        value={formState.discount}
                                        onChange={handleInputChange}
                                        onWheel={(e) => e.target.blur()}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                    />
                                </div>
                                <div>
                                    <div className=' flex flex-row items-center my-auto'>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inventory">
                                            Inventory
                                        </label>
                                        <Tooltip message="Total Number of Count / Stock of this product">
                                            <span className=' absolute -bottom-2 text-yellow-600 text-xl font-bold'>?</span>
                                        </Tooltip>
                                    </div>
                                    <input
                                        id="inventory"
                                        name="inventory"
                                        type="number"
                                        placeholder="Inventory"
                                        value={formState.inventory}
                                        onChange={handleInputChange}
                                        onWheel={(e) => e.target.blur()}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                    />
                                </div>

                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-lg mt-4">
                                <h2 className="text-xl font-semibold mb-1">Variants</h2>
                                <h3 className="text-sm font-semibold mb-1 text-yellow-500 ">
                                    Please note that only the first variant can have different prices, inventory, and images.</h3>

                                <hr className='mb-3' style={{ borderWidth: '1px', borderColor: '#DDDDDD' }} />
                                {formState.variant.map((variant, variantIndex) => (
                                    <div key={variantIndex} className="mb-4 border p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className=' flex flex-row items-center my-auto'>
                                                <label className="block text-gray-700 text-sm font-bold" htmlFor={`variant-name-${variantIndex}`}>
                                                    Variant Name
                                                </label>
                                                <Tooltip message="Mention The Name of the Variant (color , Size , Quantity etc) , Not the Value (White,XL,200 gms)">
                                                    <span className=' absolute -bottom-3 text-yellow-600 text-xl font-bold'>?</span>
                                                </Tooltip>
                                            </div>
                                            <button type="button" className="text-red-500" onClick={() => handleRemoveVariant(variantIndex)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <input
                                            id={`variant-name-${variantIndex}`}
                                            name="name"
                                            type="text"
                                            placeholder="Eg: Size , Color , Quantity"
                                            value={variant.name}
                                            onChange={(e) => handleVariantChange(variantIndex, e)}
                                            onWheel={(e) => e.target.blur()}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                            required
                                        />
                                        {variant.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="my-4 border p-4 rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-md font-semibold mb-1">Option {optionIndex + 1}</h3>
                                                    <button type="button" className="text-red-500" onClick={() => handleRemoveOption(variantIndex, optionIndex)}>
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                                <div className="mb-2">

                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-name-${variantIndex}-${optionIndex}`}>
                                                        Option Name
                                                    </label>


                                                    <input
                                                        id={`option-name-${variantIndex}-${optionIndex}`}
                                                        name="name"
                                                        type="text"
                                                        placeholder="if color then Red,Green , Size then L , XL etc "
                                                        value={option.name}
                                                        onChange={(e) => handleOptionChange(variantIndex, optionIndex, e)}
                                                        onWheel={(e) => e.target.blur()}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                                        required
                                                    />
                                                </div>
                                                {variantIndex === 0 && (
                                                    <>
                                                        <div className="mb-2">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-price-${variantIndex}-${optionIndex}`}>
                                                                Option Price
                                                            </label>
                                                            <input
                                                                id={`option-price-${variantIndex}-${optionIndex}`}
                                                                name="price"
                                                                type="number"
                                                                placeholder=" Different Price for the variant"
                                                                defaultValue={formState.price}
                                                                onChange={(e) => handleOptionChange(variantIndex, optionIndex, e)}
                                                                onWheel={(e) => e.target.blur()}
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-2">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-discount-${variantIndex}-${optionIndex}`}>
                                                                Option Discount
                                                            </label>
                                                            <input
                                                                id={`option-discount-${variantIndex}-${optionIndex}`}
                                                                name="discount"
                                                                type="number"
                                                                placeholder="Option Discount"
                                                                defaultValue={formState.discount}
                                                                onChange={(e) => handleOptionChange(variantIndex, optionIndex, e)}
                                                                onWheel={(e) => e.target.blur()}
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                {variantIndex === 0 && (
                                                    <>
                                                        <div className="mb-2">
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
                                                                onWheel={(e) => e.target.blur()}
                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-arrows"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                {variantIndex === 0 && (
                                                    <>
                                                        <div>
                                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                                Option Image
                                                            </label>
                                                            <input
                                                                id={`option-image-${variantIndex}-${optionIndex}`}
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleOptionImageUpload(variantIndex, optionIndex, e.target.files)}
                                                                className="hidden"
                                                            />
                                                            {option.image.imageUrl && (
                                                                <div className="border mt-2 p-2">
                                                                    <img className="object-contain w-full h-48" src={option.image.imageUrl} alt="Option" />
                                                                </div>
                                                            )}
                                                            <div className="flex items-center justify-center mb-2">
                                                                <button
                                                                    type="button"
                                                                    className="bg-yellow-500 w-[170px] hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                    onClick={() => handleUploadImageClick(variantIndex, optionIndex)}
                                                                >
                                                                    Upload image
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                        <div className="flex justify-center md:justify-end">
                                            <button
                                                type="button"
                                                className="bg-blue-500 w-[170px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                onClick={() => handleAddOption(variantIndex)}
                                            >
                                                Add Option <FaPlus className="inline-block ml-2" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-center md:justify-end mt-4">
                                    <button
                                        type="button"
                                        className="bg-green-500 hover:bg-green-600 w-[170px] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={handleAddVariant}
                                    >
                                        Add Variant <FaPlus className="inline-block ml-2" />
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center md:justify-end">
                                    <button
                                        type="submit"
                                        className="bg-green-500 w-[170px] hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={handleSubmit}
                                    >
                                        Add product
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
                <style jsx>{`
  /* Hide the arrows for number input fields */
  .no-arrows::-webkit-outer-spin-button,
  .no-arrows::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .no-arrows {
    -moz-appearance: textfield; /* Firefox */
  }
`}</style>
            </>
        );
    }
}
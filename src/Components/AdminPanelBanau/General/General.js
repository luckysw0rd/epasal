import React, { useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { useImage } from '../../../Hooks/useImage';
import { toast } from 'react-toastify';
const General = ({ store }) => {
    const { uploadImage } = useImage();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...store });
    const [copySuccess, setCopySuccess] = useState('');
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, arrayName, index) => {
        const { value } = e.target;
        const newArray = [...formData[arrayName]];
        newArray[index].name = value;
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleCopyLink = () => {
        const link = `https://banau.com/${store.name}`;
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess('Link copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }).catch(err => {
            setCopySuccess('Failed to copy!');
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Upload images to Cloudinary if they are not already Cloudinary URLs
            const uploadImages = async () => {
                const updatedData = { ...formData };

                const uploadIfNeeded = async (image, type, subType = 'qr') => {
                    if (image) {
                        const uploadedImage = await uploadImage(image);
                        updatedData[type][subType].imageUrl = uploadedImage.img;
                        updatedData[type][subType].imageID = uploadedImage.id;

                    }
                };

                await Promise.all([
                    uploadIfNeeded(formData.esewa?.qr?.imageUrl, 'esewa'),
                    uploadIfNeeded(formData.bank?.qr?.imageUrl, 'bank'),
                    uploadIfNeeded(formData.khalti?.qr?.imageUrl, 'khalti')
                ]);

                return updatedData;
            };

            const updatedFormData = await uploadImages();
            console.log(updatedFormData);
            const responseData = await sendRequest(
                'store/update/dashboard/' + store._id,
                'PUT',
                JSON.stringify(updatedFormData),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            toast.success(responseData.message);
            window.location.reload();
        } catch (error) {
            console.error(error.message || 'An error occurred during login');
        }
        setIsEditing(false);
    };

    const handleDrop = useCallback((acceptedFiles, type) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imageUrl = reader.result;
            setFormData((prevData) => ({
                ...prevData,
                [type]: {
                    ...prevData[type],
                    qr: {
                        ...prevData[type].qr,
                        imageUrl: imageUrl
                    }
                }
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }, []);

    const esewaDropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'esewa')
    });

    const bankDropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'bank')
    });

    const khaltiDropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'khalti')
    });

    const renderDropzone = (type, dropzoneProps) => (
        <div className="mb-4">
            <div {...dropzoneProps.getRootProps({ className: 'dropzone' })} className="p-4 border-dashed border-2 rounded-lg cursor-pointer text-center">
                <input {...dropzoneProps.getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select one</p>
            </div>
            {formData[type]?.qr?.imageUrl && <img src={formData[type].qr.imageUrl} alt={`${type} QR`} className="w-32 h-32 mt-2 border border-gray-200 rounded-lg" />}
        </div>
    );

    if (!store) {
        return <div className="text-center py-10">No store data available</div>;
    }

    const {
        name,
        logo,
        email,
        subCategories,
        location,
        socialMediaLinks,
        owner,
        esewa,
        bank,
        khalti,
    } = formData;

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">{name}</h1>
                {logo?.logoUrl && <img src={logo.logoUrl} alt="Store Logo" className="w-32 h-32 mx-auto mt-4 rounded-full border-2 border-gray-200" />}
            </header>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Information</h2>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="mb-2 p-2 w-full border rounded"
                        />
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={handleInputChange}
                            placeholder="Location"
                            className="mb-2 p-2 w-full border rounded"
                        />
                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sub Categories</h2>
                        {subCategories.map((subCategory, index) => (
                            <input
                                key={index}
                                type="text"
                                value={subCategory.name}
                                onChange={(e) => handleArrayChange(e, 'subCategories', index)}
                                placeholder="Sub Category"
                                className="mb-2 p-2 w-full border rounded"
                            />
                        ))}
                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Social Media Links</h2>
                        {Object.entries(socialMediaLinks).map(([platform, url], index) => (
                            <div key={index} className="mb-2">
                                <label className="capitalize">{platform}</label>
                                <input
                                    type="text"
                                    name={`socialMediaLinks.${platform}`}
                                    value={url}
                                    onChange={(e) => {
                                        const newLinks = { ...socialMediaLinks, [platform]: e.target.value };
                                        setFormData({ ...formData, socialMediaLinks: newLinks });
                                    }}
                                    placeholder={`${platform} URL`}
                                    className="p-2 w-full border rounded"
                                />
                            </div>
                        ))}
                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Owner</h2>
                        <input
                            type="text"
                            name="owner"
                            value={owner}
                            onChange={handleInputChange}
                            placeholder="Owner"
                            className="mb-2 p-2 w-full border rounded"
                        />
                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Payment Details</h2>
                        <div className="mb-4">
                            <h3 className="text-xl font-medium text-gray-600">eSewa</h3>
                            <input
                                type="text"
                                name="esewa.accountNumber"
                                value={esewa?.accountNumber}
                                onChange={(e) => {
                                    setFormData({ ...formData, esewa: { ...esewa, accountNumber: e.target.value } });
                                }}
                                placeholder="Account Number"
                                className="mb-2 p-2 w-full border rounded"
                            />
                            {renderDropzone('esewa', esewaDropzone)}
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-medium text-gray-600">Bank</h3>
                            <input
                                type="text"
                                name="bank.accountNumber"
                                value={bank?.accountNumber}
                                onChange={(e) => {
                                    setFormData({ ...formData, bank: { ...bank, accountNumber: e.target.value } });
                                }}
                                placeholder="Account Number"
                                className="mb-2 p-2 w-full border rounded"
                            />
                            <input
                                type="text"
                                name="bank.fullname"
                                value={bank?.fullname}
                                onChange={(e) => {
                                    setFormData({ ...formData, bank: { ...bank, fullname: e.target.value } });
                                }}
                                placeholder="Full Name"
                                className="mb-2 p-2 w-full border rounded"
                            />
                            {renderDropzone('bank', bankDropzone)}
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-medium text-gray-600">Khalti</h3>
                            <input
                                type="text"
                                name="khalti.accountNumber"
                                value={khalti?.accountNumber}
                                onChange={(e) => {
                                    setFormData({ ...formData, khalti: { ...khalti, accountNumber: e.target.value } });
                                }}
                                placeholder="Account Number"
                                className="mb-2 p-2 w-full border rounded"
                            />
                            {renderDropzone('khalti', khaltiDropzone)}
                        </div>
                    </section>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Store URL :</h2>
                        <div className="flex items-center space-x-2">
                            <li className='text-blue-500 hover:text-blue-700'>
                                <Link to={`/store/${store.name}`}>
                                    {`https://banau.com/${store.name}`}
                                </Link>
                            </li>
                            <button
                                onClick={handleCopyLink}
                                className="ml-2 p-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded flex items-center"
                            >
                                <FaCopy className="mr-1" /> Copy
                            </button>
                        </div>
                        {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Information</h2>
                        <p className="text-gray-600">Email: <a href={`mailto:${email}`} className="text-blue-500 hover:underline">{email}</a></p>
                        <p className="text-gray-600">Location: {location}</p>
                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sub Categories</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {subCategories.map((subCategory, index) => (
                                <li key={index} className="text-gray-600">{subCategory.name}</li>
                            ))}
                        </ul>
                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Social Media Links</h2>
                        <ul className="space-y-2">
                            {Object.entries(socialMediaLinks).map(([platform, url], index) => (
                                <li key={index}>
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline capitalize">{platform}</a>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Owner</h2>
                        <p className="text-gray-600">{owner}</p>
                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Payment Details</h2>
                        <div className="mb-4">
                            <h3 className="text-xl font-medium text-gray-600">eSewa</h3>
                            <p className="text-gray-600">Account Number: {esewa?.accountNumber}</p>
                            {esewa?.qr?.imageUrl && <img src={esewa.qr.imageUrl} alt="eSewa QR" className="w-32 h-32 mt-2 border border-gray-200 rounded-lg" />}
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-medium text-gray-600">Bank</h3>
                            <p className="text-gray-600">Account Number: {bank?.accountNumber}</p>
                            <p className="text-gray-600">Full Name: {bank?.fullname}</p>
                            {bank?.qr?.imageUrl && <img src={bank.qr.imageUrl} alt="Bank QR" className="w-32 h-32 mt-2 border border-gray-200 rounded-lg" />}
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-medium text-gray-600">Khalti</h3>
                            <p className="text-gray-600">Account Number: {khalti?.accountNumber}</p>
                            {khalti?.qr?.imageUrl && <img src={khalti.qr.imageUrl} alt="Khalti QR" className="w-32 h-32 mt-2 border border-gray-200 rounded-lg" />}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default General;

import React, { useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { useImage } from '../../../Hooks/useImage';
import { toast } from 'react-toastify';

const General = ({ store, setDashboardState }) => {
    const { uploadImage } = useImage();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...store });
    const [newSubCategory, setNewSubCategory] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext);

    const handleInputChange2 = (e) => {
        const inputScript = e.target.value;
        const scriptRegex = /s1\.src\s*=\s*['"]([^'"]+)['"]/;
        const match = inputScript.match(scriptRegex);

        if (match) {
            const extractedSrc = match[1];
            setFormData({ ...formData, liveChatSource: extractedSrc });
        } else {
            setFormData({ ...formData, liveChatSource: '' });
        }
    };

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

    const handleAddSubCategory = () => {
        if (newSubCategory.trim()) {
            setFormData({
                ...formData,
                subCategories: [...formData.subCategories, { name: newSubCategory.trim() }]
            });
            setNewSubCategory('');
        }
    };

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
        <div className="mb-4 flex justify-center flex-col items-center mx-auto">
            <div {...dropzoneProps.getRootProps({ className: 'dropzone' })} className="p-4 border-dashed border-2 rounded-lg cursor-pointer text-center">
                <input {...dropzoneProps.getInputProps()} />
                <h1 className='font-bold'>QR CODE</h1>
                <p>Drag 'n' drop an image here, or click to select one</p>
            </div>
            {formData[type]?.qr?.imageUrl && <img src={formData[type].qr.imageUrl} alt={`${type} QR`} className="w-60 h-60 mt-2 border border-gray-200 rounded-lg" />}
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
        phoneNumber,
        promoCode,
        subscriptionStatus,
        expectedDeliveryTime,
        expectedDeliveryPrice,
        liveChatSource,
        subscriptionExpiry,
        componentSkin,
        skin
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
                        <input
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className="mb-2 p-2 w-full border rounded"
                        />
                    </section>
                    <section className='mb-8 border-b pb-4'>

                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Delivery Status</h2>
                        <label className="capitalize">Expected Delivery Time</label>
                        <input
                            type="text"
                            name="DeliveryTime"
                            value={expectedDeliveryTime}
                            onChange={(e) => { setFormData({ ...formData, expectedDeliveryTime: e.target.value }) }}
                            placeholder="Expected Delivery Time"
                            className="mb-2 p-2 w-full border rounded"
                        />
                        <label className="capitalize">Expected Delivery Price</label>
                        <input
                            type="number"
                            name="DeliveryPrice"
                            value={expectedDeliveryPrice}
                            onChange={(e) => { setFormData({ ...formData, expectedDeliveryPrice: e.target.value }) }}
                            placeholder="Expected Delivery Price"
                            className="mb-2 p-2 w-full border rounded"
                        />



                    </section>
                    {(subscriptionStatus !== 'Silver') ? (
                        <section className='mb-8 border-b pb-4'>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Subscription Information</h2>
                            <label className="capitalize">Subscription Status</label>
                            <input
                                type="text"
                                name="subscriptionStatus"
                                value={subscriptionStatus}
                                onChange={handleInputChange}
                                className="mb-2 p-2 w-full border rounded"
                                disabled
                            />
                            <label className="capitalize">Subscription Expiry</label>
                            <input
                                type="text"
                                name="subscriptionExpiry"
                                value={new Date(subscriptionExpiry).toLocaleDateString()}
                                className="mb-2 p-2 w-full border rounded"
                                disabled
                            />
                        </section>
                    ) : ''}
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Categories</h2>
                        {subCategories.map((subCategory, index) => (
                            <input
                                key={index}
                                type="text"
                                value={subCategory?.name}
                                onChange={(e) => handleArrayChange(e, 'subCategories', index)}
                                placeholder="Category"
                                className="mb-2 p-2 w-full border rounded"
                            />
                        ))}
                        <div className="flex mt-4">
                            <input
                                type="text"
                                value={newSubCategory}
                                onChange={(e) => setNewSubCategory(e.target.value)}
                                placeholder="New Category"
                                className="p-2 border rounded flex-grow"
                            />
                            <button
                                type="button"
                                onClick={handleAddSubCategory}
                                className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </section>

                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Live Chat Url (tawk.io)</h2>
                        {(subscriptionStatus === 'Silver') && <div className='text-gray-400'>Upgrade to higher tier for this section <button onClick={() => { setDashboardState('Shop') }} className='ml-2 px-4 py-1 bg-black text-white rounded-2xl'>Go</button></div>}
                        {
                            (subscriptionStatus !== 'Silver') && (
                                <>
                                    <div>
                                        <textarea
                                            name="liveChatSourceScript"
                                            onChange={handleInputChange2}
                                            placeholder="Paste the Tawk.to script here"
                                            className="mb-2 p-2 w-full border rounded"
                                            rows="10"
                                        ></textarea>

                                        <input
                                            type="text"
                                            name="liveChatSource"
                                            value={formData.liveChatSource}
                                            readOnly
                                            placeholder="Live Chat URL"
                                            className="mb-2 p-2 w-full border rounded"
                                        />
                                    </div>
                                </>
                            )
                        }
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
                    {
                        (subscriptionStatus !== 'Silver') ? (
                            <section className='mb-8 border-b pb-4'>

                                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Promo Code</h2>

                                <div>
                                    <div className='flex flex-col'>
                                        <label className="capitalize">Promo Name</label>
                                        <input
                                            type="text"
                                            value={promoCode[0]?.name}
                                            onChange={(e) => setFormData({ ...formData, promoCode: [{ name: e.target.value, value: formData?.promoCode[0]?.value }] })}
                                            placeholder="PromoCode"
                                            className="p-2 border rounded flex-grow"
                                        />
                                    </div>
                                    <div className='flex flex-col mt-3'>
                                        <label className="capitalize">Discount (%)</label>
                                        <input
                                            type="number"
                                            value={promoCode[0]?.value}
                                            onChange={(e) => setFormData({ ...formData, promoCode: [{ value: e.target.value, name: formData?.promoCode[0]?.name }] })}
                                            placeholder="Discount"
                                            className="p-2 border rounded flex-grow"
                                        />
                                    </div>

                                </div>

                            </section>
                        ) : ''



                    }

                    {/* <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Owner</h2>
                        <input
                            type="text"
                            name="owner"
                            value={owner}
                            onChange={handleInputChange}
                            placeholder="Owner"
                            className="mb-2 p-2 w-full border rounded"
                        />
                    </section> */}
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
                                <Link to={`/store/${store?.name}`}>
                                    {`https://banau.com/${store?.name}`}
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
                        <p className="text-gray-600">Phone Number: {phoneNumber}</p>

                    </section>
                    <section className='mb-8 border-b pb-4'>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Subscription Information</h2>
                        <p>Subscription Status: {subscriptionStatus}</p>
                        <p>Subscription Expiry: {new Date(subscriptionExpiry).toLocaleDateString()}</p>
                    </section>


                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Delivery Status</h2>
                        <p className="text-gray-600">Expected Delivery Time : {expectedDeliveryTime} </p>
                        <p className="text-gray-600">Expected Delivery Price : {expectedDeliveryPrice} </p>

                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Live Chat Url (tawk.io)</h2>
                        {(subscriptionStatus === 'Silver') && <div className='text-gray-400'>Upgrade to higher tier for this section <button onClick={() => { setDashboardState('Shop') }} className='ml-2 px-4 py-1 bg-black text-white rounded-2xl'>Go</button></div>}
                        {
                            (subscriptionStatus !== 'Silver') && <p className="text-gray-600">Url Source: {liveChatSource} </p>
                        }



                    </section>
                    <section className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Categories</h2>
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
                        <p className="text-gray-600">{owner.name}</p>
                    </section>
                    <section className='mb-8 border-b pb-4'>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Promo Code</h2>
                        {(subscriptionStatus === 'Silver') && <div className='text-gray-400'>Upgrade to higher tier for this section <button onClick={() => { setDashboardState('Shop') }} className='ml-2 px-4 py-1 bg-black text-white rounded-2xl'>Go</button></div>}
                        {
                            (subscriptionStatus !== 'Silver') && promoCode?.map((data, i) => (
                                <div key={i}>
                                    <div>{data?.name} : {data?.value}%</div>
                                </div>
                            ))
                        }
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

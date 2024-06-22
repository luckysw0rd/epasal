import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaDollarSign, FaExclamationCircle, FaHourglassHalf, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
const Stores = () => {
    const [storesArr, setStoresArr] = useState([]);
    const [search, setSearch] = useState('');
    const [ownername, setOwnername] = useState('');
    const [staffname, setStaffname] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [selectedStore, setSelectedStore] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const [updatingStore, setUpdatingStore] = useState(false);
    const auth = useContext(AuthContext);
    console.log({ page, hasNextPage, storesArr });

    const fetchStores = async (flag = false) => {
        console.log(`[+] Called Fetch stores`);
        try {
            const params = new URLSearchParams({
                search,
                ownername,
                staffname,
                page,
                limit,
            });

            const response = await sendRequest(
                `store/getstorebyfilter?${params.toString()}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            setHasNextPage(response.hasNextPage);
            setStoresArr(response.stores);
            setTotalCount(response.totalCount);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };

    useEffect(() => {
        fetchStores();
    }, [page]);

    const handleNextPage = () => {
        if (hasNextPage) setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };

    const handleEdit = (store) => {
        setSelectedStore(store);
        setModalOpen(true);
    };

    const handleUpdate = async () => {
        // console.log(selectedStore);

        try {
            setUpdatingStore(true);

            const updatedData = {
                name: selectedStore.name,
                phoneNumber: selectedStore.phoneNumber,
                revenueGenerated: selectedStore.revenueGenerated,
                pendingAmount: selectedStore.pendingAmount,
                dueAmount: selectedStore.dueAmount,
                location: selectedStore.location
            };
            console.log({ updatedData });
            const responseData = await sendRequest(
                'store/update/dashboard/' + selectedStore._id,
                'PUT',
                JSON.stringify(updatedData),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            toast.success(responseData.message);
            setModalOpen(false);
            setUpdatingStore(false);
        } catch (error) {
            toast.error(error.message);
            setUpdatingStore(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedStore((prevStore) => ({
            ...prevStore,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4 text-start text-md">Stores</h1>
            <div className="mb-4 flex gap-2 flex-col sm:flex-col md:flex-row lg:flex-row overflow-scroll">
                <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (page !== 1)
                            setPage(1);
                    }}
                />
                <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    type="text"
                    placeholder="Owner Name"
                    value={ownername}
                    onChange={(e) => {
                        setOwnername(e.target.value);
                        if (page !== 1)
                            setPage(1);
                    }}
                />
                <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    type="text"
                    placeholder="Staff Name"
                    value={staffname}
                    onChange={(e) => {
                        setStaffname(e.target.value);
                        if (page !== 1)
                            setPage(1);
                    }}
                />
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={fetchStores}
                >
                    Search
                </button>
            </div>
            <div className="py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto h-64 md:h-96 lg:h-100 w-full md:w-3/4 lg:w-full">
                {storesArr.length > 0 ? (
                    storesArr.map((store) => (
                        <div key={store._id} className="bg-white p-6 text-sm rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-sm md:text-xl lg:text-xl font-bold text-white bg-indigo-600 p-2 rounded">
                                    {store.name.toUpperCase()}
                                </h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700 text-xl"
                                    onClick={() => handleEdit(store)}
                                >
                                    <FaEdit />
                                </button>
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
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        onClick={() => console.log(store)}
                                    >
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
                    ))
                ) : (
                    <p className="text-center col-span-full">No stores found.</p>
                )}
            </div>
            <div className="mt-4 flex justify-between sm:justify-between md:justify-start lg:justify-start items-center space-x-4">
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    ←
                </button>
                <span className="text-xl">{page}</span>
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                >
                    →
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold mb-4">Edit Store</h2>
                        {selectedStore && (
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Store Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={selectedStore.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={selectedStore.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={selectedStore.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Revenue Generated</label>
                                    <input
                                        type="Number"
                                        name="revenueGenerated"
                                        value={selectedStore.revenueGenerated}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Pending Amount</label>
                                    <input
                                        type="pendingAmount"
                                        name="pendingAmount"
                                        value={selectedStore.pendingAmount}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Due Amount</label>
                                    <input
                                        type="dueAmount"
                                        name="dueAmount"
                                        value={selectedStore.dueAmount}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>




                                {/* <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={selectedStore.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div> */}
                                {/* <div className="mb-4">
                                    <label className="block text-gray-700">Owner Name</label>
                                    <input
                                        type="text"
                                        name="owner"
                                        disabled={true}
                                        value={selectedStore.owner.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div> */}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors mr-2"
                                        disabled={updatingStore}
                                        onClick={() => {
                                            setModalOpen(false);
                                            // toast('Canceled');
                                            toast.error('Canceled');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                                        onClick={handleUpdate}
                                        disabled={updatingStore}

                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stores;

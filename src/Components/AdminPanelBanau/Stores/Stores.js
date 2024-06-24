import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaDollarSign, FaExclamationCircle, FaHourglassHalf, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { store } from '../../AdminPanel/Dashboard/Home/homeStore';
import { IoMedalOutline } from "react-icons/io5";
import { IoMedalSharp } from "react-icons/io5";
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
    const auth = useContext(AuthContext);
    const [transactionLogs, setTransactionLogs] = useState({
        employee: auth.userID,
        pendingAmount: 0,
        dueAmount: 0,
        paymentReceived: 0,
        paymentGiven: 0,
        subscriptionStatus: 'Silver',
        logDescription: '',
        customerName: '',
        store: '',
        paymentMethod: 'Cash',
    });
    /* This Is For Duration To Update */
    const [duration, setDuration] = useState(
        {
            duration: ''
        }
    );

    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const [updatingStore, setUpdatingStore] = useState(false);

    console.log({ page, hasNextPage, storesArr, auth });

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
            if (!response)
                throw new Error('[+] No response');
            console.log({ response });
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


    /* This is for edit and will update the  */
    const handleEdit = (store) => {
        setSelectedStore(store);
        setTransactionLogs((prevLogs) => ({ ...prevLogs, store: store._id }));
        setTransactionLogs((prevLogs) => ({ ...prevLogs, subscriptionStatus: store.subscriptionStatus }));
        setModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            setUpdatingStore(true);
            /* This is to update the store*/
            const updatedData = {
                name: selectedStore.name,
                phoneNumber: selectedStore.phoneNumber,
                pendingAmount: selectedStore.pendingAmount,
                dueAmount: selectedStore.dueAmount,
                location: selectedStore.location,
                subscriptionStatus: transactionLogs.subscriptionStatus,

            };
            /* this is for transaction log */
            const transactionLog = {
                employee: transactionLogs.employee,
                subscriptionStatus: transactionLogs.subscriptionStatus,
                logDescription: transactionLogs.logDescription,
                customerName: transactionLogs.customerName,
                paymentMethod: updatedData.paymentMethod,
                dueAmount: updatedData.dueAmount,
                pendingAmount: transactionLogs.pendingAmount,
                paymentMethod: transactionLogs.paymentMethod,
                store: transactionLogs.store,
                paymentGiven: Number(transactionLogs.paymentGiven),
                paymentReceived: Number(transactionLogs.paymentReceived)
            };
            const data = {
                updatedData,
                transactionLog,
                duration
            };

            console.log({ updatedData, transactionLog, duration });
            const responseData = await sendRequest(
                'store/update/dashboard/banau/' + selectedStore._id,
                'PUT',
                JSON.stringify(data),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token,
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

    const handleInputChangev1 = (e, cb) => {
        const { name, value } = e.target;
        cb((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTransactionLogChange = (e) => {
        const { name, value } = e.target;
        setTransactionLogs((prevLogs) => ({
            ...prevLogs,
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
                        if (page !== 1) setPage(1);
                    }}
                />
                <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    type="text"
                    placeholder="Owner Name"
                    value={ownername}
                    onChange={(e) => {
                        setOwnername(e.target.value);
                        if (page !== 1) setPage(1);
                    }}
                />
                <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    type="text"
                    placeholder="Staff Name"
                    value={staffname}
                    onChange={(e) => {
                        setStaffname(e.target.value);
                        if (page !== 1) setPage(1);
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
                        <div key={store._id} className="bg-white p-6 text-sm rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-sm md:text-xl lg:text-xl font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded">
                                    {store.name.toUpperCase()}
                                </h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700 text-xl"
                                    onClick={() => handleEdit(store)}
                                >
                                    <FaEdit />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-5">
                                <div className="flex items-center text-gray-700">
                                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                                    <span>{store.location}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaUser className="mr-2 text-indigo-500" />
                                    <span>{store.owner.name}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaDollarSign className="mr-2 text-green-500" />
                                    <span>Revenue: <span className="text-green-500">{store.revenueGenerated}</span></span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaDollarSign className="mr-2 text-green-500" />
                                    <span>Amount From Store: <span className="text-green-500">{store.dueAmount}</span></span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaDollarSign className="mr-2 text-red-500" />
                                    <span>Amount To Store: <span className="text-red-500">{store.pendingAmount}</span></span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    {store.subscriptionStatus === 'Gold' && <IoMedalSharp className='text-yellow-400 mr-2' />}
                                    {store.subscriptionStatus === 'Silver' && <IoMedalSharp className='text-[#C0C0C0] mr-2' />}
                                    {store.subscriptionStatus === 'Platinum' && <IoMedalSharp className='text-[#E5E4E2] mr-2' />}
                                    <span>Status: {store.subscriptionStatus}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaHourglassHalf className="mr-2 text-[#C0C0C0]" />
                                    <span>Expiry: {new Date(store.subscriptionExpiry).toLocaleDateString()}</span>
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
                            <div className='grid grid-cols-1 md:grid-cols-1 gap-2 mt-5'>
                                <div className="flex items-center text-gray-700">
                                    <FaPhone className="mr-2 text-green-500" />
                                    <u className='text-blue-600 cursor-pointer'>{store.phoneNumber}</u>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaEnvelope className="mr-2 text-red-500" />
                                    <u className='text-blue-600 cursor-pointer'>{store.email}</u>
                                </div>
                            </div>
                            {store.staff.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mt-4">Staff:</h3>
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
                    <p className="text-center col-span-full text-gray-500">No stores found.</p>
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-sm">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 h-[50vh] md:h-[70vh] lg:h-[90vh] overflow-auto">
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
                                    <label className="block text-gray-700">Pending Amount</label>
                                    <input
                                        type="number"
                                        name="pendingAmount"
                                        value={selectedStore.pendingAmount}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Due Amount</label>
                                    <input
                                        type="number"
                                        name="dueAmount"
                                        value={selectedStore.dueAmount}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <h2 className="text-xl font-bold mb-4 mt-6">Transaction Logs</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Employee</label>
                                    <input
                                        type="text"
                                        name="employee"
                                        value={transactionLogs.employee}
                                        onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* <div className="mb-4">
                                    <label className="block text-gray-700">Pending Amount</label>
                                    <input
                                        type="number"
                                        name="pendingAmount"
                                        value={transactionLogs.pendingAmount}
                                        onChange={handleTransactionLogChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div> */}
                                {/* <div className="mb-4">
                                    <label className="block text-gray-700">Due Amount</label>
                                    <input
                                        type="number"
                                        name="dueAmount"
                                        value={transactionLogs.dueAmount}
                                        onChange={handleTransactionLogChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div> */}
                                <div className="mb-4">
                                    <label className="block text-gray-700">Payment Received</label>
                                    <input
                                        type="number"
                                        name="paymentReceived"
                                        value={transactionLogs.paymentReceived}
                                        // onChange={handleTransactionLogChange}
                                        onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Payment Given</label>
                                    <input
                                        type="number"
                                        name="paymentGiven"
                                        value={transactionLogs.paymentGiven}
                                        // onChange={handleTransactionLogChange}
                                        onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Subscription Status</label>
                                    <select
                                        name="subscriptionStatus"
                                        value={transactionLogs.subscriptionStatus}
                                        // onChange={handleTransactionLogChange}
                                        onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Silver">Silver</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Platinum">Platinum</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Duration</label>
                                    <select
                                        name="duration"
                                        value={duration.duration}
                                        // onChange={handleTransactionLogChange}
                                        onChange={(e) => handleInputChangev1(e, setDuration)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >

                                        <option value="">None</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quaterly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Log Description</label>
                                    <textarea
                                        name="logDescription"
                                        value={transactionLogs.logDescription}
                                        // onChange={handleTransactionLogChange}
                                        onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Customer Name</label>
                                    <input
                                        type="text"
                                        name="customerName"
                                        value={transactionLogs.customerName}
                                        onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Payment Method</label>
                                    <select
                                        name="paymentMethod"
                                        value={transactionLogs.paymentMethod}
                                        onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="Bank">Bank</option>
                                        <option value="Esewa">Esewa</option>
                                        <option value="Khalti">Khalti</option>
                                    </select>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors mr-2"
                                        disabled={updatingStore}
                                        onClick={() => {
                                            setModalOpen(false);
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
                                    {/* <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors ml-2"
                                        onClick={logTransactionState}
                                    >
                                        Log Transaction State
                                    </button> */}
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

import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaInfoCircle, FaStore, FaMoneyBillWave, FaDollarSign, FaExclamationCircle, FaHourglassHalf, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LogsCard from './LogsCard';
import { CiTextAlignJustify } from "react-icons/ci";

const TransactionLogs = () => {
    const [dataArr, setDataArr] = useState([]);
    const [search, setSearch] = useState('');
    const [employeename, setEmployeename] = useState('');
    const [storename, setStorename] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, onCloseError } = useFetch();

    console.log({ page, hasNextPage, dataArr, auth });

    const fetchTransactionLogs = async () => {
        console.log(`[+] Called Fetch Logs`);
        try {
            const params = new URLSearchParams({
                search,
                employeename,
                storename,
                page,
                limit,
            });

            const response = await sendRequest(
                `logs/getlogsbyfilter?${params.toString()}`,
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
            setDataArr(response.logs);
            setTotalCount(response.totalCount);
        } catch (error) {

            console.error('[+]Error fetching stores:', error);
        }
    };

    useEffect(() => {
        fetchTransactionLogs();
    }, [page]);

    const handleNextPage = () => {
        if (hasNextPage) setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
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
                    placeholder="Employee Name"
                    value={employeename}
                    onChange={(e) => {
                        setEmployeename(e.target.value);
                        if (page !== 1) setPage(1);
                    }}
                />
                <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    type="text"
                    placeholder="Store Name"
                    value={storename}
                    onChange={(e) => {
                        setStorename(e.target.value);
                        if (page !== 1) setPage(1);
                    }}
                />
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={fetchTransactionLogs}
                >
                    Search
                </button>
            </div>
            <div className="py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto h-64 md:h-96 lg:h-100 w-full md:w-3/4 lg:w-full">
                {dataArr.length > 0 ? (
                    dataArr.map((data) => (
                        <div key={data._id} className="bg-white p-6 text-sm rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-sm md:text-sm lg:text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded">
                                    {data._id}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-5">
                                <div className="text-gray-700 flex items-center">
                                    <FaUser className="mr-2 text-indigo-500" />
                                    <p className="text-sm font-medium">Employee: {data.employee.name}</p>
                                </div>
                                <div className="text-gray-700 flex items-center">
                                    <FaStore className="text-indigo-600 mr-2" />
                                    <p className="text-sm font-medium">Store: {data.store.name}</p>
                                </div>
                                <div className="text-gray-700 flex items-center">
                                    <FaMoneyBillWave className="text-green-600 mr-2" />
                                    <p className="text-sm font-medium">Method: {data.paymentMethod}</p>
                                </div>
                                <div className="text-gray-700 flex items-center">
                                    <FaDollarSign className="text-green-500 mr-2" />
                                    <p className="text-sm font-medium">Pending: ${data.pendingAmount}</p>
                                </div>
                                <div className="text-gray-700 flex items-center">
                                    <FaDollarSign className="text-red-500 mr-2" />
                                    <p className="text-sm font-medium">Due: ${data.dueAmount}</p>
                                </div>
                                <div className="text-gray-700 flex items-center">
                                    <FaDollarSign className="text-blue-500 mr-2" />
                                    <p className="text-sm font-medium">Received: ${data.paymentReceived}</p>
                                </div>
                                <div className="text-gray-700 flex items-center">
                                    <FaDollarSign className="text-yellow-500 mr-2" />
                                    <p className="text-sm font-medium">Given: ${data.paymentGiven}</p>
                                </div>
                                <div className="text-gray-700 flex items-center">
                                    <FaInfoCircle className="text-indigo-600 mr-2" />
                                    <p className="text-sm font-medium">Status: {data.subscriptionStatus}</p>
                                </div>
                            </div>
                            <div className="text-gray-700 flex items-center mt-4">
                                <CiTextAlignJustify className="text-indigo-600 mr-2" />
                                <p className="text-sm font-medium">Description</p>
                            </div>
                            <div className='text-gray-700 flex items-center mt-2'>
                                <div className='w-full h-[70px] overflow-auto bg-gray-100 p-2 rounded'>{data.logDescription}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No Logs found.</p>
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

        </div>
    );
};

export default TransactionLogs;

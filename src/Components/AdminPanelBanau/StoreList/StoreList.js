import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Hooks/AuthContext';
import { FaFilter } from 'react-icons/fa';
import useFetch from '../../../Hooks/useFetch';

const StoreList = () => {
    const auth = useContext(AuthContext);
    const [storeData, setStoreData] = useState([]);
    const [minSales, setMinSales] = useState('');
    const [maxSales, setMaxSales] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('asc');
    const [totalSales, setTotalSales] = useState(0);
    const { sendRequest, isLoading } = useFetch();

    const fetchStoreNames = async () => {
        try {
            const query = `?minSales=${minSales}&maxSales=${maxSales}&page=${page}&limit=${limit}&sort=${sort}`;
            const responseData = await sendRequest(
                `banau/getbanauAnalytics${query}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            setStoreData(responseData.stores);
            setTotalSales(responseData.totalSales);
        } catch (error) {
            console.error('Error fetching store names:', error);
        }
    };

    useEffect(() => {
        fetchStoreNames();
    }, [page, limit, sort]);

    const handleFilter = () => {
        fetchStoreNames();
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-gray-800">Total Revenue</h1>
                        <p className="text-2xl text-gray-600">Nrs {totalSales.toLocaleString()}</p>
                    </div>
                    <button
                        onClick={handleFilter}
                        className="mt-4 md:mt-0 p-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors flex items-center"
                    >
                        <FaFilter className="mr-2" /> Apply Filters
                    </button>
                </div>
                <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Min Sales:</label>
                        <input
                            type="number"
                            className="p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            value={minSales}
                            onChange={(e) => setMinSales(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Max Sales:</label>
                        <input
                            type="number"
                            className="p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            value={maxSales}
                            onChange={(e) => setMaxSales(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Sort By Revenue:</label>
                        <select
                            className="p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Items per page:</label>
                        <input
                            type="number"
                            className="p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                        />
                    </div>
                </div>
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {storeData.map((store, index) => (
                            <li
                                key={index}
                                className="border p-6 rounded shadow-lg hover:shadow-xl transition-shadow bg-white"
                            >
                                <h2 className="text-xl font-bold mb-2 text-gray-800">{store.storeName}</h2>
                                <p className="text-gray-600">Revenue: Nrs {store.revenueGenerated.toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="p-3 bg-gray-200 rounded shadow disabled:bg-gray-300 hover:bg-gray-300 transition-colors"
                    >
                        Previous
                    </button>
                    <p className="text-lg font-medium">Page {page}</p>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        className="p-3 bg-gray-200 rounded shadow hover:bg-gray-300 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoreList;

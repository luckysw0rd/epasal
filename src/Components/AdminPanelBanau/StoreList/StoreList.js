import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Hooks/AuthContext';
import { FaSortAmountUpAlt, FaSortAmountDownAlt, FaFilter } from 'react-icons/fa';
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
    }, [page, limit]);

    const handleFilter = () => {
        fetchStoreNames();
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Total Revenue</h1>
            <p1>{totalSales}</p1>
            <h1 className="text-2xl font-bold mb-4">Store Names</h1>
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
                <div className="flex flex-col">
                    <label className="mb-2">Min Sales:</label>
                    <input
                        type="number"
                        className="p-2 border rounded"
                        value={minSales}
                        onChange={(e) => setMinSales(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Max Sales:</label>
                    <input
                        type="number"
                        className="p-2 border rounded"
                        value={maxSales}
                        onChange={(e) => setMaxSales(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Sort By Revenue:</label>
                    <select
                        className="p-2 border rounded"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="mb-2">Items per page:</label>
                    <input
                        type="number"
                        className="p-2 border rounded"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleFilter}
                    className="p-2 bg-blue-500 text-white rounded flex items-center"
                >
                    <FaFilter className="mr-2" /> Apply Filters
                </button>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {storeData.map((store, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded shadow hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-lg font-bold">{store.storeName}</h2>
                            <p>Revenue: Nrs {store.revenueGenerated.toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="p-2 bg-gray-200 rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <p>Page {page}</p>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    className="p-2 bg-gray-200 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StoreList;

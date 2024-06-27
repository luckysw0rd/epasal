import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../../../../Hooks/useFetch';
import { AuthContext } from '../../../../Hooks/AuthContext';

const SalesGraph = ({ storeId }) => {
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext);
    const [selectedPeriod, setSelectedPeriod] = useState('month'); // Default to monthly
    const [chartDimensions, setChartDimensions] = useState({
        width: window.innerWidth < 768 ? 380 : 750,
        height: window.innerWidth < 768 ? 300 : 400,
    });
    const [data, setData] = useState([]);

    const handleResize = () => {
        setChartDimensions({
            width: window.innerWidth < 768 ? 380 : 750,
            height: window.innerWidth < 768 ? 300 : 400,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(
                    `store/get/graph/sales?storeId=${storeId}&period=${selectedPeriod}`,
                    'GET',
                    null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token,
                    }
                );
                // Ensure data is formatted correctly
                const formattedData = responseData.orders.map(order => ({
                    totalRevenue: order.totalRevenue,
                    periodKey: selectedPeriod === 'day' ? `Hour ${order._id.hour}` :
                                selectedPeriod === 'week' ? `Day ${order._id.dayOfWeek}` :
                                selectedPeriod === 'month' ? `Week ${order._id.week}` :
                                `Month ${order._id.month}`,
                }));
                setData(formattedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [storeId, selectedPeriod]);

    const handleChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const periodOptions = [
        { value: 'day', label: 'Daily', dataKey: 'hour' },
        { value: 'week', label: 'Weekly', dataKey: 'day' },
        { value: 'month', label: 'Monthly', dataKey: 'week' },
        { value: 'year', label: 'Yearly', dataKey: 'month' },
    ];

    const currentPeriod = periodOptions.find(option => option.value === selectedPeriod);

    return (
        <div className=''>
            <div className="flex px-6 pb-6 items-center justify-between">
                <h3 className="text-lg font-semibold text-[#888888] sm:ml-10">Sales Overview</h3>
                <div className='flex gap-10'>

                    <div className='hidden sm:flex items-center gap-5'>
                        <div className='w-4 h-4 rounded-full bg-blue-400'></div>
                        <h4 className="text-md font-semibold text-[#888888]">Earning</h4>
                    </div>

                    <div className='hidden sm:flex items-center gap-5'>
                        <div className='w-4 h-4 rounded-full bg-green-400'></div>
                        <h3 className="text-md font-semibold text-[#888888]">Profit</h3>
                    </div>

                </div>
                <div>
                </div>

                {/* DROPDOWN  */}
                <select
                    id="timePeriod"
                    value={selectedPeriod}
                    onChange={handleChange}
                    className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    {periodOptions.map(option => (
                        <option key={option.value} value={option.value} className="text-gray-900">
                            {option.label}
                        </option>
                    ))}
                </select>

            </div>

            {/* GRAPH  */}
            <ResponsiveContainer width="100%" height={chartDimensions.height}>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="totalRevenue" stroke="#000000" strokeWidth={2} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="periodKey" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>

        </div>  
    );
};

export default SalesGraph;

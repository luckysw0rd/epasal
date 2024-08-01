import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
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
                // const formattedData = responseData.orders.map(order => ({
                //     totalRevenue: order.totalRevenue,
                //     periodKey: selectedPeriod === 'day' ? `Hour ${order._id?.hour}` :
                //                 selectedPeriod === 'week' ? `Day ${order._id?.dayOfWeek}` :
                //                 selectedPeriod === 'month' ? `Week ${order.periodKey}` :
                //                 `Month ${order._id.month}`,
                // }));
                setData(responseData.orders);
            } catch (error) {
               console.error(error,"error in getting chart")
            }
        };
        fetchData();
    }, [storeId, selectedPeriod]);
    useEffect(()=>{console.log(data,"data")},[data])
    const handleChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const periodOptions = [
        {value:'hour',label:'Hourly',dataKey:'hour'},
        { value: 'day', label: 'Daily', dataKey: 'day' },
        { value: 'week', label: 'Weekly', dataKey: 'week' },
        { value: 'month', label: 'Monthly', dataKey: 'month' },
        { value: 'year', label: 'Yearly', dataKey: 'year' },
    ];

    const currentPeriod = periodOptions.find(option => option.value === selectedPeriod);

    return (
        <div className=''>
            <div className="flex px-6 pb-6 items-center justify-between">
                <h3 className="text-lg font-semibold text-[#888888] sm:ml-10">Sales Overview</h3>
                <div>
                    <p>Increase than Last {selectedPeriod}: { data?.length>1?data[1]?.totalRevenue-data[0]?.totalRevenue:0}</p>
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

         
            <div className='w-full'>
            <ResponsiveContainer width="100%" height={chartDimensions.height}>
                <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="periodKey" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="totalRevenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
           
            </div>
            {/* <div className="flex mx-auto my-auto justify-center items-center text-xl lg:text-3xl font-bold">......MORE TO COME.........</div> */}

        </div>  
    );
};

export default SalesGraph;

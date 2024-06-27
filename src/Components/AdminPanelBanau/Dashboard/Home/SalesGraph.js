import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useEffect, useState } from 'react';

const SalesGraph = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const [chartDimensions, setChartDimensions] = useState({
        width: window.innerWidth < 768 ? 380 : 750,
        height: window.innerWidth < 768 ? 300 : 400,
    });

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

    const handleChange = (event) => {
        setSelectedPeriod(event.target.value);
    };
    const data = {
        week: [
            { day: 'Mon', sales: 1500 },
            { day: 'Tue', sales: 2000 },
            { day: 'Wed', sales: 2500 },
            { day: 'Thu', sales: 1000 },
            { day: 'Fri', sales: 2100 },
        ],
        month: [
            { week: 'Week 1', sales: 1000 },
            { week: 'Week 2', sales: 1200 },
            { week: 'Week 3', sales: 1300 },
            { week: 'Week 4', sales: 1100 },
        ],
        year: [
            { month: 'Jan', sales: 4000 },
            { month: 'Feb', sales: 3800 },
            { month: 'Mar', sales: 4200 },
            { month: 'Apr', sales: 4500 },
            { month: 'May', sales: 4700 },
            { month: 'Jun', sales: 4400 },
            { month: 'Jul', sales: 4600 },
            { month: 'Aug', sales: 4800 },
            { month: 'Sep', sales: 4900 },
            { month: 'Oct', sales: 5100 },
            { month: 'Nov', sales: 5300 },
            { month: 'Dec', sales: 5500 },
        ],
    };
    const dataKey = selectedPeriod === 'year' ? 'month' : selectedPeriod === 'month' ? 'week' : 'day';

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
                    <option value="week" className="text-gray-900">Weekly</option>
                    <option value="month" className="text-gray-900">Monthly</option>
                    <option value="year" className="text-gray-900">Yearly</option>
                </select>

            </div>


            {/* GRAPH  */}
            <LineChart width={chartDimensions.width} height={chartDimensions.height} data={data[selectedPeriod]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="sales" stroke="#000000" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={dataKey} />
                <YAxis />
                <Tooltip />
            </LineChart>

        </div>
    );
};

export default SalesGraph;

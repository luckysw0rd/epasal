import React from 'react';
import { FaDollarSign, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { storeData } from './homeStore';

const DashboardCard = ({ title, value, icon }) => (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-full">
        <div className="flex items-center justify-center text-3xl text-blue-500 mb-2">
            {icon}
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-2xl font-semibold">{value}</p>
    </div>
);

const SmallCard = ({ title, value }) => (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md mb-6 w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-2xl font-semibold">{value}</p>
    </div>
);

const Home = () => {
    const { totalSales, totalOrders, totalCustomers, balance, mostSoldItem } = storeData;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <DashboardCard title="Total Sales" value={totalSales} icon={<FaDollarSign />} />
                    <DashboardCard title="Total Orders" value={totalOrders} icon={<FaShoppingCart />} />
                    <DashboardCard title="Total Customers" value={totalCustomers} icon={<FaUsers />} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col col-span-1">
                        <SmallCard title="Balance" value={balance} />
                        <SmallCard title="Most Sold Item" value={mostSoldItem} />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center justify-center bg-white p-4 rounded-lg shadow-md">
                        <p className="text-2xl font-semibold">Text Graph Placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

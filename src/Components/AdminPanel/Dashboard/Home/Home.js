import React from 'react';
import { IoAnalyticsSharp } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { RiUserFollowLine } from "react-icons/ri";
import { FiDollarSign } from "react-icons/fi";
import { TbBrandShopee } from "react-icons/tb";
import { LuWallet } from "react-icons/lu";

import { store } from "./homeStore"
import SalesGraph from './SalesGraph';

const Home = () => {
  const { revenueGenerated, salesChange, orders, dueAmount, pendingAmount, customers, balance, mostSold } = store
  return (
    <div className="grid gap-8 p-6 bg-white w-full rounded-lg">
      <div className=" grid grid-cols-3">

    {/* ROW SECTION  */}
        <div className="w-[320px] col-span-1">
          <div className="bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4 pt-4">
              <h3 className="text-lg font-semibold text-[#888888]">Revenue Generated</h3>
              <IoAnalyticsSharp size={25} className='text-green-500' />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">{revenueGenerated}</div>
                <div className='text-[#888888]'><span className="text-sm text-green-600">+ {salesChange} </span> from previous month</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[320px] col-span-1">
          <div className="bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4 pt-4">
              <h3 className="text-lg font-semibold text-[#888888]">Orders</h3>
              <TbReportAnalytics size={25} className='text-green-500' />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">{orders}</div>
                <div className="text-sm text-gray-500">this month</div>
              </div>

            </div>
          </div>
        </div>
        <div className="w-[320px] col-span-1">
          <div className="bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4 pt-4">
              <h3 className="text-lg font-semibold text-[#888888]">Customers</h3>
              <RiUserFollowLine size={25} className='text-green-500' />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">{customers}</div>
                <div className="text-sm text-gray-500">till this date</div>
              </div>

            </div>
          </div>
        </div>
      </div>


      {/* Column Section  */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-6">
          <div className="w-[320px] bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4">
              <h3 className="text-lg font-semibold text-[#888888]">Due Amount</h3>
              <FiDollarSign size={25} className='text-red-700' />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">Rs. {dueAmount}</div>
                <div className="text-sm text-[#888888]">Amount you need to pay to Banau </div>
                <button className='w-[60%] border border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-xl py-2 text-green-600'>
                  <div className="flex items-center text-bold justify-center gap-2">
                    Pay Now <LuWallet size={20} />
                  </div>
                </button>

              </div>
            </div>
          </div>

          <div className=" w-[320px] bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)] mt-6">
            <div className="flex justify-between px-4">
              <h3 className="text-lg font-semibold text-[#888888]">Pending Amount</h3>
              <FiDollarSign size={25} className='text-green-500' />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">Rs. {pendingAmount}</div>
                <div className="text-sm text-[#888888]">Amount will be transfered to you in 3 to 4 business days </div>              </div>
            </div>
          </div>

          <div className=" w-[320px] bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4 pt-4">
              <h3 className="text-lg font-semibold text-[#888888]">Most Sold</h3>
              <TbBrandShopee size={25} className='text-green-500' />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">{mostSold}</div>
                <div className='text-[#888888]'><span className="text-sm text-green-600">+ {salesChange} </span> from previous month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Section  */}
        <div className="w-full mx-5">
          <div className="bg-white rounded-lg h-full">
            <SalesGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;




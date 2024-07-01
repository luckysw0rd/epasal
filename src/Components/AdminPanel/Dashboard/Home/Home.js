import React, { useContext } from 'react';
import { IoAnalyticsSharp } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { RiUserFollowLine } from "react-icons/ri";
import { FiDollarSign } from "react-icons/fi";
import { TbBrandShopee } from "react-icons/tb";
import { LuWallet } from "react-icons/lu";
import useFetch from '../../../../Hooks/useFetch';
import { store } from "./homeStore";
import SalesGraph from './SalesGraph';
import { AuthContext } from '../../../../Hooks/AuthContext';

//store 1 needs to be store
const Home = ({ data }) => {
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const auth = useContext(AuthContext);
  const { revenueGenerated, salesChange, orders, dueAmount, pendingAmount, customers, balance, mostSold } = store;
  console.log({ home: data });

  const handleBuyNow = async () => {

    console.log(data);
    // Function to handle the purchase action with this card's details
    const bodyData = {
      amount: data?.dueAmount,
      payment_method: 'esewa',
      store: data._id
    };

    const success_url = process.env.REACT_APP_BASE_URL+'/esewa/dueAmount';
    try {
      const responseData = await sendRequest(
        'store/duepay/' + data._id,
        'PATCH',
        JSON.stringify({
          data: bodyData, success: success_url
        }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );
      console.log(responseData); // Handle response data as needed
      if (responseData.payment.payment_method === 'esewa') {
        esewaCall(responseData.formData);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const esewaCall = (formData) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };
  return (
    <div className="grid gap-8 bg-white w-full p-6 rounded-lg">
      <div className="grid grid-cols-1 w-full sm:grid-cols-3 justify-between gap-6">

        {/* ROW SECTION  */}
        <div className="w-full">
          <div className="w-full bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4 pt-4 ">
              <h3 className="text-lg font-semibold text-[#888888]">Revenue Generated</h3>
              <IoAnalyticsSharp size={25} className='text-green-700' />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">Rs. {data?.revenueGenerated ? data.revenueGenerated.toFixed(2) : '0.00'}</div>

                <div className='text-[#888888]'><span className="text-sm text-green-600">+ {salesChange} </span> from previous month</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between px-4 pt-4">
            <h3 className="text-lg font-semibold text-[#888888]">Customers</h3>
            <TbReportAnalytics size={25} className='text-green-700' />
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className='flex flex-col gap-5'>
              {/* This could be done using in more optimal way by conditional rendering and checking if the data actually exists or not */}
              <div className="text-2xl font-semibold">{data?.customers || 0}</div>
              <div className="text-sm text-gray-500">till this date</div>

            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between px-4 pt-4">
            <h3 className="text-lg font-semibold text-[#888888]">Orders</h3>
            <RiUserFollowLine size={25} className='text-green-700' />
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className='flex flex-col gap-5'>
              <div className="text-2xl font-semibold">{data?.orders?.length || 0}</div>
              <div className="text-sm text-gray-500">till this date</div>

            </div>
          </div>
        </div>
      </div>


      {/* Column Section  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 mb-5 justify-between gap-6">
          <div className="w-full bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4">
              <h3 className="text-lg font-semibold text-[#888888]">Due Amount</h3>
              <FiDollarSign size={25} className='text-red-700' />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">Rs. {data?.dueAmount ? parseFloat(data.dueAmount).toFixed(2) : '0.00'}</div>

                <div className="text-sm text-[#888888]">Amount you need to pay to Banau </div>
                <button className='w-[60%] border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-xl py-2 text-green-600'>
                  <div onClick={() => { handleBuyNow() }} className="flex items-center text-bold justify-center gap-2">
                    Pay Now <LuWallet size={20} />
                  </div>
                </button>

              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4">
              <h3 className="text-lg font-semibold text-[#888888]">Pending Amount</h3>
              <FiDollarSign size={25} className='text-green-500' />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">Rs. {data?.pendingAmount || 0}</div>
                <div className="text-sm text-[#888888]">Amount will be transfered to you in 3 to 4 business days </div>              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4">
              <h3 className="text-lg font-semibold text-[#888888]">Most Sold</h3>
              <TbBrandShopee size={25} className='text-green-500' />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className='flex flex-col gap-5'>
                <div className="text-2xl font-semibold">{data?.mostSoldItem?.name || 'Nothing'}</div>
                <div className='text-[#888888]'><span className="text-sm text-green-600">+ {salesChange} </span> from previous month</div>
              </div>
            </div>
          </div>
        </div>
        {/* Graph Section  */}
        <div className='-mx-6 sm:mx-0 md:col-span-2'>
          <div className="bg-white rounded-lg">
            <SalesGraph storeId={data._id} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;

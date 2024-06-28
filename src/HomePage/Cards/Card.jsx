import React from 'react'

const Card = () => {
    return (
        <div className='bg-white p-8 md:p-10 lg:p-16'>
            <div className="grid grid-cols-2 gap-5 p-4 ">
                <div className="h-[200px] bg-gray-800 border-none text-white py-4 px-8 rounded-xl flex  justify-between">
                    <div className='flex flex-col gap-5'>
                        <h2 className="text-2xl w-[65%] font-bold tracking-wider">Payment Gateway Integration</h2>
                        {/* <div className="flex gap-2 ">
                            <div className='w-[20%] bg-white rounded-lg text-black'>
                                <img src="https://via.placeholder.com/50" alt="eSewa" className="mr-2" />
                                hello
                            </div>
                            <div className='w-[20%] bg-white rounded-lg text-black'>
                                hello
                                <img src="https://via.placeholder.com/50" alt="fonepay" />
                            </div>
                        </div> */}
                    </div>
                    {/* <div>
                        <button className="text-2xl w-[60%]">&gt;</button>
                    </div> */}
                </div>

                <div className="h-[200px]  text-gray-800 border-2 border-gray-700 py-4 px-8 rounded-xl flex ">
                    <div>
                        <h2 className="text-2xl w-[60%] font-bold tracking-wider">Analytics</h2>
                        <p className="mt-1">Visualize your data for the ease of use. Stay up to date with your product info.</p>
                    </div>
                    <div className="ml-auto">
                        <img src="https://via.placeholder.com/100x50" alt="Analytics Graph" />
                    </div>
                </div>

                <div className="h-[200px] bg-white border-2 border-gray-700 text-black py-4 px-8 rounded-xl flex">
                    <h2 className="text-2xl w-[60%] font-bold tracking-wider">Manage Product and Inventory</h2>
                </div>

                <div className="h-[200px] bg-gray-800 border-none border-gray-800 text-white py-4 px-8 rounded-xl flex ">
                    <h2 className="text-2xl w-[60%] font-bold tracking-wider">Manage Employee and Staff</h2>
                </div>
            </div>

        </div>
    )
}

export default Card

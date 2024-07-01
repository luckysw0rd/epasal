import React from 'react'
import esewa from "../../Assets/esewa.png"
import fonepay from "../../Assets/fonepayfull.png"


const Card = () => {
    return (
        <div className='bg-white p-8 md:p-10 lg:p-16'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:p-4 ">
                <div className="h-[200px] bg-gray-800 border-none text-white py-4 px-8 rounded-xl flex  justify-between">
                    <div className='flex flex-col justify-between'>
                        <h2 className="text-lg md:text-xl lg:text-2xl md:w-[61%] font-bold tracking-wider">Payment Gateway <h1> Integration</h1></h2>
                        <div className="flex gap-5 mb-5 ">
                            <img src={esewa} alt="esewa" className='w-36 h-10 lg:w-48 lg:h-16' />
                            <img src={fonepay} alt="fonepay" className='w-36 h-10 lg:w-48 lg:h-16' />
                        </div>
                    </div>

                </div>

                <div className="h-[200px]  text-gray-800 border-2 border-gray-700 py-4 px-8 rounded-xl flex ">
                    <div>
                        <h2 className="text-lg md:text-xl lg:text-2xl md:w-[60%] font-bold tracking-wider">Analytics</h2>
                        <p className="mt-1">Visualize your data for the ease of use. Stay up to date with your product info.</p>
                    </div>

                </div>

                <div className="h-[200px] bg-white border-2 border-gray-700 text-black py-4 px-8 rounded-xl flex">
                    <h2 className="text-lg md:text-xl lg:text-2xl md:w-[60%] font-bold tracking-wider">Manage Product and Inventory</h2>
                </div>

                <div className="h-[200px] bg-gray-800 border-none border-gray-800 text-white py-4 px-8 rounded-xl flex ">
                    <h2 className="text-lg md:text-xl lg:text-2xl md:w-[60%] font-bold tracking-wider">Manage Employee and Staff</h2>
                </div>
            </div>

        </div>
    )
}

export default Card

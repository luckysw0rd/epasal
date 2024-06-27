import React from 'react'
import bannar from "../Assets/Group 117.png"
import storepic1 from "../Assets/Firefly1.png"
import storepic2 from "../Assets/storedesign2.png"
function Landingpage() {
  return (
    <div className="lg:flex h-screen ">
      <div className=" w-100 md:w-full lg:w-1/2 flex justify-between p-4 ">
      <div className="xl:pl-8 ">
      <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#303030] to-[#878787] ">WHY BANAU ?</h1>
      <div className="flex mb-4 justify-between">
  <div className= "w-full md:w-1/2 lg:w-full">       <img src={bannar} alt="Banau" className=" " />
        <p className="text-xs mb-4 text-[#828282] p-4 md:px-10 text-justify">
        Choose Banau for a seamless, customizable e-commerce solution that requires no coding,
        making it easy for anyone to create and manage their online store.
      </p>
      <div className="flex justify-center"> <button className="px-6 py-2 border px-auto text-xs border-black rounded-full">Get Started</button></div>
     </div>

        <div className ="hidden md:block w-full md:w-1/2  lg:w-full ">
     

{/* <ul className=" max-w-md space-y-4 text-base font-extrabold text-gray-500 list-disc list-inside dark:text-gray-400 text-transparent bg-clip-text bg-gradient-to-r from-[#303030] to-[#878787]">
    <li>
        Order Mangaement
    </li>
    <li>
        Inventory Mangaement
    </li>
    <li>
        Payment Gateway
    </li>
</ul> */}
<ul class="max-w-md space-y-4 text-base font-extrabold text-gray-500 list-disc list-inside dark:text-gray-400 text-transparent bg-clip-text bg-gradient-to-r from-[#303030] to-[#878787]">
    <li class="flex items-center">
        <span class="inline-block w-3 h-3 mr-2 rounded-full bg-[#303030]"></span> Order Management
    </li>
    <li class="flex items-center">
        <span class="inline-block w-3 h-3 mr-2 rounded-full bg-[#303030]"></span> Inventory Management
    </li>
    <li class="flex items-center">
        <span class="inline-block w-3 h-3 mr-2 rounded-full bg-[#303030]"></span> Payment Gateway
    </li>
</ul>

<div className='my-8 flex gap-2'>
  <div><p className="w-16 h-16 bg-[#262626] text-white text-base flex justify-center items-center font-bold rounded-lg"> 100 +</p><span className="text-[#262626] font-bold mx-2">Store</span></div>
  <div><p className="w-16 h-16 bg-[#262626] text-white text-base flex justify-center items-center font-bold rounded-lg"> 1 M </p><span className="text-[#262626] font-bold mx-2">Sales</span></div>
  <div><p className="w-16 h-16 bg-[#262626] text-white text-base flex justify-center items-center font-bold rounded-lg"> 3</p><span className="text-[#262626] font-bold mx-2">Countries</span></div>
</div>
    </div>
      </div>
     
    </div >
   
      </div>
   
    {/* <div className="w-1/2 text-white p-10">
      <div className="mb-4  bg-gray-900  rounded-lg">
        <img  className=" -z-10" src={storepic1}/>
       <section className="z-10 absolute">
       <h2 className="text-xl font-bold">Follow some steps to create your website</h2>
        <p>Watch the video tutorial to get started</p>
        <button className="mt-2 px-4 py-2 bg-gray-700 rounded-full">More <span className="mx-2">&gt;</span></button>
       </section>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="w-12 h-12 bg-gray-600 rounded-full my-2"></div>
        <p>Store 1</p>
      </div>
    </div> */}
    <div className=" w-100 lg:w-1/2 text-white p-4 ">
  <div className="mb-4 bg-gray-900 px-4 p-2 rounded-lg relative">
    <div
      className="absolute inset-0 bg-cover p-2 lg:p-4 bg-center rounded-2xl"
      style={{ backgroundImage: `url(${storepic2})` }}
    ></div>
    <section className="relative z-10 p-2 lg:p-4 ">
      <h2 className="text-base font-bold py-2">Follow some steps to create your website</h2>
      <p className="py-2 text-xs">Watch the video tutorial to get started</p>
      <button className="mt-2  px-2 md:px-4 py-2 bg-white text-black  text-xs rounded-full">
        More <span className="mx-2">&gt;</span>
      </button>
    </section>
  </div>
  <div className="bg-gray-800 p-2  lg:p-4 rounded-2xl"
   style={{ backgroundImage: `url(${storepic1})` }}>
    <div className="px-4">
    <div className="w-24 h-24 bg-white rounded-full my-2"></div>
    <p className="px-4 text-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Store 1</p>
    </div>
       
      </div>
</div>

  </div>
  )
}

export default Landingpage
import React from 'react'
import bannar from "../Assets/Group 117.png"
import storepic1 from "../Assets/Firefly1.png"
import storepic2 from "../Assets/storedesign2.png"
function Landingpage() {
  return (
    <div className="flex h-screen p-4">
      <div className=" w-1/2 flex justify-around">
      <div className="pl-8 ">
      <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#303030] to-[#878787] ">WHY BANAU ?</h1>
      <div className="flex mb-4 justify-between">
        <img src={bannar} alt="Banau" className="w-1/2 h-[200px] " />
        <div className ="">
     

<ul class="max-w-md space-y-4 text-xl font-extrabold text-gray-500 list-disc list-inside dark:text-gray-400 text-transparent bg-clip-text bg-gradient-to-r from-[#303030] to-[#878787]">
    <li>
        Order Mangaement
    </li>
    <li>
        Inventory Mangaement
    </li>
    <li>
        Payment Gateway
    </li>
</ul>

<div className='my-10 flex gap-2'>
  <div className="h-[64px] w-[64px] bg-[#262626] rounded-lg"> </div>
  <div className="h-[64px] w-[64px] bg-[#262626] rounded-lg"> </div>
  <div className="h-[64px] w-[64px] bg-[#262626] rounded-lg"> </div>
  <div className="h-[64px] w-[64px] bg-[#262626] rounded-lg"> </div>
</div>
    </div>
      </div>
      <p className="text-lg mb-4">
        Choose Banau for a seamless, customizable e-commerce solution that requires no coding,
        making it easy for anyone to create and manage their online store.
      </p>
      <button className="px-6 py-2 border border-black rounded-full">Get Started</button>
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
    <div className="w-1/2 text-white pl-8">
  <div className="mb-4 bg-gray-900 px-4 rounded-lg relative">
    <div
      className="absolute inset-0 bg-cover bg-center rounded-2xl"
      style={{ backgroundImage: `url(${storepic2})` }}
    ></div>
    <section className="relative z-10 p-4 ">
      <h2 className="text-xl font-bold py-2">Follow some steps to create your website</h2>
      <p className="py-2">Watch the video tutorial to get started</p>
      <button className="mt-2 px-4 py-2 bg-white text-black rounded-full">
        More <span className="mx-2">&gt;</span>
      </button>
    </section>
  </div>
  <div className="bg-gray-800 p-4 rounded-2xl"
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
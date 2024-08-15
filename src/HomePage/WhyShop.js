import React from 'react'
import WhyShopCard from './Cards/WhyShopCard'
import image1 from '../Assets/WhyShop/imageA.jpg'
import image2 from '../Assets/WhyShop/imageB.jpg'
import image3 from '../Assets/WhyShop/imageC.jpg'
import image4 from '../Assets/WhyShop/imageD.jpg'
const WhyShop = () => {
    const CardData=[{
        title:"Product Management",
        image:image1,
        description:'Effortlessly manage your products and drive your e-commerce success.'
    },{
        title:"Order Management",
        image:image2,
        description:'Effortlessly oversee orders and keep customer satisfaction on track'
    },{
        title:"Employee Management",
        image:image3,
        description:"Grant your team the tools to manage products and enhance your store's performance"
    },{
        title:"Inventory Management",
        image:image4,
        description:'Optimize your stock and keep your inventory in perfect balance'
    }]
  return (
    <div className='w-screen flex flex-col items-center'>
        <h4 className='font-bold text-[40px] w-full md:w-[95%] lg:w-[75%]'>Why Shopatbanau</h4>
        <div className='flex justify-between w-full md:w-[95%] lg:w-[1300px]'>
            {CardData.map((data,index)=><WhyShopCard data={data} index={index}/>)}
        </div>
    </div>
  )
}

export default WhyShop
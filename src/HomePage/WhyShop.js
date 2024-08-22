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
    <div className='w-screen flex flex-col items-center mt-5'>
        <h4 className='font-bold text-[20px] md:text-[40px] w-[98%] md:w-[95%] lg:w-[90%] text-center md:text-left'>Why Shopatbanau</h4>
        <div className=' grid grid-cols-2 md:grid-cols-4 justify-between w-[98%] md:w-[95%] lg:w-[90%] gap-2 my-4'>
            {CardData.map((data,index)=><WhyShopCard data={data} index={index}/>)}
        </div>
    </div>
  )
}

export default WhyShop
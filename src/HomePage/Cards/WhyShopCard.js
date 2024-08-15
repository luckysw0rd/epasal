import React, { useEffect, useRef } from 'react'
import {motion, useScroll} from 'framer-motion';
const WhyShopCard = ({data,index}) => {
    const ref=useRef(null);
  const {scrollYProgress}=useScroll({
    target:ref
  });
  useEffect(()=>{
    console.log(scrollYProgress,"scroll")
  },[scrollYProgress])
  return (
    <motion.div 
        // initial={{
        // y:((index===0)||(index===3)?-1250:-900),
        // rotate:index===0?-25:index===1?-40:index===2?40:index===3?25:0,
        // x:index===1?-200:index===2?200:0
        // }} 
        ref={ref}
        style={{opacity:scrollYProgress}}
        transition={{duration:2}}
        className='-z-10 bg-white flex flex-col items-center justify-center shrink rounded-2xl shadow-lg my-5 w-[240px] h-[310px] px-4 py-4'>
        <h3 className='font-bold'>{data.title}</h3>
        <img src={data.image} className='w-[146px]'/>
        <p className='text-center'>{data.description}</p>
    </motion.div>
  )
}

export default WhyShopCard
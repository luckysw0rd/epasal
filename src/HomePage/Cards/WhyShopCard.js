// import React, { useRef, useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';

// const WhyShopCard = ({ data, index }) => {
//   const ref = useRef(null);
//   const [isInView, setIsInView] = useState(false);
//   const { scrollYProgress } = useScroll();

//   // Detect when the element is in view
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsInView(entry.isIntersecting);
//       },
//       { threshold: 0.1 } // Adjust the threshold as needed
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//     };
//   }, [ref]);



//   return (
//     <motion.div
//       ref={ref}
//       style={{ y:useTransform(scrollYProgress, [0, 1], [1000, 0]) }}
//       transition={{ duration: 2 }}
//       className='relative bg-white flex flex-col items-center justify-center rounded-2xl shadow-lg my-5 w-[240px] h-[310px] px-4 py-4'
//     >
//       <h3 className='font-bold text-center'>{data.title}</h3>
//       <img src={data.image} alt={data.title} className='w-[146px] mb-2' />
//       <p className='text-center'>{data.description}</p>
//     </motion.div>
//   );
// };

// export default WhyShopCard;











import React, { useEffect, useRef,useState } from 'react'
import {motion, useScroll,useTransform,useAnimation} from 'framer-motion';
const WhyShopCard = ({data,index}) => {
    const ref=useRef(null);
  // const {scrollYProgress}=useScroll({
  //   target:ref
  // });
  const [scrollY, setScrollY] = useState(window.scrollY);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(-window.scrollY);
      console.log(window.scrollY)
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    // Use framer-motion's animation control to update the position
    controls.start({
      y: ((index===0)||(index===3)?(scrollY>-1050)?-1250-scrollY:0:(scrollY>-800)?-900-scrollY:0),
      x: index===1?(scrollY>-800)?-200:0:index===2?(scrollY>-800)?200:0:0,
      rotate:index===0?(scrollY>-1050)?-25:0:index===1?(scrollY>-800)?-40:0:index===2?(scrollY>-800)?40:0:index===3?(scrollY>-1050)?25:0:0,
      
      transition: { type: 'tween', stiffness: 500, damping: 25, duration: 0.5 }
    });
  }, [scrollY, controls]);
  return (
    <motion.div 
        // initial={{
          
        // y:((index===0)||(index===3)?-1250:-900),
        // rotate:index===0?-25:index===1?-40:index===2?40:index===3?25:0,
        // x:index===1?-200:index===2?200:0
        // }} 
        // animate={{
        //   y:0,
        //   rotate:0,
        //   x:0
        // }}
        animate={controls}
        ref={ref}
        // style={{y: scrollY,}}
        transition={{duration:2}}
        className='-z-10 bg-white flex flex-col items-center justify-center shrink rounded-2xl shadow-lg my-5 w-[240px] h-[310px] px-4 py-4'>
        <h3 className='font-bold'>{data.title}</h3>
        <img src={data.image} className='w-[146px]'/>
        <p className='text-center'>{data.description}</p>
    </motion.div>
  )
}

export default WhyShopCard


// import React, { useRef, useEffect } from 'react';
// import { motion, useAnimation, useTransform, useScroll } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// const WhyShopCard = ({ data, index }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true, // Trigger animation once when it first comes into view
//     threshold: 0.1 // Trigger when at least 10% of the element is visible
//   });

//   const controls = useAnimation();
//   const { scrollYProgress } = useScroll();
  
//   // Transform values based on scroll position
//   const y = useTransform(scrollYProgress, [0, 1], [(index === 0 || index === 3 ? -1250 : -900), 0]);
//   const rotate = useTransform(scrollYProgress, [0, 1], [index === 0 ? -25 : index === 1 ? -40 : index === 2 ? 40 : index === 3 ? 25 : 0, 0]);
//   const x = useTransform(scrollYProgress, [0, 1], [index === 1 ? -200 : index === 2 ? 200 : 0, 0]);

//   // Apply animations only when the element is in view
//   useEffect(() => {
//     if (inView) {
//       controls.start({
//         y,
//         rotate,
//         x
//       });
//     } else {
//       controls.stop();
//     }
//   }, [inView, controls, y, rotate, x]);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{
//         y: index === 0 || index === 3 ? -1250 : -900,
//         rotate: index === 0 ? -25 : index === 1 ? -40 : index === 2 ? 40 : index === 3 ? 25 : 0,
//         x: index === 1 ? -200 : index === 2 ? 200 : 0
//       }}
//       animate={controls}
//       transition={{ duration: 2 }}
//       className='-z-10 bg-white flex flex-col items-center justify-center shrink rounded-2xl shadow-lg my-5 w-[240px] h-[310px] px-4 py-4'
//     >
//       <h3 className='font-bold'>{data.title}</h3>
//       <img src={data.image} className='w-[146px]' alt={data.title} />
//       <p className='text-center'>{data.description}</p>
//     </motion.div>
//   );
// };

// export default WhyShopCard;


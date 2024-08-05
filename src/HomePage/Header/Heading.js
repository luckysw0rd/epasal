import React, { useEffect, useRef } from 'react'
import HeaderBg from '../../Assets/headerbg.jpg';

const Heading = ({ setnavbarImage }) => {
  const headingRef = useRef(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (!entry.isIntersecting) {
  //         
  //         setnavbarImage(true);
  //       } else {
  //         setnavbarImage(false);
  //       }
  //     },
  //     { threshold: 0 }
  //   );

  //   if (headingRef.current) {
  //     observer.observe(headingRef.current);
  //   }

  //   return () => {
  //     if (headingRef.current) {
  //       observer.unobserve(headingRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div ref={headingRef} className="relative">
      <img
        className="items-center fixed top-2 left-0 w-[98%] h-full object-cover -z-20 left-1/2 transform -translate-x-1/2 rounded-xl "
        src={HeaderBg}
        alt="Background"
      />
      <div className=" fixed left-0 w-[98%] h-full bg-black opacity-70 -z-10 top-2 left-1/2 transform -translate-x-1/2 rounded-xl"></div>
      <div className="relative z-0 h-[450px] text-white flex flex-col gap-5 items-center justify-center uppercase">
        <h3 className='text-3xl md:text-6xl font-semibold tracking-wide text-center'>Express Your <span className='font-Zen-Tokyo-Zoo font-normal'>Creativity</span></h3>
        <h1>
        <p className='text-sm md:text-base text-center'>Build Your Own Ecommerce Website</p>
        </h1>
      </div>



    </div>
  )
}

export default Heading

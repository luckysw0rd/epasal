import React, { useState } from 'react';
import Navbar from './Header/Navbar';
import SearchPage from '../SearchPage/SearchPage';
import './Homepage.css'

import Heading from './Header/Heading';
import Landingpage from './Landingpage';

import ghost from '../Assets/Ghost.png'
import { IoBagHandleOutline } from "react-icons/io5";





function HomePage() {

    const [navbarImage, setnavbarImage] = useState(false);

    window.addEventListener('scroll', function() {
        const scrollableDiv = document.getElementById('scrollableDiv');
        const distanceFromTop = scrollableDiv.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        console.log("distancefromtop:",distanceFromTop,", viewportHeight: 85 ",viewportHeight*0.01)
        if (distanceFromTop <= 220) { 
          scrollableDiv.classList.add('overflow-scroll','sticky');
        //   scrollableDiv.style.top = `0px`;
        } else {
          scrollableDiv.classList.remove('overflow-scroll','sticky');
        //   scrollableDiv.style.top = '';
        }
      });

    return (
        
        <div className="flex flex-col relative h-full"> 
            <Navbar navbarImage={navbarImage}></Navbar>

            <Heading setnavbarImage={setnavbarImage} />
            <div className='relative flex justify-center -mb-16 z-50'>
                <img src={ghost} className='-mt-[6px] absolute -z-10 h-40' />
                    <div className=' w-[130px] h-[130px] bg-[#8E410A] rounded-full border border-[15px] border-[#FEFBF6] flex flex-col items-center justify-center text-center font-bold text-white'>
                        <IoBagHandleOutline className='text-3xl mb-2' />
                        <p className='text-sm font-light'>Build Your Store</p>
                    </div>
                
            </div> 
            <div className='bg-white h-24 w-full z-10'></div>
            <div id='scrollableDiv' className=' h-[75vh] bg-white pt-32 relative'> 
                
                <Landingpage/>
            </div>

</div> 

    );
}

export default HomePage;





{/* <div className="">
          
          <div className='sticky top-0 h-[30px] bg-blue-500 navbar'>Navbar</div>
          <div className='h-[90vh] overflow-scroll'>
              <div className=''>
                  <div className='h-screen bg-red-400'>Hello</div>
             
                  <div className='h-[3000px] bg-green-400 w-screen'></div>
              <div className='h-10 bg-gray-500 w-screen'></div>
              <div className='h-10 bg-gray-500 w-screen'></div> 
              </div>
          </div>
        
          <div className='h-screen bg-slate-200'>Another Section</div>
      </div> */}
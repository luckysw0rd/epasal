import React, { useState } from 'react';
import Navbar from './Header/Navbar';
import SearchPage from '../SearchPage/SearchPage';
import DragdropSection from './DragDrop/DragdropSection';
import './Homepage.css'

import Heading from './Header/Heading';
import Landingpage from './Landingpage';

import ghost from '../Assets/Ghost.png'
import { IoBagHandleOutline } from "react-icons/io5";
import Card from "./Cards/Card"
import BanauTheme from './BanauTheme/BanauTheme';





function HomePage() {

    const [navbarImage, setnavbarImage] = useState(false);

    window.addEventListener('scroll', function () {
        const scrollableDiv = document.getElementById('scrollableDiv');
        const distanceFromTop = scrollableDiv.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        console.log("distancefromtop:", distanceFromTop, ", viewportHeight: 85 ", viewportHeight * 0.01)
        if (distanceFromTop <= 300) {
            scrollableDiv.classList.add('overflow-scroll', 'sticky');
            //   scrollableDiv.style.top = `0px`;
        } else {
            scrollableDiv.classList.remove('overflow-scroll', 'sticky');
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
            <div id='scrollableDiv' className=' h-[77vh] bg-white pt-32 relative'>

                <Landingpage />
                <DragdropSection />
                <Card />
                <BanauTheme />

            </div >
        </div>

    );
}

export default HomePage;

import React, { useState, useEffect } from 'react';
import Navbar from './Header/Navbar';
import SearchPage from '../SearchPage/SearchPage';
import DragdropSection from './DragDrop/DragdropSection';
import './Homepage.css'

import Heading from './Header/Heading';
import Landingpage from './Landingpage';
import SubscriptionPlans from './SubscriptionPlans';
import ghost from '../Assets/Ghost.png'
import { IoBagHandleOutline } from "react-icons/io5";
import Card from "./Cards/Card"
import BanauTheme from './BanauTheme/BanauTheme';
import { Link } from 'react-router-dom';



import ProgressBar from './ProgressBar';
import Footer from './Footer';
import DomainSection from './DomainSection';
import SkinSection from './SkinSelection';
import SliderNavbar from './SliderNavbar';
import StoreList from './StoreList';
function HomePage() {
    const [stores, setStores] = useState([]);
    useEffect(() => {

        abc();
    }, [])

    const [navbarImage, setnavbarImage] = useState(false);


    return (

        <div className="flex flex-col relative h-full items-center">
            <Navbar setStores={setStores} navbarImage={navbarImage}></Navbar>
            <Heading setnavbarImage={setnavbarImage} />
            <div className='relative flex justify-center  bg-white w-full'>
                {/* <img src={ghost} className='-mt-[50px] h-[80px] absolute -z-10 h-40' /> */}
                <div className="-mt-[76px] absolute -z-10 h-40 ">
                    <Link to='/buildstore' className='h-[120px] pointer-events-auto' target='_blank'>
                        <svg onClick={() => { console.log("object") }} height="80" viewBox="0 0 192 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M191.977 60C191.996 59.4258 192.006 58.8499 192.006 58.2724C165.852 58.2724 155.128 43.766 144.382 29.2289C133.589 14.63 122.774 0 96.286 0C69.1176 0 57.0831 15.3909 45.3837 30.3531C34.3184 44.5044 23.5529 58.2724 0.566406 58.2724C0.566406 58.8499 0.576045 59.4258 0.595213 60H191.977Z" fill="white" />
                        </svg>
                    </Link>
                </div>
                <div>
                    <Link to='/buildstore' className=' w-[110px] h-[110px] pointer-events-auto bg-orange-500 -mt-[60px] border border-8 border-white rounded-full flex flex-col items-center justify-center text-center font-bold text-white'>
                        <IoBagHandleOutline className='text-3xl mb-2' />
                        <p className='text-sm font-semibold'>Build</p>
                    </Link>
                </div>
            </div>
            <div className='bg-white h-4 w-screen  z-10'></div>

            <div className=' md:mt-0 w-full bg-white'>
                {stores &&
                    <StoreList stores={stores}></StoreList>}
                <Landingpage />

                <div className=' mt-60 md:mt-0'>
                    <DragdropSection
                    />
                </div>
                <Card />
                <BanauTheme />
                <SkinSection />
                {/* <DomainSection /> */}
                <SubscriptionPlans></SubscriptionPlans>
                <div className=' mt-[850px] md:mt-0'>
                    <SliderNavbar></SliderNavbar>
                    <ProgressBar></ProgressBar>
                </div>
                <Footer></Footer>
            </div>




        </div>


    );
}

export default HomePage;




function abc(liveChatSource) {

    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    // https://embed.tawk.to/66759d429d7f358570d20570/1i0tmsjtn
    s1.src = 'https://embed.tawk.to/66827eb5eaf3bd8d4d16c22f/1i1mrtts8';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);

};

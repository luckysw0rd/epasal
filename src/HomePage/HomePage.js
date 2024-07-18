import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Header/Navbar';
import SearchPage from '../SearchPage/SearchPage';
import DragdropSection from './DragDrop/DragdropSection';
import './Homepage.css';
import Heading from './Header/Heading';
import Landingpage from './Landingpage';
import SubscriptionPlans from './SubscriptionPlans';
import ghost from '../Assets/Ghost.png';
import { IoBagHandleOutline } from 'react-icons/io5';
import Card from './Cards/Card';
import BanauTheme from './BanauTheme/BanauTheme';
import ProgressBar from './ProgressBar';
import Footer from './Footer';
import DomainSection from './DomainSection';
import SkinSection from './SkinSelection';
import SliderNavbar from './SliderNavbar';
import StoreList from './StoreList'; // Import StoreList if it exists

function HomePage() {
    const [stores, setStores] = useState([]);
    const [livechatUrl, setLiveUrl] = useState('');
    const [navbarImage, setnavbarImage] = useState(false);

    useEffect(() => {
        if (window.location.pathname === '/') {
            abc();
        }
    }, [window.location.pathname]);



    return (
        <div className="flex flex-col relative h-full items-center">
            <Navbar setStores={setStores} navbarImage={navbarImage} />
            <Heading setnavbarImage={setnavbarImage} />
            <div className="relative flex justify-center z-40 bg-white w-full">
                <div className="-mt-[76px] h-[30vh] absolute -z-10">
                    <svg
                        height="80"
                        viewBox="0 0 192 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M191.977 60C191.996 59.4258 192.006 58.8499 192.006 58.2724C165.852 58.2724 155.128 43.766 144.382 29.2289C133.589 14.63 122.774 0 96.286 0C69.1176 0 57.0831 15.3909 45.3837 30.3531C34.3184 44.5044 23.5529 58.2724 0.566406 58.2724C0.566406 58.8499 0.576045 59.4258 0.595213 60H191.977Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <div>
                    <Link
                        to="/buildstore"
                        className="w-[110px] h-[110px] pointer-events-auto bg-orange-500 -mt-[60px] border border-8 border-white rounded-full flex flex-col items-center justify-center text-center font-bold text-white"
                    >
                        <IoBagHandleOutline className="text-3xl mb-2" />
                        <p className="text-sm font-semibold">Build</p>
                    </Link>
                </div>
            </div>
            <div className="bg-white h-4 w-screen z-10"></div>
            <div className="w-full flex flex-col gap-2 bg-white">
                {stores && <StoreList stores={stores} />}
                <Landingpage />
                <DragdropSection />
                <Card />
                <BanauTheme />
                <SkinSection />
                <SubscriptionPlans />
                <div className="mt-[1100px] md:mt-0">
                    <SliderNavbar />
                    <ProgressBar />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;

function abc(liveChatSource) {
    var s1 = document.createElement('script'),
        s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/66827eb5eaf3bd8d4d16c22f/1i1mrtts8';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
}

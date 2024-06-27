import React, { useState } from 'react';
import Navbar from './Header/Navbar';
import SearchPage from '../SearchPage/SearchPage';
import DragdropSection from './DragDrop/DragdropSection';
import './Homepage.css'

import Heading from './Header/Heading';
import Landingpage from './Landingpage';
function HomePage() {
    const [navbarImage, setnavbarImage] = useState(false);
    return (
        <div className="flex flex-col relative -z-30">
            {/* StickyNavbar */}
            <Navbar navbarImage={navbarImage}></Navbar>

            {/* <div className='mx-20'> */}
            <Heading setnavbarImage={setnavbarImage} />
            {/* </div> */}


            <Landingpage />

            <div className=' h-screen bg-white relative'>

                {/* <SearchPage /> */}
            </div>
            <DragdropSection />
        </div>
    );
}

export default HomePage;

import React, { useState } from 'react';
import Navbar from './Header/Navbar';
import SearchPage from '../SearchPage/SearchPage';
import './Homepage.css'

import Heading from './Header/Heading';
import Landingpage from './Landingpage';
function HomePage() {
    const [navbarImage, setnavbarImage] = useState(false);
    return (
        // <div className="flex flex-col relative ">
        //     <div className="sticky top-0 bg-white ">
        //         StickyNavbar
        //         <Navbar navbarImage={navbarImage} />
        //     </div>
        //     <div className='h-[100vh]'>
        //         <div className=''>
        //             <div className='h-screen bg-red-400'>Hello</div>
        //             {/* Uncomment and adjust other divs if needed */}
        //             <div className='h-[3000px] bg-green-400 w-screen'></div>
        //             <div className='h-10 bg-gray-500 w-screen'></div>
        //             <div className='h-10 bg-gray-500 w-screen'></div>
        //         </div>
        //     </div>
        //     <div className='mx-20'>
        //         <Heading setnavbarImage={setnavbarImage} />
        //     </div>

        //     <Landingpage />
        // </div>

        <div className="">
            {/* Main container */}
            <div className='sticky top-0 h-20 bg-blue-500 navbar'>Navbar</div>
        <div className='h-[100vh]'>
            <div className=''>
                <div className='h-[100vh] bg-red-400'>Hello</div>
                <div className=' h-30 bg-green-400 w-screen'></div>
            <div className='h-screen bg-slate-200'>Another Section</div>

            <div className='h-[100vh] bg-gray-500 w-screen'></div>
            <div className='h-10 bg-gray-500 w-screen'></div>
            </div>
        </div>
            {/* Another full-height section */}
        </div>

    );
}

export default HomePage;

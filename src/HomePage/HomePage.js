import React from 'react';
import Navbar from './Header/Navbar';
import SearchPage from '../SearchPage/SearchPage';
import Heading from './Header/Heading';
import Landingpage from './Landingpage';
function HomePage() {
    return (
        <div className="flex flex-col relative -z-30">
            {/* StickyNavbar */}
            <Navbar></Navbar>
            
            {/* <div className='mx-20'> */}
                <Heading/>
            {/* </div> */}
           
            
            <div className=' h-screen bg-white relative'>
                
                {/* <SearchPage /> */}
            </div>
            <Landingpage/>

        </div>
    );
}

export default HomePage;

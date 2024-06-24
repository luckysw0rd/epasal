import React from 'react';
import Navbar from './Navbar';
import SearchPage from '../SearchPage/SearchPage';
import Landingpage from './Landingpage';
function HomePage() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* StickyNavbar */}
            <Navbar></Navbar>
            <div className='  bg-[#FEFBF6]'>
                <SearchPage />
            
            </div>
            <Landingpage/>

        </div>
    );
}

export default HomePage;

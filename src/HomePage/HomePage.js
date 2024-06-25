import React from 'react';
import Navbar from './Navbar';
import SearchPage from '../SearchPage/SearchPage';
import DragdropSection from './DragDrop/DragdropSection';
function HomePage() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* StickyNavbar */}
            <Navbar></Navbar>
            <div className='  bg-[#FEFBF6]'>
                <SearchPage />
            </div>
            <DragdropSection />
        </div>
    );
}

export default HomePage;

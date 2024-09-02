import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Hooks/AuthContext';
import { MdSpaceDashboard } from "react-icons/md";

const StoreCard = ({ store, auth }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full max-w-sm bg-white shadow-lg rounded-3xl overflow-hidden m-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <img 
            src={store?.banner?.bannerUrl} 
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div 
          className={`absolute transition-all duration-300 ease-in-out ${
            isHovered 
              ? 'inset-0 flex items-center justify-center text-2xl font-bold'
              : 'top-3 left-3 text-sm'
          } bg-black bg-opacity-50 text-white px-2 py-1 rounded-md`}
        >
          {store.name}
        </div>
        <div className="absolute bottom-0 right-0 rounded-tl-3xl overflow-hidden">
          <div 
            className={`bg-white flex items-center justify-center transition-all duration-300 ease-in-out ${isHovered ? 'w-36' : 'w-12'} h-12`}
          >
            <Link 
              to={`/store/${store.name}`}
              target='_blank'
              className="bg-white text-black text-xl h-12 rounded-tl-3xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 w-full"
            >
              {isHovered ? (
                <span className="text-sm font-semibold">Visit Store ➚</span>
              ) : (
                <span>➚</span>
              )}
            </Link>
          </div>
        </div>
        {auth.isLoggedIn && (
          <div className="absolute top-0 right-0 rounded-bl-3xl overflow-hidden">
            <div 
              className={`bg-white flex items-center justify-center transition-all duration-300 ease-in-out ${isHovered ? 'w-36' : 'w-12'} h-12`}
            >
              <Link 
                to={`/adminpanel/${store.name}`}
                className="bg-white text-black text-xl h-12 rounded-bl-3xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 w-full"
              >
                {isHovered ? (
                 <span className="text-sm font-semibold flex items-center gap-1">Dashboard<MdSpaceDashboard /></span>
                ) : (
                  <span><MdSpaceDashboard /></span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StoreList = ({ stores }) => {
  const auth = useContext(AuthContext);
  return (
    <div className="mb-10 px-4 flex flex-col items-center" id='scrollStoreList'>
      <h2 className="font-bold text-[20px] md:text-[40px] w-[98%] md:w-[95%] lg:w-[90%] text-center md:text-left z-30">
        {auth.isLoggedIn ? "My Stores" : "Trending Stores"}
      </h2>
      <div className="flex justify-center flex-wrap -m-4 w-full">
        {stores.length > 0 ? stores.map(store => (
          <StoreCard key={store._id} store={store} auth={auth} />
        )) : <div className='text-center text-gray-400 text-xl my-20'>Store Unavailable</div>}
      </div>
    </div>
  );
};

export default StoreList;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Hooks/AuthContext';

const StoreCard = ({ store, auth }) => {

    return (
        <div className="max-w-md rounded-lg overflow-hidden shadow-lg m-4 relative  border-1 border-gray-900">
            <img className="w-[500px] h-[320px] object-cover text-center items-center font-bold" src={store?.banner?.bannerUrl} alt={store.name} />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-tr-lg">
                {store.name}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white px-4 py-4 flex justify-between items-center ">
                {auth.isLoggedIn && (
                    <Link to={`/adminpanel/${store.name}`}  className="">
                        Dashboard
                    </Link>)
                }
                <Link to={`/store/${store.name}`} target='_blank' className="">
                    Go to Store ➔
                </Link>
            </div>
        </div>
    );
};

const StoreList = ({ stores }) => {

    const auth = useContext(AuthContext);
    return (
        <div className="mb-10 overflow-x-auto">
            {auth.isLoggedIn &&
                <h2 className="text-2xl text-center text-[#141414] mb-6 font-bold">My Stores</h2>
            }
            {!auth.isLoggedIn &&
                <h2 className="text-2xl text-center text-[#141414] mb-6 font-bold">Trending Stores</h2>
            }
            <div className="flex justify-center flex-wrap">
                {stores.map(store => (
                    <StoreCard key={store._id} store={store} auth={auth} />
                ))}
            </div>
        </div>
    );
};

export default StoreList;

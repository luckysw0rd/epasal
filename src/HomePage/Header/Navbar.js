import React, { useState, useEffect, useContext } from 'react';
import Logo from '../../Assets/logo.png';
import { FaSearch } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Hooks/AuthContext';
import useFetch from '../../Hooks/useFetch';
import { IoLogOut } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { RiPriceTagLine } from "react-icons/ri";
const Navbar = ({ navbarImage, setStores }) => {
    const [isRotated, setIsRotated] = useState(false);
    const [isStoreOpen, setIsStoreOpen] = useState(false)
    const [searchHide,setSearchHide]=useState(true)
    const [userStore, setUserStore] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState([])
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const handleClick = () => {
        setIsRotated(!isRotated);
    };
    const handleClickStore = () => {

        setIsStoreOpen(!isStoreOpen)
    }


    const [scrolledFromTop, setScrolledFromTop] = useState(false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    console.log(auth.token, "this is the token")

    const fetchUserInfo = async () => {
        try {
            const responseData = await sendRequest(
                'users/getStore/',
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            // Handle response data as needed
            setUserStore(responseData.stores);
            setStores(responseData.stores);
            auth.setStore(responseData.stores)

        } catch (error) {
            // Handle error if needed


        }
    }

    const fetchTrendingStore = async () => {
        try {
            const responseData = await sendRequest(
                'banau/trendingStore/',
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + auth.token,
                }
            );
            // Handle response data as needed
            // setUserStore(responseData.stores);
            setStores(responseData.stores);
        } catch (error) {
            // Handle error if needed


        }
    }

    useEffect(() => {
        if (auth.isLoggedIn) {
            fetchUserInfo()
        } else {
            fetchTrendingStore()
        }
    }, [])

    const searchStore = async (e) => {
        e.preventDefault();
        if(searchHide){
            setSearchHide(false);
            return;
        }
        if (searchTerm === '') {
            setSearchHide(true);
            return;
        }
        try {

            const responseData = await sendRequest(
                `store/getstorebyfilter?limit=${4}&search=${searchTerm}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            // Handle response data as needed
            setSearchData(responseData.stores)
        } catch (error) {
            // Handle error if needed


        }
    }

    return (
        <div className={`py-3 absolute z-30 top-0 left-0 flex justify-between w-[98%] relative ${scrolledFromTop ? '' : 'bg-transparent'} transition duration-500 rounded-xl grid grid-cols-2 lg:grid-cols-3`} >
            <div className='flex items-center font-bold text-[#393939] gap-1 md:gap-2' onClick={(e)=>{e.preventDefault();navigate('/')}}>
                <img src={Logo} className='h-[40px] md:h-[50px]'/>
                <div>Shop at Banau</div>
            </div>
            <div className='w-full hidden lg:block '>
                <ul className='flex justify-between items-center h-full'>
                    <li className='border-b-4 border-black px-3'>Home</li>
                    <li className='px-3'>Contact Us</li>
                    <li className='px-3'>Subscription</li>
                    <li className='px-3'>FAQ</li>
                </ul>
            </div>
            <div className='flex justify-end gap-2 md:gap-5 mr-0 md:mr-10 items-center'>
            
                {/* <div className='h-[38px] w-[38px] border-4 border-[#FF9E00] rounded-full flex items-center justify-center shadow-inner-dark hidden md:flex'><FaSearch/></div> */}
                <Link to='/buildStore' target='_blank' className='bg-[#112D4E] h-[40px] w-[104px] rounded-full flex items-center justify-center text-white pl-4 gap-2 text-sm md:text-base'>Build <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /><path d="M19 16v6" /></svg></Link>
                {!auth.token && <div onClick={() => { navigate('/login') }} className='bg-[#112D4E] h-[40px] w-[104px] rounded-full flex justify-center items-center text-white pl-4 gap-2 text-sm md:text-base'>
                                    Login
                                    <IoIosLogIn/>
                                </div>}
                                {auth.token && <div onClick={() => { auth.logout(); }} className='bg-[#112D4E] h-[40px] w-[104px] rounded-full flex items-center text-white pl-4 gap-2'>
                                    Logout
                                    <IoLogOut/>
                                </div>}
            </div>

        </div>
    );
}

export default Navbar;
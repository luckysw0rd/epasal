import React, { useState, useEffect, useContext } from 'react';
import Logo from '../../Assets/banau.png';
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
    const [mouseHover, setMouseHover] = useState(false);
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
    console.log(auth.token,"this is the token")

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
        if(searchTerm===''){
            return
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
        <div className={`py-3 absolute z-50 top-0 left-0  w-[98%] relative ${scrolledFromTop ? '' : 'bg-transparent'} transition duration-500 rounded-xl`} >


            <div className='relative z-20 mx-auto w-full md:w-[90%] flex justify-between'>
                {/* <div><img src={Logo} alt="Logo" /></div> */}
                <div className='flex items-center gap-10 pl-4 md:pl-0'>
                    <svg width="103" height="56" viewBox="0 0 730 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 333.884V63.3499C0 44.5341 23.6191 36.1297 35.5046 50.7164L146.753 187.248C152.791 194.657 152.742 205.303 146.637 212.656L35.3881 346.659C23.4278 361.066 0 352.609 0 333.884Z" fill="#F4BD8A" />
                        <path d="M190.59 171.429H155.947C149.924 171.429 144.222 168.715 140.425 164.04L33.638 32.6119C23.0183 19.5416 32.3195 0 49.1603 0H219.266C225.166 0 230.764 2.60464 234.564 7.11723L274.959 55.0858C281.187 62.4809 281.233 73.2719 275.069 80.72L205.998 164.18C202.199 168.771 196.55 171.429 190.59 171.429Z" fill="url(#paint0_linear_342_32)" />
                        <path d="M190.59 228.571H155.947C149.924 228.571 144.222 231.285 140.425 235.96L33.638 367.388C23.0183 380.458 32.3195 400 49.1603 400H219.266C225.166 400 230.764 397.395 234.564 392.883L274.959 344.914C281.187 337.519 281.233 326.728 275.069 319.28L205.998 235.82C202.199 231.229 196.55 228.571 190.59 228.571Z" fill="url(#paint1_linear_342_32)" />
                        <path d="M237.616 138.672C254.512 134.213 269.237 131.984 281.792 131.984C308.661 131.984 322.096 141.312 322.096 159.968C322.096 171.349 316.757 180.032 306.08 186.016C313.237 187.776 319.163 191.179 323.856 196.224C328.549 201.152 330.896 207.371 330.896 214.88C330.896 228.96 325.675 239.872 315.232 247.616C304.789 255.243 291.883 259.056 276.512 259.056C261.141 259.056 247.824 256.005 236.56 249.904C240.197 237.232 242.016 220.16 242.016 198.688C242.016 177.099 240.549 157.093 237.616 138.672ZM264.192 240.048C269.355 241.691 274.517 242.512 279.68 242.512C287.776 242.512 294.464 240.517 299.744 236.528C305.024 232.421 307.664 226.672 307.664 219.28C307.664 205.2 300.037 198.16 284.784 198.16C277.509 198.16 270.117 199.685 262.608 202.736C262.608 214.587 263.136 227.024 264.192 240.048ZM262.432 187.248C264.075 186.896 266.48 186.485 269.648 186.016C272.933 185.547 275.456 185.136 277.216 184.784C278.976 184.432 281.147 183.904 283.728 183.2C286.427 182.496 288.48 181.675 289.888 180.736C291.413 179.68 292.939 178.389 294.464 176.864C297.397 173.931 298.864 169.648 298.864 164.016C298.864 153.104 292.352 147.648 279.328 147.648C275.104 147.648 269.941 148.352 263.84 149.76C262.901 173.813 262.432 186.309 262.432 187.248ZM427.475 175.104C424.307 188.597 422.723 202.149 422.723 215.76C422.723 229.253 424.248 242.629 427.299 255.888C423.075 257.296 418.733 258 414.275 258C409.816 258 406.707 256.709 404.947 254.128C403.187 251.429 402.307 247.616 402.307 242.688C402.307 237.643 403.069 230.779 404.595 222.096C396.264 239.931 388.227 251.195 380.483 255.888C376.963 258 373.325 259.056 369.571 259.056C360.653 259.056 353.731 255.771 348.803 249.2C343.875 242.512 341.411 234.24 341.411 224.384C341.411 209.365 345.576 196.224 353.907 184.96C362.237 173.579 373.032 167.888 386.291 167.888C399.667 167.888 413.395 170.293 427.475 175.104ZM404.419 185.664C398.2 183.787 392.92 182.848 388.579 182.848C379.779 182.848 373.208 184.784 368.867 188.656C364.877 198.512 362.883 208.544 362.883 218.752C362.883 224.149 363.704 229.605 365.347 235.12C367.107 240.635 369.747 243.392 373.267 243.392C377.373 243.392 382.653 237.349 389.107 225.264C395.56 213.179 400.664 199.979 404.419 185.664ZM524.965 186.896L523.205 225.616C523.205 236.293 524.848 246.736 528.133 256.944C524.848 258.352 521.093 259.056 516.869 259.056C506.896 259.056 501.909 253.483 501.909 242.336C501.909 237.291 502.554 228.843 503.845 216.992C505.136 205.024 505.781 197.515 505.781 194.464C505.781 188.597 503.141 185.664 497.861 185.664C493.989 185.664 489.589 188.48 484.661 194.112C479.85 199.627 475.685 205.845 472.165 212.768C468.762 219.573 466.768 225.205 466.181 229.664C466.65 238.816 467.824 247.557 469.701 255.888C465.946 257.296 462.016 258 457.909 258C453.92 258 450.634 257.061 448.053 255.184C445.589 253.189 444.357 250.491 444.357 247.088C444.357 243.568 444.885 237.349 445.941 228.432C446.997 219.397 447.525 210.48 447.525 201.68C447.525 192.763 446.176 182.555 443.477 171.056C447.232 169.648 451.221 168.944 455.445 168.944C459.669 168.944 463.072 170.176 465.653 172.64C468.352 175.104 469.701 178.155 469.701 181.792C469.701 185.429 469.232 191.237 468.293 199.216C472.752 190.885 478.56 183.611 485.717 177.392C492.874 171.056 500.032 167.888 507.189 167.888C519.04 167.888 524.965 174.224 524.965 186.896ZM626.506 175.104C623.338 188.597 621.754 202.149 621.754 215.76C621.754 229.253 623.279 242.629 626.33 255.888C622.106 257.296 617.765 258 613.306 258C608.847 258 605.738 256.709 603.978 254.128C602.218 251.429 601.338 247.616 601.338 242.688C601.338 237.643 602.101 230.779 603.626 222.096C595.295 239.931 587.258 251.195 579.514 255.888C575.994 258 572.357 259.056 568.602 259.056C559.685 259.056 552.762 255.771 547.834 249.2C542.906 242.512 540.442 234.24 540.442 224.384C540.442 209.365 544.607 196.224 552.938 184.96C561.269 173.579 572.063 167.888 585.322 167.888C598.698 167.888 612.426 170.293 626.506 175.104ZM603.45 185.664C597.231 183.787 591.951 182.848 587.61 182.848C578.81 182.848 572.239 184.784 567.898 188.656C563.909 198.512 561.914 208.544 561.914 218.752C561.914 224.149 562.735 229.605 564.378 235.12C566.138 240.635 568.778 243.392 572.298 243.392C576.405 243.392 581.685 237.349 588.138 225.264C594.591 213.179 599.695 199.979 603.45 185.664ZM643.916 240.048L645.676 203.44C645.676 192.059 644.033 181.264 640.748 171.056C644.033 169.648 648.081 168.944 652.892 168.944C662.279 168.944 666.972 174.165 666.972 184.608C666.972 190.475 666.327 198.747 665.036 209.424C663.745 219.984 663.1 227.669 663.1 232.48C663.1 238.347 665.74 241.28 671.02 241.28C674.188 241.28 677.884 238.64 682.108 233.36C686.449 227.963 690.145 221.979 693.196 215.408C696.364 208.72 698.241 203.264 698.828 199.04C698.124 186.133 697.127 176.805 695.836 171.056C699.591 169.648 703.404 168.944 707.276 168.944C711.265 168.944 714.551 170.176 717.132 172.64C719.831 175.104 721.18 178.155 721.18 181.792C721.18 185.429 720.652 191.472 719.596 199.92C718.54 208.368 718.012 217.227 718.012 226.496C718.012 235.648 719.068 245.445 721.18 255.888C716.604 257.296 712.497 258 708.86 258C701.585 258 697.948 253.189 697.948 243.568C697.948 239.344 698.417 233.477 699.356 225.968C694.663 235.941 688.913 243.979 682.108 250.08C675.42 256.064 668.615 259.056 661.692 259.056C649.841 259.056 643.916 252.72 643.916 240.048Z" fill="white" />
                        <path d="M128.032 111.192C128.117 110.765 128.16 110.328 128.16 109.88C128.16 107.811 127.147 106.776 125.12 106.776C124.203 106.776 123.424 106.968 122.784 107.352C122.187 108.056 121.888 108.899 121.888 109.88C121.888 110.52 122.165 111.075 122.72 111.544C123.275 111.992 123.957 112.344 124.768 112.6C125.6 112.856 126.496 113.176 127.456 113.56C128.416 113.944 129.301 114.36 130.112 114.808C130.944 115.235 131.637 115.885 132.192 116.76C132.747 117.613 133.024 118.627 133.024 119.8C133.024 122.04 132.16 123.864 130.432 125.272C128.725 126.68 126.667 127.384 124.256 127.384C122.315 127.384 120.661 126.904 119.296 125.944C117.952 124.963 117.28 123.597 117.28 121.848C117.28 120.952 117.547 120.205 118.08 119.608C118.635 118.989 119.285 118.68 120.032 118.68C120.8 118.68 121.365 118.776 121.728 118.968C121.557 119.608 121.472 120.184 121.472 120.696C121.472 121.848 121.792 122.765 122.432 123.448C123.093 124.109 124 124.44 125.152 124.44C126.304 124.44 127.232 124.141 127.936 123.544C128.64 122.947 128.992 122.157 128.992 121.176C128.992 120.173 128.597 119.352 127.808 118.712C127.04 118.072 126.101 117.56 124.992 117.176C123.883 116.792 122.773 116.387 121.664 115.96C120.555 115.533 119.605 114.904 118.816 114.072C118.048 113.219 117.664 112.152 117.664 110.872C117.664 108.867 118.528 107.203 120.256 105.88C122.005 104.557 123.979 103.896 126.176 103.896C127.797 103.896 129.195 104.227 130.368 104.888C131.563 105.528 132.16 106.509 132.16 107.832C132.16 108.792 131.851 109.613 131.232 110.296C130.613 110.957 129.835 111.288 128.896 111.288C128.64 111.288 128.352 111.256 128.032 111.192ZM150.417 114.072L150.097 121.112C150.097 122.989 150.406 124.888 151.025 126.808C150.363 127.064 149.691 127.192 149.009 127.192C147.153 127.192 146.225 126.211 146.225 124.248C146.225 122.797 146.353 121.091 146.609 119.128C146.865 117.165 146.993 115.96 146.993 115.512C146.993 114.403 146.491 113.848 145.489 113.848C144.422 113.848 143.238 114.851 141.937 116.856C140.635 118.84 139.889 120.504 139.697 121.848C139.739 122.467 139.953 124.056 140.337 126.616C139.675 126.872 138.95 127 138.161 127C136.518 127 135.697 126.2 135.697 124.6C135.697 123.832 135.814 122.328 136.049 120.088C136.283 117.827 136.401 116.013 136.401 114.648C136.401 110.104 136.145 106.349 135.633 103.384C136.315 103.128 137.019 103 137.745 103C138.47 103 139.067 103.245 139.537 103.736C140.027 104.205 140.273 104.856 140.273 105.688C140.273 106.52 140.155 108.237 139.921 110.84C139.707 113.443 139.601 115.469 139.601 116.92C140.347 115.341 141.435 113.901 142.865 112.6C144.315 111.277 145.755 110.616 147.185 110.616C149.339 110.616 150.417 111.768 150.417 114.072ZM160.113 127.384C157.766 127.384 156.038 126.701 154.929 125.336C153.82 123.949 153.265 122.029 153.265 119.576C153.265 117.101 154.001 114.957 155.473 113.144C156.945 111.331 158.833 110.424 161.137 110.424C165.873 110.424 168.241 113.091 168.241 118.424C168.241 120.92 167.473 123.043 165.937 124.792C164.401 126.52 162.46 127.384 160.113 127.384ZM157.809 113.944C157.425 115.181 157.233 116.419 157.233 117.656C157.233 118.893 157.276 119.853 157.361 120.536C157.446 121.219 157.606 121.901 157.841 122.584C158.332 123.971 159.292 124.664 160.721 124.664C162.172 124.664 163.121 124.28 163.569 123.512C164.038 122.744 164.273 121.56 164.273 119.96C164.273 115.416 163.196 113.144 161.041 113.144C159.804 113.144 158.726 113.411 157.809 113.944ZM174.886 123.864C175.76 124.184 176.774 124.344 177.926 124.344C179.078 124.344 180.091 124.12 180.966 123.672C182.011 121.88 182.534 119.736 182.534 117.24C182.534 114.723 182.096 113.464 181.222 113.464C180.134 113.464 178.907 114.563 177.542 116.76C176.198 118.957 175.312 121.325 174.886 123.864ZM174.886 117.304C177.147 112.845 179.654 110.616 182.406 110.616C183.856 110.616 184.891 111.213 185.51 112.408C186.15 113.581 186.47 115.075 186.47 116.888C186.47 119.491 185.702 121.859 184.166 123.992C182.63 126.125 180.699 127.192 178.374 127.192C177.051 127.192 175.846 126.979 174.758 126.552C174.8 129.475 174.982 132.152 175.302 134.584C174.619 134.84 173.915 134.968 173.19 134.968C172.464 134.968 171.867 134.723 171.398 134.232C170.928 133.763 170.694 133.037 170.694 132.056C170.694 131.075 170.822 129.4 171.078 127.032C171.334 124.664 171.462 122.808 171.462 121.464C171.462 117.027 171.227 113.603 170.758 111.192C171.44 110.936 172.155 110.808 172.902 110.808C173.67 110.808 174.256 111.032 174.662 111.48C175.088 111.907 175.302 112.589 175.302 113.528C175.302 114.445 175.163 115.704 174.886 117.304ZM212.757 111.928C212.181 114.381 211.893 116.845 211.893 119.32C211.893 121.773 212.17 124.205 212.725 126.616C211.957 126.872 211.167 127 210.357 127C209.546 127 208.981 126.765 208.661 126.296C208.341 125.805 208.181 125.112 208.181 124.216C208.181 123.299 208.319 122.051 208.597 120.472C207.082 123.715 205.621 125.763 204.213 126.616C203.573 127 202.911 127.192 202.229 127.192C200.607 127.192 199.349 126.595 198.453 125.4C197.557 124.184 197.109 122.68 197.109 120.888C197.109 118.157 197.866 115.768 199.381 113.72C200.895 111.651 202.858 110.616 205.269 110.616C207.701 110.616 210.197 111.053 212.757 111.928ZM208.565 113.848C207.434 113.507 206.474 113.336 205.685 113.336C204.085 113.336 202.89 113.688 202.101 114.392C201.375 116.184 201.013 118.008 201.013 119.864C201.013 120.845 201.162 121.837 201.461 122.84C201.781 123.843 202.261 124.344 202.901 124.344C203.647 124.344 204.607 123.245 205.781 121.048C206.954 118.851 207.882 116.451 208.565 113.848ZM216.818 106.104C217.501 105.763 218.194 105.592 218.898 105.592C219.602 105.592 220.168 105.816 220.594 106.264C221.042 106.712 221.266 107.373 221.266 108.248C221.266 109.123 221.213 110.115 221.106 111.224C222.706 111.224 224.232 111 225.682 110.552C225.938 110.979 226.066 111.48 226.066 112.056C226.066 112.611 225.81 113.069 225.298 113.432C224.808 113.773 224.306 113.944 223.794 113.944C223.282 113.944 222.706 113.88 222.066 113.752C221.426 113.624 221.01 113.549 220.818 113.528C220.797 113.72 220.733 114.104 220.626 114.68C220.541 115.256 220.466 115.757 220.402 116.184C220.232 117.357 220.146 118.616 220.146 119.96C220.146 122.883 221.096 124.344 222.994 124.344C223.698 124.344 224.509 124.099 225.426 123.608C225.704 124.013 225.842 124.536 225.842 125.176C225.842 125.816 225.49 126.317 224.786 126.68C224.104 127.021 223.282 127.192 222.322 127.192C218.568 127.192 216.69 125.059 216.69 120.792C216.69 120.173 216.776 119.053 216.946 117.432C217.138 115.811 217.234 114.499 217.234 113.496C216.21 113.56 215.389 113.741 214.77 114.04C214.514 113.656 214.386 113.219 214.386 112.728C214.386 112.216 214.568 111.8 214.93 111.48C215.293 111.139 215.741 110.968 216.274 110.968C216.808 110.968 217.16 110.979 217.33 111C217.352 110.829 217.362 110.605 217.362 110.328C217.362 108.728 217.181 107.32 216.818 106.104Z" fill="white" />
                        <defs>
                            <linearGradient id="paint0_linear_342_32" x1="146.427" y1="0" x2="146.427" y2="171.429" gradientUnits="userSpaceOnUse">
                                <stop offset="0.494" stop-color="#F4BD8A" />
                                <stop offset="0.4941" stop-color="#F38825" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_342_32" x1="146.427" y1="400" x2="146.427" y2="228.571" gradientUnits="userSpaceOnUse">
                                <stop offset="0.494" stop-color="#F4BD8A" />
                                <stop offset="0.4941" stop-color="#F38825" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div >
                        <form onSubmit={searchStore} className={`h-10 ${searchData.length > 0 && searchTerm!=='' ? 'rounded-t-3xl' : 'rounded-3xl'} bg-white items-center px-2 hidden md:flex`}>

                            <input onChange={(e) => { setSearchTerm(e.target.value) }} type='text' value={searchTerm} className='max-w-[160px] appearance-none border border-none rounded pl-2 focus:outline-none focus:border-none' />
                            <button className='p-2 rounded-full bg-[#F38825] text-white' type='submit' >
                                <FaSearch />
                            </button>
                        </form>
                        {searchData.length > 0 && searchTerm!=='' && <div className='relative hidden md:flex'>
                            <div className='absolute top-0 bg-white w-full rounded-b-3xl py-3 pl-3'>
                                {searchData.map((n, i) => {
                                    return <div className='flex gap-4 py-1 items-center'>
                                        <Link to={`/store/${n.name}`} target='_blank'>
                                            <div className=' font-bold flex flex-row gap-4 items-center'
                                            >
                                                <img className='h-8 w-8 rounded-full border border-2 border-gray-700' src={n.logo.logoUrl} />
                                                <div>{n.name}</div>
                                            </div>
                                        </Link>
                                    </div>
                                })}

                            </div>
                        </div>
                        }
                    </div>

                </div>
                <div className='flex gap-10 items-center mr-4 md:mr-0'>

                    <div className='flex items-center gap-1 text-white hidden md:flex'>
                        <div className='h-10 relative rounded-full w-10 bg-[#F38825] flex items-center justify-center text-lg' onMouseEnter={() => { setMouseHover(true) }} onMouseLeave={() => { setMouseHover(false) }}>
                            <Link to='/buildstore' target='_blank'>
                                <IoBagHandleOutline />
                            </Link>
                            {
                                mouseHover && <motion.div
                                    className="absolute -bottom-14 w-20 rounded text-center text-xs bg-black px-3 py-2"
                                    transition={{ delay: 0.2 }} // Delay the animation by 0.2 seconds
                                    animate={{ opacity: 1 }} // Animate opacity to 1 for visibility
                                    initial={{ opacity: 0 }} // Set initial opacity to 0 for fade-in effect
                                >
                                    Build a store
                                </motion.div>
                            }
                        </div>
                        {/* <p>Build Your Store</p> */}
                    </div>
                    <div className='flex items-center gap-1 text-white hidden md:flex'>
    <div className='h-10 relative hidden  rounded-lg w-[120px] bg-[#F38825] xl:flex items-center justify-center text-lg'>
        <ScrollLink to='pricing-section' smooth={true} duration={500} className=' justify-center flex flex-row gap-2 items-center w-full font-semibold text-center text-md cursor-pointer'>
            Pricing
            <RiPriceTagLine />
        </ScrollLink>
    </div>
</div>

                    <div className='relative'>
                        {/* {auth.isLoggedIn && <motion.div onClick={handleClick} className=' px-4 h-10 rounded-lg bg-[#F38825] text-white hidden  flex-col items-center md:flex justify-center'>
                            My Store
                        </motion.div>} */}
                        <AnimatePresence>
                            {isRotated && (
                                <motion.div
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: 20 }}
                                    exit={{ opacity: 0, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className=' px-6 py-2 rounded text-right text-white h-30 absolute top-6 right-5 md:right-0 hidden md:block bg-[#F38825]'
                                >
                                    <ul>
                                        {userStore.map((n, i) => {
                                            return (<li key={i}>{n.name}</li>)
                                        })}

                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {!auth.token && <div onClick={() => { navigate('/login') }} className=' font-bold  flex flex-row items-center px-5 h-10 rounded-lg bg-[#F38825] text-white hidden   items-center md:flex justify-center '>
                        Login
                        <IoIosLogIn className=' text-xl font-bold  ml-2 items-center' />
                    </div>}
                    {auth.token && <div onClick={() => { auth.logout(); }} className=' font-bold  flex flex-row items-center px-5 h-10 rounded-lg bg-[#F38825] text-white hidden   items-center md:flex justify-center '>
                        Logout
                        <IoLogOut className=' font-bold ml-2 items-center' />
                    </div>}


                    <div className='relative'>
                        <motion.div
                            onClick={handleClick}
                            animate={{ rotate: isRotated ? 180 : 0 }}
                            transition={{ duration: 0.5 }}
                            className='h-10 w-10 rounded-lg bg-[#F38825] text-white flex flex-col items-center md:hidden justify-center'>
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="1" y1="1" x2="15" y2="1" stroke="white" stroke-width="2" stroke-linecap="round" />
                                <line x1="1" y1="7" x2="15" y2="7" stroke="white" stroke-width="2" stroke-linecap="round" />
                                <line x1="1" y1="13" x2="15" y2="13" stroke="white" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </motion.div>
                        <AnimatePresence>
                            {isRotated && (
                                <motion.div
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: 20 }}
                                    exit={{ opacity: 0, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className='w-32 py-2 pr-4 rounded text-right block md:hidden text-white h-30 absolute top-10 right-0  bg-[#F38825]'
                                >
                                    <ul>
                                        {/* <li><button onClick={handleClickStore}>My Store</button></li> */}
                                        {isStoreOpen && <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5 }}
                                            className='pr-4 mb-4'>
                                            <ul>
                                                {userStore.map((n, i) => {
                                                    return (<li key={i}>{n.name}</li>)
                                                })}

                                            </ul>
                                        </motion.div>}

                                        <li>
  {!auth.isLoggedIn && (
    <div onClick={() => { navigate('/login') }} className=' font-bold  flex flex-row ml-4'>
      Login
      <IoIosLogIn className=' text-2xl font-bold  ml-2 items-center' />
    </div>
  )}
  {auth.isLoggedIn && (
    <div onClick={() => { auth.logout(); }} className=' font-bold  flex flex-row ml-4'>
      Logout
      <IoLogOut className=' font-bold ml-2 items-center mt-1' />
    </div>
  )}
</li>
<hr className='my-4 border-t border-gray-300' />
<li>
  <ScrollLink to='pricing-section' smooth={true} duration={500} className=' justify-center flex flex-row gap-2 items-center w-full font-semibold text-center text-md cursor-pointer'>
    Pricing
    <RiPriceTagLine />
  </ScrollLink>
</li>


                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
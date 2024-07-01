import React,{useState} from 'react';
import Logo from '../../Assets/banau.png';
import { FaSearch } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import {motion,AnimatePresence} from 'framer-motion';
const Navbar = ({ navbarImage }) => {
    const [isRotated, setIsRotated] = useState(false);
    const [isStoreOpen,setIsStoreOpen]=useState(false)
    const [mouseHover,setMouseHover]=useState(false);
    const handleClick = () => {
      setIsRotated(!isRotated);
    };
    const handleClickStore=()=>{
        console.log(isStoreOpen)
        setIsStoreOpen(!isStoreOpen)
    }
    return (
        <div className="py-3 sticky z-30 top-0 left-0  w-[98%] bg-transparent relative">
            {/* {navbarImage && (
                <>
                    <img
                        src="https://s3-alpha-sig.figma.com/img/833c/2be1/8639d391de67ec6164fb417caca83280?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZXhi3C1L8GlNDE~yIkBb8QoUPW5sF1r6GEgvzlTM23MINSr0xdn3v1jeyAXlTENTzqDstUC0FPc0ogYh8SbNeklrTQn5WccmXmcWBKceCZZPOk5kS~lSNWHZ~etHTsJAaB8cmqJ3oucBGMO5fNrYWtO0aDV8kWUojBQJ86NmTtYPRJRPGr8NjFKQ9crFGugo~pn-saSPWqghEK~aUexX~jeEvffHd2rGlHEEmalNzTuqxhYp6yD22r6sVkg-5jkJpkoQKdQpSQnxX7jYyAo8X5HpHwGoPgzLuE8HujniYrjWWhs6o6RujvXYVig7KsxPJNY7muMOc6Ov-Zm6y34ryg__"
                        alt="Background"
                        className="absolute top-2 left-1/2 transform -translate-x-1/2 w-full h-full  object-cover object-top -z-20"
                        style={{ objectPosition: '0px 0px' }}
                    />
                    <div className=" fixed  w-[98%]  h-20 bg-black opacity-70 -z-10 top-2 left-1/2 transform -translate-x-1/2 rounded-xl"></div>
                </>
            )} */}
            <div className='relative z-20 mx-auto w-full md:w-[90%] flex justify-between'>
                {/* <div><img src={Logo} alt="Logo" /></div> */}
                <div className='flex items-center gap-28'>
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className='ml-4 md:ml-0'>
                        <path d="M0 54.5V1L22 28L0 54.5Z" fill="url(#paint0_linear_188_239)"/>
                        <path d="M28 24H20.5L1 0H32L40 9.5L28 24Z" fill="url(#paint1_linear_188_239)"/>
                        <path d="M28 32H20.5L1 56H32L40 46.5L28 32Z" fill="url(#paint2_linear_188_239)"/>
                        <path d="M27 28L41 11L56 28L41 45L27 28Z" fill="url(#paint3_linear_188_239)"/>
                        <defs>
                        <linearGradient id="paint0_linear_188_239" x1="22" y1="28" x2="2.62418e-07" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" stop-opacity="0.1"/>
                        <stop offset="1" stop-color="white" stop-opacity="0.5"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_188_239" x1="40" y1="12" x2="11.5" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" stop-opacity="0.3"/>
                        <stop offset="1" stop-color="white" stop-opacity="0.1"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_188_239" x1="40" y1="46.5" x2="1" y2="46.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" stop-opacity="0.6"/>
                        <stop offset="1" stop-color="white" stop-opacity="0.8"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_188_239" x1="27" y1="28" x2="56" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E9E9E9"/>
                        <stop offset="1" stop-color="white"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <div className='h-10 rounded-3xl bg-white items-center px-2 hidden md:flex'>
                            <input type='text' className='max-w-[160px] appearance-none border border-none rounded pl-2 focus:outline-none focus:border-none' />
                            <button className='p-2 rounded-full bg-[#F38825] text-white'>
                                <FaSearch />
                            </button>
                    </div>
                </div>
                <div className='flex gap-8 items-center mr-4 md:mr-0'>
                    
                    <div className='flex items-center gap-1 text-white hidden md:flex'>
                        <div className='h-10 relative rounded-full w-10 bg-[#F38825] flex items-center justify-center text-lg' onMouseEnter={()=>{setMouseHover(true)}} onMouseLeave={()=>{setMouseHover(false)}}>
                            <IoBagHandleOutline/>
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
                    <div className='relative'>
                    <motion.div onClick={handleClick} className=' px-2 h-10 rounded-full bg-[#F38825] text-white hidden  flex-col items-center md:flex justify-center'>
                        My Store
                    </motion.div>
                    <AnimatePresence>
                    {isRotated && (
                        <motion.div
                            initial={{ opacity: 0,y:0 }}
                            animate={{ opacity: 1,y:20 }}
                            exit={{ opacity: 0,y:0 }}
                            transition={{ duration: 0.5 }}
                            className=' px-6 py-2 rounded text-right text-white h-30 absolute top-10 right-5 md:right-0 hidden md:block bg-[#F38825]'
                        >
                            <ul>
                                <li>Store1</li>
                                <li >Store2</li>
                                
                                <li>Store3</li>

                            </ul>
                        </motion.div>
                    )}
                    </AnimatePresence>
                    </div>
                    <div className=' px-2 h-10 rounded-full bg-[#F38825] text-white hidden  flex-col items-center md:flex justify-center'>
                        Login
                    </div>


                <div className='relative'>
                <motion.div
                    onClick={handleClick}
                    animate={{ rotate: isRotated ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                    className='h-10 w-10 rounded-full bg-[#F38825] text-white flex flex-col items-center md:hidden justify-center'>
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1" y1="1" x2="15" y2="1" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        <line x1="1" y1="7" x2="15" y2="7" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        <line x1="1" y1="13" x2="15" y2="13" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    </motion.div>
                    <AnimatePresence>
                    {isRotated && (
                        <motion.div
                            initial={{ opacity: 0,y:0 }}
                            animate={{ opacity: 1,y:20 }}
                            exit={{ opacity: 0,y:0 }}
                            transition={{ duration: 0.5 }}
                            className='w-32 py-2 pr-4 rounded text-right block md:hidden text-white h-30 absolute top-10 right-0  bg-[#F38825]'
                        >
                            <ul>
                                <li><button onClick={handleClickStore}>My Store</button></li>
                                {isStoreOpen && <motion.div
                                initial={{ opacity: 0,y:-10 }}
                                animate={{ opacity: 1,y:0 }}
                                exit={{ opacity: 0,y:-10 }}
                                transition={{ duration: 0.5 }}
                                className='pr-4 mb-4'>
                                    <ul>
                                        <li>Shop1</li>
                                        <li>Shop2</li>
                                        <li>Shop3</li>

                                    </ul>
                                </motion.div>}
                                <li>Login</li>
                                <li>Bye</li>

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

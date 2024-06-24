import Logo from '../../Assets/banau.png'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <div className='bg-transparent py-3 sticky z-30 top-0 pt-5 left-0 w-full relative'>
        {/* <div className='fixed top-2 left-1/2 transform -translate-x-1/2 h-20 overflow-hidden w-[98%]'>
        <img
                className="items-center w-full object-contain rounded-xl "
                src="https://s3-alpha-sig.figma.com/img/833c/2be1/8639d391de67ec6164fb417caca83280?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZXhi3C1L8GlNDE~yIkBb8QoUPW5sF1r6GEgvzlTM23MINSr0xdn3v1jeyAXlTENTzqDstUC0FPc0ogYh8SbNeklrTQn5WccmXmcWBKceCZZPOk5kS~lSNWHZ~etHTsJAaB8cmqJ3oucBGMO5fNrYWtO0aDV8kWUojBQJ86NmTtYPRJRPGr8NjFKQ9crFGugo~pn-saSPWqghEK~aUexX~jeEvffHd2rGlHEEmalNzTuqxhYp6yD22r6sVkg-5jkJpkoQKdQpSQnxX7jYyAo8X5HpHwGoPgzLuE8HujniYrjWWhs6o6RujvXYVig7KsxPJNY7muMOc6Ov-Zm6y34ryg__"
                alt="Background"
            />
        <div className=" fixed left-0 w-full h-full bg-black opacity-70 z-10 top-0 left-1/2 transform -translate-x-1/2 rounded-xl"></div>
        </div> */}
        <div className='relative z-20 mx-auto w-full md:w-[90%] flex justify-between '>
            <div><img src={Logo}/></div>
            <div className='flex gap-8 items-center'>

                {/* Search Bar Section */}

                <div className='h-10 rounded-3xl bg-white flex items-center px-2 '>
                    <input type='text ' className=' max-w-[160px] appearance-none border border-none rounded pl-2 focus:outline-none focus:border-none' />
                    <button className='p-2 rounded-full bg-[#F38825] text-white'>
                        <FaSearch className=''/>  
                    </button>
                </div>

                <div className='flex items-center gap-1 text-white'>
                    <div className='h-10 rounded-full w-10 bg-[#F38825] flex items-center justify-center text-lg'>
                        <IoBagHandleOutline />
                    </div>
                    <p>Build Your Store</p>
                </div>


                {/* Hamburger */}
                <div className='h-10 w-10 rounded-full bg-[#F38825] text-white flex flex-col items-center justify-center'>
                    <div className={`w-5 h-[2px] bg-white rounded mb-1`}></div>
                    <div className={`w-5 h-[2px] bg-white rounded`}></div>
                    <div className={`w-5 h-[2px] bg-white mt-1 rounded`}></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
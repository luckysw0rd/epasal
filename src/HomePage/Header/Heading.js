
import React from 'react'
import ghost from '../../Assets/Ghost.png'
import { IoBagHandleOutline } from "react-icons/io5";

const Heading = () => {
  return (
    <div className="relative">
            <img
                className="items-center fixed top-2 left-0 w-[98%] h-full object-cover -z-20 left-1/2 transform -translate-x-1/2 rounded-xl "
                src="https://s3-alpha-sig.figma.com/img/833c/2be1/8639d391de67ec6164fb417caca83280?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZXhi3C1L8GlNDE~yIkBb8QoUPW5sF1r6GEgvzlTM23MINSr0xdn3v1jeyAXlTENTzqDstUC0FPc0ogYh8SbNeklrTQn5WccmXmcWBKceCZZPOk5kS~lSNWHZ~etHTsJAaB8cmqJ3oucBGMO5fNrYWtO0aDV8kWUojBQJ86NmTtYPRJRPGr8NjFKQ9crFGugo~pn-saSPWqghEK~aUexX~jeEvffHd2rGlHEEmalNzTuqxhYp6yD22r6sVkg-5jkJpkoQKdQpSQnxX7jYyAo8X5HpHwGoPgzLuE8HujniYrjWWhs6o6RujvXYVig7KsxPJNY7muMOc6Ov-Zm6y34ryg__"
                alt="Background"
            />
            <div className=" fixed left-0 w-[98%] h-full bg-black opacity-70 -z-10 top-2 left-1/2 transform -translate-x-1/2 rounded-xl"></div>
            <div className="relative z-0 h-[450px] text-white flex flex-col gap-5 items-center justify-center uppercase">
                <h3 className='text-6xl font-semibold tracking-wide '>Express Your <span className='font-Zen-Tokyo-Zoo font-normal'>Creativity</span></h3>
                <p>Build Your Own Ecommerce Website</p>
            </div>

            <div className='relative flex justify-center -mb-16 z-10'>
                <img src={ghost} className='-mt-[6px] absolute -z-10 h-40'/>
                <div className=' w-[130px] h-[130px] bg-[#8E410A] rounded-full border border-[15px] border-[#FEFBF6] flex flex-col items-center justify-center text-center font-bold text-white'>
                    
                    <IoBagHandleOutline className='text-3xl mb-2'/>
                    <p className='text-sm font-light'>Build Your Store</p>
                </div>
            </div>
    </div>
  )
}

export default Heading
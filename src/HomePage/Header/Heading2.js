import React from 'react'
import { FaCaretRight } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import {Link} from 'react-router-dom';
const Heading2 = () => {
  return (
    <div className='flex flex-col items-center h-[90vh] md:h-[120vh] w-[90%] text-[#112D4E] font-Poppins justify-center'>
        <h1 className=' text-[28px] md:text-[56px] font-bold mt-[10vh] mb-5 text-center'>Build your online presence</h1>
        <h2 className='text-[18px] md:text-[45px] font-bold text-center mb-[7vh]'>Create your own <br/>e-commerce website</h2>
        <div className='flex justify-around w-full md:w-4/5 lg:w-3/5 items-center mb-[10vh] tracking-wider'>
            <button className='bg-gradient-to-r from-[#C47A00] to-[#1D0E3E] w-[176px] h-[64px] rounded-full text-white font-bold flex items-center justify-center gap-1 hidden md:flex'>Watch Video <FaCaretRight className='text-2xl'/></button>
            <Link to='/buildStore' target='_blank' className='bg-gradient-to-r from-[#C47A00] to-[#1D0E3E] w-[112px] md:w-[232px] h-[40px] md:h-[80px] rounded-full text-white font-bold flex items-center justify-center gap-4 text-[18px] md:text-[32px] uppercase'>Build <MdModeEdit /></Link>
            <button className='bg-gradient-to-r from-[#C47A00] to-[#1D0E3E] w-[176px] h-[64px] rounded-full text-white font-bold flex items-center justify-center gap-1 hidden md:flex'>Banau Stores <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trending-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg></button>
        </div>
        <iframe className="w-full md:w-4/5 lg:w-3/5 h-[50vh] rounded-3xl" src="https://www.youtube.com/embed/L9S9Ci_mgrE" title="Why Banau?" frameBorder="0" allowFullScreen></iframe>
    </div>
  )
}

export default Heading2
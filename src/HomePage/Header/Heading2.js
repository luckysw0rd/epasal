import React, { useState } from 'react'
import { FaCaretRight } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import {Link} from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
const Heading2 = () => {
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [searchTerm,setSearchTerm]=useState('')
  const [searchData,setSearchData]=useState([])
  const searchStore = async (e) => {
    e.preventDefault();
    if(searchTerm===''){
      setSearchData([])
      return;
    }
    try {

        const responseData = await sendRequest(
            `store/getstorebyfilter?limit=${4}&search=${searchTerm}`,
            'GET',
            null,
            {
                'Content-Type': 'application/json',
                
            }
        );
        // Handle response data as needed
        setSearchData(responseData.stores)
        console.log(responseData.stores,"response")
    } catch (error) {
        // Handle error if needed


    }
}

  return (
    <div className='flex flex-col items-center h-[90vh] md:h-[100vh] w-[90%] text-[#112D4E] font-Poppins justify-start'>
        <h1 className=' text-[32px] md:text-[56px] font-bold mb-5 mt-[10vh] text-center'>Build your online presence</h1>
        <h2 className='text-[18px] md:text-[45px] font-bold text-center mb-[7vh]'>Create your own <br/>e-commerce website</h2>
        <form class="form relative  flex justify-center mb-10" onSubmit={searchStore}>
          <button class="absolute left-2 -translate-y-1/2 top-1/2 p-1 " type='submit'>
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search"
              class="w-5 h-5 text-gray-700"
            >
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                stroke-width="1.333"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          <input
            class="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md h-[60px] text-center text-2xl "
            placeholder="Search..."
            required=""
            type="text"
            onChange={e=>setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button type="reset" class="absolute right-3 -translate-y-1/2 top-1/2 p-1" onClick={e=>setSearchTerm('')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          {searchData.length>0 && 
          <div className='absolute top-20 z-30 w-full bg-white shadow-md rounded-xl text-2xl px-2 py-2'>
          {searchData.map((n, i) => {
                                    return <div className='flex gap-4 py-1 items-center'>
                                        <Link to={`/store/${n.name}`} target='_blank'>
                                            <div className=' flex flex-row gap-4 items-center'
                                            >
                                                <img className='h-8 w-8 rounded-full border border-2 border-gray-700' src={n.logo.logoUrl} />
                                                <div>{n.name}</div>
                                            </div>
                                        </Link>
                                    </div>
                                })}
          </div>}
        </form>
        <div className={` flex-col md:flex-row gap-5 md:gap-0 justify-around w-full md:w-4/5 lg:w-3/5 items-center mb-[10vh] tracking-wider hidden md:flex`}>
            <button className='bg-gradient-to-r from-[#C47A00] to-[#1D0E3E] w-[176px] h-[64px] rounded-full text-white font-bold flex items-center justify-center gap-1 flex'>Watch Video <FaCaretRight className='text-2xl'/></button>
            <Link to='/buildStore' target='_blank' className='bg-gradient-to-r from-[#C47A00] to-[#1D0E3E] w-[176px] h-[64px] rounded-full text-white font-bold flex items-center justify-center gap-1 flex uppercase'>Build <MdModeEdit /></Link>
            <button className='bg-gradient-to-r from-[#C47A00] to-[#1D0E3E] w-[176px] h-[64px] rounded-full text-white font-bold flex items-center justify-center gap-1 flex'>Banau Stores <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trending-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg></button>
        </div>

        <div className={` flex-col md:flex-row gap-5 md:gap-0 justify-around w-full md:w-4/5 lg:w-3/5 items-center mb-[10vh] tracking-wider flex md:hidden text-center`}>
            <div className='flex flex-col items-center'>
              <button className='bg-gradient-to-r from-[#C47A00] to-[#1D0E3E] w-[64px] h-[64px] rounded-full text-white font-bold flex items-center justify-center gap-1 flex'><FaCaretRight className='text-3xl'/></button>
              <div>Watch Video </div>
            </div>
            <div className='flex flex-col items-center'>
              <Link to='/buildStore' target='_blank' className='bg-gradient-to-r from-[#C47A00] to-[#1D0E3E] w-[64px] h-[64px] rounded-full text-white font-bold flex items-center justify-center gap-1 flex uppercase'><MdModeEdit  className='text-3xl'/></Link>
              <div>Build </div>
            </div>
            <div className='flex flex-col items-center'>
              <button className='bg-gradient-to-r from-[#C47A00] to-[#1D0E3E] w-[64px] h-[64px] rounded-full text-white font-bold flex items-center justify-center gap-1 flex'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trending-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg></button>
              <div>Banau Stores </div>
            </div>
        </div>
        
        {/* <iframe className="w-full md:w-4/5 lg:w-3/5 h-[50vh] rounded-3xl" src="https://www.youtube.com/embed/L9S9Ci_mgrE" title="Why Banau?" frameBorder="0" allowFullScreen></iframe> */}
    </div>
  )
}

export default Heading2
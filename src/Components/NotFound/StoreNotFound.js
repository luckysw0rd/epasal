import React from 'react'
import { useNavigate } from 'react-router-dom'

const StoreNotFound = () => {
  const navigate=useNavigate()
  return (
    <div className='h-screen flex items-center justify-center text-gray-300 flex-col'>
      <h1 className='text-6xl mb-4'>Store 404</h1>
      <p className='text-lg mb-10'>Store not found</p>
      <button className='bg-blue-700 px-5 py-2 text-xl rounded-xl' onClick={()=>{navigate('/')}}>Go to HomePage</button>
    </div>
  )
}

export default StoreNotFound
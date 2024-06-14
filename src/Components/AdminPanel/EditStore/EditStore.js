import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const EditStore = ({store}) => {
  const navigate=useNavigate()
  useEffect(()=>{
    
    navigate(`/store/edit/${store.name}`)
  },[])
  return (
    <div>Loading...</div>
  )
}

export default EditStore
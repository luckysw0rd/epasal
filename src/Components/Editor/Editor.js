import React, { useState } from 'react'
import { useStore } from '../../Theme/Theme1/T1Context'
import AddProduct from '../../Theme/Theme1/SubProduct/AddProduct';

import ImageDrop from './ImageDrop';

const Editor = () => {
  const {store,setStore}=useStore();
  const [openType,setOpenType]=useState(false)
  const [categoryData,setCategoryData]=useState('')
  const [logo,setLogo]=useState();

  const [addProductForm,setAddProductForm]=useState(false)
  const handleAddCategory=(e)=>{
    e.preventDefault();
    setStore(n=>({...n,subCategories:[...n.subCategories,{name:categoryData}]}))
    setCategoryData('')
  }





  const { color } = store;
    const {fetchedFromBackend} = store;
    const { previewMode } = store;
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [changeFlow,setChangeFlow]=useState(false)
    console.log(color);
    const handleColorChange = (value, field, colorValueObject) => {
        setStore((prevState) => ({
            ...prevState,
            color: {
                ...prevState.color,
                [colorValueObject]: {
                    ...prevState.color[colorValueObject],
                    [field]: value,
                },
            },
        }));
    };

    const handleHexCodeChange = (e, field) => {
        const hexCode = e.target.value;
        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode)) {
            handleColorChange(hexCode, field);
        }
    };

    const handleAddProduct=(e)=>{
      e.preventDefault();
      setAddProductForm(true)
    }
    const handleSingleColorChange = (e, field) => {
        const newValue = e.target.value;
        setStore((prevState) => ({
            ...prevState,
            color: {
                ...prevState.color,
                [field]: newValue,
            },
        }));
    };
  return (
   <>
    {!store.previewMode?<div className='fixed top-0 right-0 w-80 h-screen overflow-scroll bg-white z-20 border-2 border-black px-4'>
        <h1 className=' mt-10 text-[#6A6A6A] text-xl font-bold'>Design your Website</h1>
        
        <div className='flex justify-between  mt-5 font-semibold text-[#6A6A6A]'>
          <button className={`flex-1 text-left ${!openType?'text-black':''}`} onClick={e=>{e.preventDefault();setOpenType(false)}}>Content</button>
          <button className={`flex-1 text-left ${openType?'text-black':''}`} onClick={e=>{e.preventDefault();setOpenType(true)}}>Design</button>
        </div>
        {!openType && <div>
          <ul className='flex flex-col mt-10 gap-10'>
            <li className='text-sm text-semibold'>
              Navbar:<br/>
              <div>
              <label className='text-[10px]'>Shop Name</label><br/>
              <input type='text' className='border border-[#6A6A6A] h-[24px] rounded px-2' value={store.name} onChange={e=>setStore(n=>({...n,name:e.target.value}))}></input>
              </div>
              <div>
              <label className='text-[10px]'>Logo:</label><br/>
              <ImageDrop setStore={setStore} imageData='logo' imageFile='logofile'/>
              </div>
            </li>
            <li className='text-sm text-semibold'>
              Hero Section:<br/>
              <div>
              <label className='text-[10px]'>Title</label><br/>
              <input type='text' className='border border-[#6A6A6A] rounded' value={store.name} onChange={e=>setStore(n=>({...n,name:e.target.value}))}></input>
              </div>
              <div>
              <div className="w-1/2">
                        <ImageDrop setStore={setStore} imageData='banner' imageFile='bannerfile'/>
                    </div>
              </div>
            </li >
            <li className='text-sm text-semibold'>
              Categories:<br/>
              <div>
              <label className='text-[10px]'>Title</label><br/>
              <input type='text' className='border border-[#6A6A6A] rounded mr-2' value={categoryData} onChange={e=>setCategoryData(e.target.value)} ></input>
              <button className='px-2 border border-black' onClick={handleAddCategory}>Add +</button>
              </div>
              <ul>
                {store.subCategories.map(item=>(<li key={item.name}>{item.name}</li>))}
              </ul>
            </li>
            <li className='text-sm text-semibold'>
              Banner Design:  This is pending
            </li>
            <li className='text-sm text-semibold'>
              Add Products<br/>
              <div>
              <button className='px-2 border border-black' onClick={handleAddProduct}>Add +</button>
              </div>
             
            </li>
            <li className='text-sm text-semibold'>
              Footer:This is pending
            </li>
          </ul>
          {addProductForm && <AddProduct onClose={()=>setAddProductForm(!AddProduct)}/>}
        </div>}


        {openType && <div className="mt-5">
                    <div className="flex flex-col gap-4">
                        {Object.entries(color).map(([colorKey, colorValue], index) => {
                            if (typeof colorValue === 'object') {
                                return (
                                    <div key={index}>
                                        <h4 className="text-lg font-semibold mt-5 mb-2">{colorKey}</h4>
                                        {Object.entries(colorValue).map(([nestedKey, nestedValue], nestedIndex) => (
                                            <div key={nestedIndex} className="flex flex-row justify-around items-start items-center">
                                                <label className="text-gray-700 w-24 flex-grow">{nestedKey}</label>
                                                <div className="flex mt-2 md:flex-row items-center justify-center ml-4">
                                                    <input
                                                        type="color"
                                                        value={nestedValue}
                                                        onChange={(e) => handleColorChange(e.target.value, nestedKey, colorKey)}
                                                        className="  rounded-full px-1 border border-gray-300 shadow-md focus:outline-none"
                                                    />

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            } else {
                                return (
                                  <>
                                  <h4 className="text-lg font-semibold mt-5 mb-2">{colorKey}</h4>
                                    <div key={index} className="flex  justify-between">
                                      
                                        <label className="flex-grow text-gray-700 w-24">Default</label>
                                        <div className="flex items-center ml-4">
                                            <input
                                                type="color"
                                                value={colorValue}
                                                onChange={(e) => handleSingleColorChange(e, colorKey)}
                                                className="rounded-full px-1 border border-gray-300 shadow-md focus:outline-none"
                                            />

                                        </div>
                                    </div>
                                    </>
                                );
                            }
                        })}
                    </div>
                    
                </div>}
                
    </div>:<button className='fixed top-0 right-10 mt-20' onClick={(e)=>{e.preventDefault();setStore(n=>({...n,previewMode:false}))}}>Preview</button>}
    </>
  )
}

export default Editor
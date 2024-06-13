import React, { useState } from 'react';
import { useStore } from '../../Theme/Theme1/T1Context';
import ProductForm from '../../Theme/Theme1/SubProduct/ProductForm';
import ImageDrop from './ImageDrop';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FontSelector from './FontSelector';
// List of fonts from your Tailwind configuration
const fonts = [
  "Anta", "VT323", "Kode Mono", "Sixtyfour", "Oleo Script", "Mansalva",
  "Genos", "Orbitron", "Cinzel", "Exo 2", "Roboto", "Sanchez", "DM Serif Text"
];

const Editor = () => {
  const { store, setStore } = useStore();
  const [openType, setOpenType] = useState(false);
  const [categoryData, setCategoryData] = useState('');
  const { color } = store;
  const { fetchedFromBackend } = store;
  const { previewMode } = store;
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [changeFlow, setChangeFlow] = useState(false);
  const [navHide, setNavHide] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState(0);
  const [addProductForm, setAddProductForm] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    setStore(n => ({ ...n, subCategories: [...n.subCategories, { name: categoryData }] }));
    setCategoryData('');
  };

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

  const handleAddProduct = (e) => {
    e.preventDefault();
    setAddProductForm(true);
  };

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

  const handleFeaturedChange = (e) => {
    e.preventDefault();
    setFeaturedProducts(e.target.value);
  };

  const handleAddFeaturedProduct = (e) => {
    e.preventDefault();
    if (!store.featuredProducts.includes(parseInt(featuredProducts, 10))) {
      setStore((prev) => ({
        ...prev,
        featuredProducts: [...prev.featuredProducts, parseInt(featuredProducts, 10)]
      }));
      alert("Item added Successfully!!");
    } else {
      alert("Item already Added to Featured");
    }
  };

  const handleFontChange = (e) => {
    const selectedFont = e.target.value;
    setStore(prevState => ({ ...prevState, fontFamily: selectedFont }));
  };

  return (
    <>
      {!store.fetchedFromBackend && !store.previewMode ? navHide ? (
        <div className='fixed top-0 right-0 w-80 h-screen overflow-y-scroll bg-white z-20 border-2 border-gray-200 text-gray-600'>
          <h1 className=' mt-[20px] text-[#6A6A6A] text-xl font-bold border-b-2 border-black pb-6 w-full px-4'>Design your Website</h1>

          <div className='flex justify-between  mt-10 font-semibold text-[#6A6A6A] px-4'>
            <button className={`flex-1 text-left ${!openType ? 'text-black' : ''}`} onClick={e => { e.preventDefault(); setOpenType(false) }}>Content</button>
            <button className={`flex-1 text-left ${openType ? 'text-black' : ''}`} onClick={e => { e.preventDefault(); setOpenType(true) }}>Design</button>
          </div>
          <div className='text-red-600 absolute top-[22px] right-2' onClick={(e) => { e.preventDefault(); setStore(n => ({ ...n, previewMode: true })) }}>X</div>
          <div className='text-red-600 absolute top-[22px] right-10' onClick={(e) => { e.preventDefault(); setNavHide(false) }}>Hide</div>
          {!openType && (
            <div>
              
              <ul className='flex flex-col mt-10 gap-2 px-4'>
                <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
                  Navbar:<br />
                  <div>
                    <FontSelector section="Navbar" />
                  </div>
                  <div className='font-normal'>
                    <label className='text-[10px]'>Shop Name</label><br />
                    <input type='text' className='border border-[#6A6A6A] h-[24px] rounded px-2' value={store.name} onChange={e => setStore(n => ({ ...n, name: e.target.value }))}></input>
                  </div>
                  <div className='font-normal mt-2'>
                    <label className='text-[10px]'>logo:</label>
                    <ImageDrop setStore={setStore} imageData='logo.logoUrl' />
                  </div>
                </li>
                <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
                  Hero Section:<br />
                  <div className='font-normal'>
                    <label className='text-[10px]'>Title</label><br />
                    <input type='text' className='border border-[#6A6A6A] rounded px-2' value={store.name} onChange={e => setStore(n => ({ ...n, name: e.target.value }))}></input>
                  </div>
                  <div>
                    <div className="font-normal mt-2">
                      <label className='text-[10px]'>Background:</label>
                      <ImageDrop setStore={setStore} imageData='banner.bannerUrl' />
                    </div>
                  </div>
                </li >
                <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
                  Categories:<br />
                  <div>
                    <FontSelector section="Categories" />
                  </div>  
                  <div className='font-normal'>
                    <label className='text-[10px]'>Title</label><br />
                    <div className='flex'>
                      <input type='text' className='border border-[#6A6A6A] rounded mr-2 px-2' value={categoryData} onChange={e => setCategoryData(e.target.value)} ></input>
                      <button className='px-2 text-[10px] border border-black rounded' onClick={handleAddCategory}>Add +</button>
                    </div>
                  </div>
                  <ul className='font-normal list-disc ml-10 mt-2'>
                    {store.subCategories.map(item => (<li key={item.name}>{item.name}</li>))}
                  </ul>
                </li>
                <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
              Banner #1<br />
              <div>
                <FontSelector section="Banner1" />
              </div>  
              <label className='text-[10px]'>Title</label><br />
              <input value={store.thirdBannerText.heading} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prev=>({...prev,thirdBannerText:{...prev.thirdBannerText,heading:e.target.value}}))}} ></input><br />
              <label className='text-[10px]'>Description</label><br />
              <textarea value={store.thirdBannerText.paragraph} type='text' className='border border-[#6A6A6A] rounded px-2 h-[80px]' onChange={(e)=>{setStore(prev=>({...prev,thirdBannerText:{...prev.thirdBannerText,paragraph:e.target.value}}))}} ></textarea><br />
              <label className='text-[10px]'>Image:</label> <ImageDrop setStore={setStore} imageData='thirdBanner.thirdBannerUrl' />
            </li>
            <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
              Banner #2<br />
              <div>
                <FontSelector section="Banner2" />
              </div> 
              <label className='text-[10px]'>Title</label><br />
              <input value={store.secondaryBannerText.heading} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prev=>({...prev,secondaryBannerText:{...prev.secondaryBannerText,heading:e.target.value}}))}} ></input><br />
              <label className='text-[10px]'>Description</label><br />
              <textarea value={store.secondaryBannerText.paragraph} type='text' className='border border-[#6A6A6A] rounded px-2 h-[80px]' onChange={(e)=>{setStore(prev=>({...prev,secondaryBannerText:{...prev.secondaryBannerText,paragraph:e.target.value}}))}} ></textarea><br />
              <label className='text-[10px]'>Image:</label> <ImageDrop setStore={setStore} imageData='secondaryBanner.secondaryBannerUrl' />
            </li>
            <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
              Banner #3<br />
              <div>
                <FontSelector section="Banner3" />
              </div> 
              <label className='text-[10px]'>Title</label><br />
              <input value={store.offerBannerText.para1} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prev=>({...prev,offerBannerText:{...prev.offerBannerText,para1:e.target.value}}))}} ></input><br />
              <label className='text-[10px]'>Description</label><br />
              <textarea value={store.offerBannerText.para2} type='text' className='border border-[#6A6A6A] rounded px-2 h-[80px]' onChange={(e)=>{setStore(prev=>({...prev,offerBannerText:{...prev.offerBannerText,para2:e.target.value}}))}} ></textarea><br />
              <label className='text-[10px]'>Description</label><br />
              <textarea value={store.offerBannerText.para3} type='text' className='border border-[#6A6A6A] rounded px-2 h-[80px]' onChange={(e)=>{setStore(prev=>({...prev,offerBannerText:{...prev.offerBannerText,para3:e.target.value}}))}} ></textarea><br />
              <label className='text-[10px]'>Image:</label> <ImageDrop setStore={setStore} imageData='offerBanner.offerBannerUrl' />
            </li>
                <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
                  Add Products<br />
                  <div className='mt-2'>
                    <button className='px-2 text-[10px] border border-black' onClick={handleAddProduct}>Add +</button>
                  </div>
                </li>
                <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
                  Featured Products<br />
                  <div>
                <FontSelector section="Featured" />
              </div> 
              <div>
                <FontSelector section="NewProduct" />
              </div> 
                  <div className='mt-2 flex '>
                    <select name='featured' className='w-1/2 mr-2' id='featured' onChange={handleFeaturedChange}>
                      {store.products.map((n, i) => (<option value={i} key={i}>{n.name}</option>))}
                    </select>
                    <button className='px-2 text-[10px] border border-black' onClick={handleAddFeaturedProduct}>Add +</button>
                  </div>
                </li>
                <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
                  Footer<br/>
                  <label className='text-[10px]'>Location</label><br />
              <input value={store.location} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prevState => ({ ...prevState, location: e.target.value }));console.log(store.location)}} ></input><br />
              <label className='text-[10px]'>Email</label><br />
              <input value={store.email} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prev=>({...prev,email:e.target.value}))}} ></input><br />
              <label className='text-[10px]'>Phone Number</label><br />
              <input value={store.phoneNumber} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prev=>({...prev,phoneNumber:e.target.value}))}} ></input><br />
              <div className='mt-3'>Social Media Links</div>
              <label className='text-[10px]'>Facebook</label><br />
              <input value={store.socialMediaLinks.facebook} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, facebook: e.target.value } }));}} ></input><br />
              <label className='text-[10px]'>Twitter</label><br />
              <input value={store.socialMediaLinks.twitter} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, twitter: e.target.value } }));}} ></input><br />
              <label className='text-[10px]'>Instagram</label><br />
              <input value={store.socialMediaLinks.instagram} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, instagram: e.target.value } }));}} ></input><br />
              <label className='text-[10px]'>linkedIn</label><br />
              <input value={store.socialMediaLinks.linkedin} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e)=>{setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, linkedin: e.target.value } }));}} ></input><br />
              
                </li>
              </ul>
              {addProductForm && <ProductForm onClose={() => setAddProductForm(!addProductForm)} />}
            </div>
          )}

          {openType && (
            <div className="mt-5 px-4 capitalize">
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
                      <div key={index}>
                        <h4 className="text-lg font-semibold mt-5 mb-2">{colorKey}</h4>
                        <div className="flex  justify-between">
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
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
          <div className='flex justify-center my-3'>
            <button className='px-4 py-1 bg-green-600 text-white rounded' onClick={() => { toast("helllo") }}>Submit</button>
          </div>
        </div>
      ) : (
        <button className='fixed top-0 right-10 mt-24 bg-yellow-400 px-4 py-1 rounded z-20' onClick={(e) => { e.preventDefault(); setNavHide(true) }}>Show</button>
      ) : !store.fetchedFromBackend && (
        <button className='fixed top-0 right-10 mt-20 bg-yellow-400 px-4 py-1 rounded z-20' onClick={(e) => { e.preventDefault(); setStore(n => ({ ...n, previewMode: false })) }}>Preview</button>
      )}
    </>
  );
};

export default Editor;

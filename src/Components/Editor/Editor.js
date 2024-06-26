import React, { useEffect, useState } from 'react';
import { useStore } from '../../Theme/Theme1/T1Context';
import ProductForm from '../../Theme/Theme1/SubProduct/ProductForm';
import ImageDrop from './ImageDrop';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FontSelector from './FontSelector';
import SaveStoreButton from '../../Theme/Theme1/SaveButton/SaveStoreButton';
import { SketchPicker } from 'react-color';
import {AnimatePresence, motion} from 'framer-motion';
import { FaCaretLeft } from "react-icons/fa";
// List of fonts from your Tailwind configuration
const fonts = [
  "Anta", "VT323", "Kode Mono", "Sixtyfour", "Oleo Script", "Mansalva",
  "Genos", "Orbitron", "Cinzel", "Exo 2", "Roboto", "Sanchez", "DM Serif Text"
];


const Editor = () => {
  const { store, setStore } = useStore();
  const [openType, setOpenType] = useState(1);
  const [categoryData, setCategoryData] = useState('');
  const { color } = store;
  const { fetchedFromBackend } = store;
  const { previewMode } = store;
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [changeFlow, setChangeFlow] = useState(false);
  const [navHide, setNavHide] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState(0);
  const [addProductForm, setAddProductForm] = useState(false);

  // Mapping of developer names to user-friendly names
  const friendlyNames = {
    backgroundThemeColor: 'Background Color',
    secondaryBannerColor: 'Second Banner',
    firstBannerColor: 'First Banner',
    offerBannerColor: 'Offer Banner Color',
    navColor: 'Navbar',
    headerColor: 'Header Color',
    subcategoryColor: 'Category ',
    subProductColor: 'Category Product',
    productListColor: ' Color',
    newProductColor: 'New Product ',
    footerColor: 'Footer Color',
  };

  // Mapping of developer names to user-friendly names for nested properties
  const nestedFriendlyNames = {
    backgroundThemeColor1: 'Background',
    backgroundThemeColor2: 'Background 2',
    textColor: 'Text Color',
    buttonColor: 'Button Color',
    buttonText: 'Button Text',
    backgroundBoxThemeColor1: 'Background Box Theme Color 1',
    backgroundnavColor: 'Background ',
    storeNameTextColor: 'Store Name',
    categoryTextColor: 'Text',
    searchBarColor: 'Search Bar',
    headerText: 'Header Text Color',
    headerBackground: 'Header Background Color',
    background: 'Background',
    text: 'Text ',
    categoryColor: ' Background ',
    backgroundColor: ' Background ',
    borderColor: ' Border ',
    priceColor: ' Price ',
    priceLetterColor: ' Cart Text ',
    scrollbarColor: ' Scrollbar ',
    starColor: ' Star ',
    cardBackground: ' Card Background Color',
    borderColor: ' List Border ',
    headerColor: ' List Header ',
    textColor: ' Text Color',
    priceColor: 'Price',
    heartColor: ' Heart Color',
    buttonTextColor: ' Button Text Color',
    buttonBgColor: ' Button Background Color',
    buttonBorderColor: ' Button Border Color',
    buttonBgColorOnHover: ' Button Background Hover Color',
    bgColor: 'Footer Background Color',
    textColor: 'Text Color',
    linkHeaderColor: 'Footer Link Header Color',
    linkColor: 'Footer Link Color',
    btnBgColor: 'Footer Button Background Color',
    btnText: 'Footer Button Text Color',
    btnBgColorOnHover: 'Footer Button Background Hover Color',
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    setStore(n => ({ ...n, subCategories: [...n.subCategories, { name: categoryData }] }));
    setCategoryData('');
  };

  useEffect(() => {
    if (store.liveChatSource && (store.liveChatSource !== '' && store.liveChatSource !== null) && store.subscriptionStatus !== 'Silver')
      abc(store.liveChatSource)
  }, [])


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

  const handleActiveSkinChange = (e, index) => {
    const newActiveSkin = e.target.value;
    setStore(prevState => ({
      ...prevState,
      componentSkin: prevState.componentSkin.map((component, idx) => {
        if (idx === index) {
          return { ...component, activeSkin: newActiveSkin };
        }
        return component;
      })
    }));
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
  const handlePresetChange = (e) => {
    const selectedPreset = presets.find(preset => preset.name === e.target.value);
    if (selectedPreset) {
      setStore(prevStore => ({
        ...prevStore,
        color: {
          ...prevStore.color,
          ...selectedPreset.color,
        }
      }));
    }
  };
  
  

  const presets = [
    {
        name: 'Aqua and Black',
  color: {
    backgroundThemeColor: "#000000", // Black
    navColor: {
      backgroundnavColor: "#00FFFF", // Aqua
      storeNameTextColor: "#FFFFFF", // White for contrast
      categoryTextColor: "#00FFFF", // Aqua
      searchBarColor: "#000000", // Black
    },
    subcategoryColor: {
      background: "#000000", // Black
      text: "#00FFFF", // Aqua
    },
    subProductColor: {
      categoryColor: "#000000", // Black
      backgroundColor: "#00FFFF", // Aqua
      textColor: "#000000", // Black
      borderColor: "#00FFFF", // Aqua
      priceColor: "#00FFFF", // Aqua
      priceLetterColor: "#000000", // Black
      scrollbarColor: "#00FFFF", // Aqua
      starColor: "#00FFFF", // Aqua
    },
    firstBannerColor: {
      backgroundThemeColor1: "#000000", // Black
      backgroundThemeColor2: "#00FFFF", // Aqua
      textColor: "#FFFFFF", // White for contrast
      buttonColor: "#000000", // Black
      buttonText: "#00FFFF", // Aqua
    },
    newProductColor: {
      backgroundColor: "#000000", // Black
      cardBackground: "#000000", // Black
      borderColor: "#00FFFF", // Aqua
      headerColor: "#00FFFF", // Aqua
      textColor: "#FFFFFF", // White for contrast
      priceColor: "#00FFFF", // Aqua
      heartColor: "#00FFFF", // Aqua
      buttonTextColor: "#000000", // Black
      buttonBgColor: "#00FFFF", // Aqua
      buttonBorderColor: "#000000", // Black
      buttonBgColorOnHover: "#000000", // Black
    },
    secondaryBannerColor: {
      backgroundThemeColor1: "#000000", // Black
      backgroundThemeColor2: "#00FFFF", // Aqua
      textColor: "#FFFFFF", // White for contrast
      buttonColor: "#000000", // Black
      buttonText: "#00FFFF", // Aqua
    },
    offerBannerColor: {
      backgroundBoxThemeColor1: "#000000", // Black
      backgroundThemeColor: "#00FFFF", // Aqua
      textColor: "#FFFFFF", // White for contrast
      buttonColor: "#000000", // Black
      buttonText: "#00FFFF", // Aqua
    },
    headerColor: {
      headerText: "#00FFFF", // Aqua
      headerBackground: "#000000", // Black
    },
    productSection: "#000000", // Black
    productListColor: {
      backgroundColor: "#000000", // Black
      cardBackground: "#000000", // Black
      borderColor: "#00FFFF", // Aqua
      headerColor: "#00FFFF", // Aqua
      textColor: "#FFFFFF", // White for contrast
      priceColor: "#00FFFF", // Aqua
      heartColor: "#00FFFF", // Aqua
      buttonTextColor: "#000000", // Black
      buttonBgColor: "#00FFFF", // Aqua
      buttonBorderColor: "#000000", // Black
      buttonBgColorOnHover: "#000000", // Black
    },
    footerColor: {
      bgColor: "#000000", // Black
      textColor: "#00FFFF", // Aqua
      linkHeaderColor: "#00FFFF", // Aqua
      linkColor: "#00FFFF", // Aqua
      btnBgColor: "#000000", // Black
      btnText: "#00FFFF", // Aqua
      btnBgColorOnHover: "#00FFFF", // Aqua
    },
  },
},
    {
  name: 'Lavender Dream',
  color: {
    backgroundThemeColor: "#E6E6FA", // Lavender
    navColor: {
      backgroundnavColor: "#7B68EE", // Medium Slate Blue
      storeNameTextColor: "#FFFFFF", // White
      categoryTextColor: "#4B0082", // Indigo
      searchBarColor: "#E6E6FA", // Lavender
    },
    subcategoryColor: {
      background: "#E6E6FA", // Lavender
      text: "#4B0082", // Indigo
    },
    subProductColor: {
      categoryColor: "#E6E6FA", // Lavender
      backgroundColor: "#D8BFD8", // Thistle
      textColor: "#4B0082", // Indigo
      borderColor: "#7B68EE", // Medium Slate Blue
      priceColor: "#4B0082", // Indigo
      priceLetterColor: "#FFFFFF", // White
      scrollbarColor: "#4B0082", // Indigo
      starColor: "#9400D3", // Dark Violet
    },
    firstBannerColor: {
      backgroundThemeColor1: "#E6E6FA", // Lavender
      backgroundThemeColor2: "#D8BFD8", // Thistle
      textColor: "#4B0082", // Indigo
      buttonColor: "#7B68EE", // Medium Slate Blue
      buttonText: "#FFFFFF", // White
    },
    newProductColor: {
      backgroundColor: "#E6E6FA", // Lavender
      cardBackground: "#E6E6FA", // Lavender
      borderColor: "#BA55D3", // Medium Orchid
      headerColor: "#4B0082", // Indigo
      textColor: "#4B0082", // Indigo
      priceColor: "#4B0082", // Indigo
      heartColor: "#FF00FF", // Magenta
      buttonTextColor: "#FFFFFF", // White
      buttonBgColor: "#7B68EE", // Medium Slate Blue
      buttonBorderColor: "#4B0082", // Indigo
      buttonBgColorOnHover: "#4B0082", // Indigo
    },
    secondaryBannerColor: {
      backgroundThemeColor1: "#E6E6FA", // Lavender
      backgroundThemeColor2: "#D8BFD8", // Thistle
      textColor: "#4B0082", // Indigo
      buttonColor: "#7B68EE", // Medium Slate Blue
      buttonText: "#FFFFFF", // White
    },
    offerBannerColor: {
      backgroundBoxThemeColor1: "#E6E6FA", // Lavender
      backgroundThemeColor: "#DDA0DD", // Plum
      textColor: "#4B0082", // Indigo
      buttonColor: "#7B68EE", // Medium Slate Blue
      buttonText: "#FFFFFF", // White
    },
    headerColor: {
      headerText: "#FFFFFF", // White
      headerBackground: "#7B68EE", // Medium Slate Blue
    },
    productSection: "#E6E6FA", // Lavender
    productListColor: {
      backgroundColor: "#E6E6FA", // Lavender
      cardBackground: "#E6E6FA", // Lavender
      borderColor: "#BA55D3", // Medium Orchid
      headerColor: "#4B0082", // Indigo
      textColor: "#4B0082", // Indigo
      priceColor: "#4B0082", // Indigo
      heartColor: "#FF00FF", // Magenta
      buttonTextColor: "#FFFFFF", // White
      buttonBgColor: "#7B68EE", // Medium Slate Blue
      buttonBorderColor: "#4B0082", // Indigo
      buttonBgColorOnHover: "#4B0082", // Indigo
    },
    footerColor: {
      bgColor: "#4B0082", // Indigo
      textColor: "#FFFFFF", // White
      linkHeaderColor: "#FFFFFF", // White
      linkColor: "#FFFFFF", // White
      btnBgColor: "#4B0082", // Indigo
      btnText: "#FFFFFF", // White
      btnBgColorOnHover: "#7B68EE", // Medium Slate Blue
    },
  },
},
    {
  name: 'Turquoise Tortoise',
  color: {
    backgroundThemeColor: "#E0FFFF", // Light Cyan (Turquoise)
    navColor: {
      backgroundnavColor: "#20B2AA", // Light Sea Green
      storeNameTextColor: "#1A1A1A", // Very Dark Gray
      categoryTextColor: "#2E8B57", // Sea Green
      searchBarColor: "#F0FFFF", // Azure
    },
    subcategoryColor: {
      background: "#F0FFFF", // Azure
      text: "#2F4F4F", // Dark Slate Gray
    },
    subProductColor: {
      categoryColor: "#F0FFFF", // Azure
      backgroundColor: "#E0FFFF", // Light Cyan
      textColor: "#2F4F4F", // Dark Slate Gray
      borderColor: "#20B2AA", // Light Sea Green
      priceColor: "#2E8B57", // Sea Green
      priceLetterColor: "#F0FFFF", // Azure
      scrollbarColor: "#2E8B57", // Sea Green
      starColor: "#4682B4", // Steel Blue
    },
    firstBannerColor: {
      backgroundThemeColor1: "#F0FFFF", // Azure
      backgroundThemeColor2: "#E0FFFF", // Light Cyan
      textColor: "#2F4F4F", // Dark Slate Gray
      buttonColor: "#20B2AA", // Light Sea Green
      buttonText: "#F0FFFF", // Azure
    },
    newProductColor: {
      backgroundColor: "#F0FFFF", // Azure
      cardBackground: "#F0FFFF", // Azure
      borderColor: "#40E0D0", // Turquoise
      headerColor: "#2F4F4F", // Dark Slate Gray
      textColor: "#2E8B57", // Sea Green
      priceColor: "#2E8B57", // Sea Green
      heartColor: "#FF4500", // Orange Red
      buttonTextColor: "#2E8B57", // Sea Green
      buttonBgColor: "#F0FFFF", // Azure
      buttonBorderColor: "#2E8B57", // Sea Green
      buttonBgColorOnHover: "#2E8B57", // Sea Green
    },
    secondaryBannerColor: {
      backgroundThemeColor1: "#F0FFFF", // Azure
      backgroundThemeColor2: "#E0FFFF", // Light Cyan
      textColor: "#2F4F4F", // Dark Slate Gray
      buttonColor: "#20B2AA", // Light Sea Green
      buttonText: "#F0FFFF", // Azure
    },
    offerBannerColor: {
      backgroundBoxThemeColor1: "#F0FFFF", // Azure
      backgroundThemeColor: "#AFEEEE", // Pale Turquoise
      textColor: "#2F4F4F", // Dark Slate Gray
      buttonColor: "#20B2AA", // Light Sea Green
      buttonText: "#F0FFFF", // Azure
    },
    headerColor: {
      headerText: "#F0FFFF", // Azure
      headerBackground: "#20B2AA", // Light Sea Green
    },
    productSection: "#F0FFFF", // Azure
    productListColor: {
      backgroundColor: "#F0FFFF", // Azure
      cardBackground: "#F0FFFF", // Azure
      borderColor: "#40E0D0", // Turquoise
      headerColor: "#2F4F4F", // Dark Slate Gray
      textColor: "#2E8B57", // Sea Green
      priceColor: "#2E8B57", // Sea Green
      heartColor: "#FF4500", // Orange Red
      buttonTextColor: "#2E8B57", // Sea Green
      buttonBgColor: "#F0FFFF", // Azure
      buttonBorderColor: "#2E8B57", // Sea Green
      buttonBgColorOnHover: "#2E8B57", // Sea Green
    },
    footerColor: {
      bgColor: "#2E8B57", // Sea Green
      textColor: "#F0FFFF", // Azure
      linkHeaderColor: "#F0FFFF", // Azure
      linkColor: "#F0FFFF", // Azure
      btnBgColor: "#2E8B57", // Sea Green
      btnText: "#F0FFFF", // Azure
      btnBgColorOnHover: "#20B2AA", // Light Sea Green
    },
  },
},
{
  name: 'Nostalgic Matcha',
  color: {
    backgroundThemeColor: "#F0F0F0",
    navColor: {
      backgroundnavColor: "#9BBA94",
      storeNameTextColor: "#2B2B2B",
      categoryTextColor: "#334248",
      searchBarColor: "#EDEDED",
    },
    subcategoryColor: {
      background: "#FFFFFF",
      text: "#7B8646",
    },
    subProductColor: {
      categoryColor: "#FFFFFF",
      backgroundColor: "#E8F6E8",
      textColor: "#4C4C4C",
      borderColor: "#9BBA94",
      priceColor: "#7B8646",
      priceLetterColor: "#EDEDED",
      scrollbarColor: "#7B8646",
      starColor: "#7B8646",
    },
    firstBannerColor: {
      backgroundThemeColor1: "#FFFFFF",
      backgroundThemeColor2: "#EDEDED",
      textColor: "#6B7A63",
      buttonColor: "#9BBA94",
      buttonText: "#EDEDED",
    },
    newProductColor: {
      backgroundColor: "#FFFFFF",
      cardBackground: "#FFFFFF",
      borderColor: "#B6C4B3",
      headerColor: "#6B7A63",
      textColor: "#7B8646",
      priceColor: "#7B8646",
      heartColor: "#FF7D00",
      buttonTextColor: "#7B8646",
      buttonBgColor: "#FFFFFF",
      buttonBorderColor: "#7B8646",
      buttonBgColorOnHover: "#7B8646",
    },
    secondaryBannerColor: {
      backgroundThemeColor1: "#FFFFFF",
      backgroundThemeColor2: "#EDEDED",
      textColor: "#6B7A63",
      buttonColor: "#9BBA94",
      buttonText: "#EDEDED",
    },
    offerBannerColor: {
      backgroundBoxThemeColor1: "#FFFFFF",
      backgroundThemeColor: "#C0D0B9",
      textColor: "#6B7A63",
      buttonColor: "#9BBA94",
      buttonText: "#EDEDED",
    },
    headerColor: {
      headerText: "#EDEDED",
      headerBackground: "#6B5A5A",
    },
    productSection: "#FFFFFF",
    productListColor: {
      backgroundColor: "#FFFFFF",
      cardBackground: "#FFFFFF",
      borderColor: "#B6C4B3",
      headerColor: "#6B7A63",
      textColor: "#7B8646",
      priceColor: "#7B8646",
      heartColor: "#FF7D00",
      buttonTextColor: "#7B8646",
      buttonBgColor: "#FFFFFF",
      buttonBorderColor: "#7B8646",
      buttonBgColorOnHover: "#7B8646",
    },
    footerColor: {
      bgColor: "#B4BEB1",
      textColor: "#EDEDED",
      linkHeaderColor: "#EDEDED",
      linkColor: "#EDEDED",
      btnBgColor: "#9BBA94",
      btnText: "#EDEDED",
      btnBgColorOnHover: "#7B8646",
    },
  },
},


    {
  name: 'Brunchy Orange',
  color: {
    backgroundThemeColor: "#FFF8E1", // Light Yellow
    navColor: {
      backgroundnavColor: "#FFB347", // Darker Orange
      storeNameTextColor: "#3C3C3C", // Dark Gray
      categoryTextColor: "#5A5A5A", // Medium Gray
      searchBarColor: "#FFF3E0", // Light Orange
    },
    subcategoryColor: {
      background: "#FFF8E1", // Light Yellow
      text: "#D2691E", // Chocolate
    },
    subProductColor: {
      categoryColor: "#FFF8E1", // Light Yellow
      backgroundColor: "#FFE4B5", // Moccasin
      textColor: "#5A5A5A", // Medium Gray
      borderColor: "#FFB347", // Darker Orange
      priceColor: "#D2691E", // Chocolate
      priceLetterColor: "#FFF3E0", // Light Orange
      scrollbarColor: "#D2691E", // Chocolate
      starColor: "#FF8C00", // Dark Orange
    },
    firstBannerColor: {
      backgroundThemeColor1: "#FFF8E1", // Light Yellow
      backgroundThemeColor2: "#FFF3E0", // Light Orange
      textColor: "#8B4513", // Saddle Brown
      buttonColor: "#FFB347", // Darker Orange
      buttonText: "#FFF3E0", // Light Orange
    },
    newProductColor: {
      backgroundColor: "#FFF8E1", // Light Yellow
      cardBackground: "#FFF8E1", // Light Yellow
      borderColor: "#FFD700", // Gold
      headerColor: "#8B4513", // Saddle Brown
      textColor: "#D2691E", // Chocolate
      priceColor: "#D2691E", // Chocolate
      heartColor: "#FF4500", // Orange Red
      buttonTextColor: "#D2691E", // Chocolate
      buttonBgColor: "#FFF8E1", // Light Yellow
      buttonBorderColor: "#D2691E", // Chocolate
      buttonBgColorOnHover: "#D2691E", // Chocolate
    },
    secondaryBannerColor: {
      backgroundThemeColor1: "#FFF8E1", // Light Yellow
      backgroundThemeColor2: "#FFF3E0", // Light Orange
      textColor: "#8B4513", // Saddle Brown
      buttonColor: "#FFB347", // Darker Orange
      buttonText: "#FFF3E0", // Light Orange
    },
    offerBannerColor: {
      backgroundBoxThemeColor1: "#FFF8E1", // Light Yellow
      backgroundThemeColor: "#FFA07A", // Light Salmon
      textColor: "#8B4513", // Saddle Brown
      buttonColor: "#FFB347", // Darker Orange
      buttonText: "#FFF3E0", // Light Orange
    },
    headerColor: {
      headerText: "#FFF3E0", // Light Orange
      headerBackground: "#D2691E", // Chocolate
    },
    productSection: "#FFF8E1", // Light Yellow
    productListColor: {
      backgroundColor: "#FFF8E1", // Light Yellow
      cardBackground: "#FFF8E1", // Light Yellow
      borderColor: "#FFD700", // Gold
      headerColor: "#8B4513", // Saddle Brown
      textColor: "#D2691E", // Chocolate
      priceColor: "#D2691E", // Chocolate
      heartColor: "#FF4500", // Orange Red
      buttonTextColor: "#D2691E", // Chocolate
      buttonBgColor: "#FFF8E1", // Light Yellow
      buttonBorderColor: "#D2691E", // Chocolate
      buttonBgColorOnHover: "#D2691E", // Chocolate
    },
    footerColor: {
      bgColor: "#D2691E", // Chocolate
      textColor: "#FFF3E0", // Light Orange
      linkHeaderColor: "#FFF3E0", // Light Orange
      linkColor: "#FFF3E0", // Light Orange
      btnBgColor: "#D2691E", // Chocolate
      btnText: "#FFF3E0", // Light Orange
      btnBgColorOnHover: "#FF4500", // Orange Red
    },
  },
},
];

  const handleFontChange = (e) => {
    const selectedFont = e.target.value;
    setStore(prevState => ({ ...prevState, fontFamily: selectedFont }));
  };

  return (
    <AnimatePresence>
      {(!store.fetchedFromBackend && !store.previewMode) || store?.isEdit ? navHide ? !previewMode && (
        <motion.div key='first' initial={{x:20}} exit={{x:500}} transition={{duration:0.3}} animate={{x:0}} className='fixed top-0 right-0 w-80 h-screen overflow-y-scroll bg-white z-20 border-2 border-gray-200 text-gray-600'>
          <h1 className=' mt-[20px] text-[#6A6A6A] text-xl font-bold border-b-2 border-black pb-6 w-full px-4'>Design your Website</h1>

          <div className='flex justify-between  font-Cinzel  mt-10 font-semibold text-[#6A6A6A] '>
            <button className={`flex-1 text-center ${openType === 1 ? 'text-black' : ''}`} onClick={e => { e.preventDefault(); setOpenType(1) }}>Content</button>
            <button className={`flex-1 text-center ${openType === 2 ? 'text-black' : ''}`} onClick={e => { e.preventDefault(); setOpenType(2) }}>Design</button>
            {store.isEdit &&
              <button className={`flex-1 text-center ${openType === 3 ? 'text-black' : ''}`} onClick={e => { e.preventDefault(); setOpenType(3) }}>Skin</button>
            }
          </div>
          <div className='text-red-600 absolute top-[22px] right-2' onClick={(e) => { e.preventDefault(); setStore(n => ({ ...n, previewMode: true })) }}>X</div>
          <div className='text-red-600 absolute top-[22px] right-10' onClick={(e) => { e.preventDefault(); setNavHide(false) }}>Hide</div>
          
          {openType === 1 && (
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
                  <input value={store.thirdBannerText.heading} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prev => ({ ...prev, thirdBannerText: { ...prev.thirdBannerText, heading: e.target.value } })) }} ></input><br />
                  <label className='text-[10px]'>Description</label><br />
                  <textarea value={store.thirdBannerText.paragraph} type='text' className='border border-[#6A6A6A] rounded px-2 h-[80px]' onChange={(e) => { setStore(prev => ({ ...prev, thirdBannerText: { ...prev.thirdBannerText, paragraph: e.target.value } })) }} ></textarea><br />
                  <label className='text-[10px]'>Image:</label> <ImageDrop setStore={setStore} imageData='thirdBanner.thirdBannerUrl' />
                </li>
                <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
                  Banner #2<br />
                  <div>
                    <FontSelector section="Banner2" />
                  </div>
                  <label className='text-[10px]'>Title</label><br />
                  <input value={store.secondaryBannerText.heading} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prev => ({ ...prev, secondaryBannerText: { ...prev.secondaryBannerText, heading: e.target.value } })) }} ></input><br />
                  <label className='text-[10px]'>Description</label><br />
                  <textarea value={store.secondaryBannerText.paragraph} type='text' className='border border-[#6A6A6A] rounded px-2 h-[80px]' onChange={(e) => { setStore(prev => ({ ...prev, secondaryBannerText: { ...prev.secondaryBannerText, paragraph: e.target.value } })) }} ></textarea><br />
                  <label className='text-[10px]'>Image:</label> <ImageDrop setStore={setStore} imageData='secondaryBanner.secondaryBannerUrl' />
                </li>
                <li className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
                  Banner #3<br />
                  <div>
                    <FontSelector section="Banner3" />
                  </div>
                  <label className='text-[10px]'>Title</label><br />
                  <input value={store.offerBannerText.para1} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prev => ({ ...prev, offerBannerText: { ...prev.offerBannerText, para1: e.target.value } })) }} ></input><br />
                  <label className='text-[10px]'>Description</label><br />
                  <textarea value={store.offerBannerText.para2} type='text' className='border border-[#6A6A6A] rounded px-2 h-[80px]' onChange={(e) => { setStore(prev => ({ ...prev, offerBannerText: { ...prev.offerBannerText, para2: e.target.value } })) }} ></textarea><br />
                  <label className='text-[10px]'>Description</label><br />
                  <textarea value={store.offerBannerText.para3} type='text' className='border border-[#6A6A6A] rounded px-2 h-[80px]' onChange={(e) => { setStore(prev => ({ ...prev, offerBannerText: { ...prev.offerBannerText, para3: e.target.value } })) }} ></textarea><br />
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
                  Footer<br />
                  <div>
                    <FontSelector section="Footer" />
                  </div>
                  <label className='text-[10px]'>Location</label><br />
                  <input value={store.location} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prevState => ({ ...prevState, location: e.target.value })); console.log(store.location) }} ></input><br />
                  <label className='text-[10px]'>Email</label><br />
                  <input value={store.email} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prev => ({ ...prev, email: e.target.value })) }} ></input><br />
                  <label className='text-[10px]'>Phone Number</label><br />
                  <input value={store.phoneNumber} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prev => ({ ...prev, phoneNumber: e.target.value })) }} ></input><br />
                  <div className='mt-3'>Social Media Links</div>
                  <label className='text-[10px]'>Facebook</label><br />
                  <input value={store.socialMediaLinks.facebook} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, facebook: e.target.value } })); }} ></input><br />
                  <label className='text-[10px]'>Twitter</label><br />
                  <input value={store.socialMediaLinks.twitter} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, twitter: e.target.value } })); }} ></input><br />
                  <label className='text-[10px]'>Instagram</label><br />
                  <input value={store.socialMediaLinks.instagram} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, instagram: e.target.value } })); }} ></input><br />
                  <label className='text-[10px]'>linkedIn</label><br />
                  <input value={store.socialMediaLinks.linkedin} type='text' className='border border-[#6A6A6A] rounded px-2' onChange={(e) => { setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, linkedin: e.target.value } })); }} ></input><br />

                </li>
              </ul>
              {addProductForm && <ProductForm onClose={() => setAddProductForm(!addProductForm)} />}
            </div>
          )}

{openType === 2 && (
  <div className="mt-5 px-4 capitalize">
    <div className="flex flex-col gap-4">

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Select Preset</h4>
        <select 
          className="border border-gray-300 rounded-md py-2 px-4 w-full"
          onChange={handlePresetChange}
        >
          <option value="">Select Preset</option>
          {presets.map((preset) => (
            <option key={preset.name} value={preset.name}>{preset.name}</option>
          ))}
        </select>
      </div>

      {Object.entries(color).map(([colorKey, colorValue], index) => {
        if (typeof colorValue === 'object') {
          return (
            <div key={index}>
              <h4 className="text-lg font-semibold mt-5 mb-2">{friendlyNames[colorKey]}</h4>
              {Object.entries(colorValue).map(([nestedKey, nestedValue], nestedIndex) => (
                <div key={nestedIndex} className="flex flex-row justify-around items-start items-center">
                  <label className="text-gray-700 w-24 flex-grow">{nestedFriendlyNames[nestedKey]}</label>
                  <div className="flex mt-2 md:flex-row items-center justify-center ml-4">
                    <input
                      type="color"
                      value={nestedValue}
                      onChange={(e) => handleColorChange(e.target.value, nestedKey, colorKey)}
                      className="rounded-full px-1 border border-gray-300 shadow-md focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <div key={index}>
              <h4 className="text-lg font-semibold mt-5 mb-2">{friendlyNames[colorKey]}</h4>
              <div className="flex justify-between">
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


          {openType === 3 && (
            <div className="mt-5 px-4 capitalize">
              {store?.componentSkin?.map((component, index) => (
                <li key={index} className='text-sm font-semibold border-b-2 border-gray-200 pb-5'>
                  {component.component}:<br />
                  <label className='text-[10px]'>Active Skin</label><br />
                  <select value={component.activeSkin} onChange={e => handleActiveSkinChange(e, index)} className='border border-[#6A6A6A] rounded px-2'>
                    {component.skinInventory.map((skin, idx) => (
                      <option key={idx} value={skin}>{skin}</option>
                    ))}
                  </select>
                </li>
              ))}
            </div>
          )}
          <div className='flex justify-center my-3'>
            <SaveStoreButton />
          </div>
        </motion.div>
      ) : (
        <motion.button key='second' initial={{x:-20}} exit={{x:20}} animate={{x:0}} className='fixed top-0 right-0 mt-24 bg-yellow-400 py-1 rounded-l z-20 text-4xl' onClick={(e) => { e.preventDefault(); setNavHide(true) }}><FaCaretLeft />
        </motion.button>
      ) : !store.fetchedFromBackend && (
        // <button className='fixed top-0 right-10 mt-20 bg-yellow-400 px-4 py-1 rounded z-20' onClick={(e) => { e.preventDefault(); setStore(n => ({ ...n, previewMode: false })) }}>Preview</button>
        <></>
      )}
    </AnimatePresence>
  );
};

export default Editor;


var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
function abc(liveChatSource) {

  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  // https://embed.tawk.to/66759d429d7f358570d20570/1i0tmsjtn
  s1.src = `${liveChatSource}`;
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);

};
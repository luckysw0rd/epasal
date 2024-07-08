import React, { useEffect, useState } from 'react';
import { useStore } from '../../Theme/Theme1/T1Context';
import ProductForm from '../../Theme/Theme1/SubProduct/ProductForm';
import ImageDrop from './ImageDrop';
import { RxCrossCircled } from "react-icons/rx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FontSelector from './FontSelector';
import SaveStoreButton from '../../Theme/Theme1/SaveButton/SaveStoreButton';
import { SketchPicker } from 'react-color';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCaretLeft } from "react-icons/fa";
import { BiSolidHide } from "react-icons/bi";
import { FaPlus, FaUpload } from 'react-icons/fa';
import { TbLayoutNavbarCollapseFilled } from "react-icons/tb";
import { CiTextAlignJustify } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

// List of fonts from your Tailwind configuration
const fonts = [
  "Anta", "VT323", "Kode Mono", "Sixtyfour", "Oleo Script", "Mansalva",
  "Genos", "Orbitron", "Cinzel", "Exo 2", "Roboto", "Sanchez", "DM Serif Text"
];


// Handle file import


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
    productListColor: ' Featured',
    newProductColor: 'New Product ',
    footerColor: 'Footer Color',
  };

  // Mapping of developer names to user-friendly names for nested properties
  const nestedFriendlyNames = {
    backgroundThemeColor1: 'Background',
    backgroundThemeColor2: 'Background 2',
    backgroundThemeColor: 'Background ',
    textColor: 'Text ',
    buttonColor: 'Button Color',
    buttonText: 'Button Text',
    backgroundBoxThemeColor1: 'Box Background',
    backgroundnavColor: 'Background ',
    storeNameTextColor: 'Text',
    categoryTextColor: 'Text',
    searchBarColor: 'Search Bar',
    headerText: 'Header Text Color',
    headerBackground: 'Header Background Color',
    background: 'Background',
    text: 'Text ',
    categoryColor: ' Section Background ',
    backgroundColor: ' Card Background ',
    borderColor: ' Border ',
    priceColor: ' Price ',
    priceLetterColor: '  Button Text ',
    scrollbarColor: ' Scrollbar ',
    starColor: ' Star ',
    cardBackground: ' Card  ',
    borderColor: ' List Border ',
    headerColor: ' List Header ',
    textColor: ' Text ',
    priceColor: 'Price',
    heartColor: ' Heart ',
    buttonTextColor: ' Button Text ',
    buttonBgColor: ' Button Color',
    buttonBorderColor: ' Button Border ',
    buttonBgColorOnHover: ' Button Background Hover ',
    bgColor: ' Background ',
    textColor: 'Text ',
    linkHeaderColor: 'Link Header',
    linkColor: ' Links ',
    btnBgColor: ' Button Color',
    btnText: ' Button Text ',
    btnBgColorOnHover: ' Button Background Hover ',
  };
  const handleImportPreset = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedPreset = JSON.parse(event.target.result);
        console.log("Imported Preset:", importedPreset);  // Log the imported preset
        setStore(prevStore => ({
          ...prevStore,
          color: {
            ...prevStore.color,
            ...importedPreset,  // Assume importedPreset is an object with color properties
          }
        }));
        console.log("Updated Store:", store);  // Log the store after setting the imported preset
        toast.success("Preset imported successfully!");
      } catch (error) {
        console.error("Error importing preset:", error);
        toast.error("Failed to import preset. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  // Handle file export
  const handleExportPreset = () => {
    const presetToExport = JSON.stringify(store.color, null, 2);
    const blob = new Blob([presetToExport], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'preset.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Preset exported successfully!");
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
    console.log(color);
  };

  const handleHexCodeChange = (e, field) => {
    const hexCode = e.target.value;
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode)) {
      handleColorChange(hexCode, field);
    }
  };
  const handleRemoveCategory = (index) => {
    setStore((prevStore) => ({
      ...prevStore,
      subCategories: prevStore.subCategories.filter((_, i) => i !== index),
    }));
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
    console.log(color);
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
      name: 'Graphite Gray',
      color: {
        backgroundThemeColor: "#ffffff",
        navColor: {
          backgroundnavColor: "#373a40",
          storeNameTextColor: "#eeeeee",
          categoryTextColor: "#dc5f00",
          searchBarColor: "#fcf3f3",
        },
        subcategoryColor: {
          background: "#eeeeee",
          text: "#36393f",
        },
        subProductColor: {
          categoryColor: "#eeeeee",
          backgroundColor: "#fafafa",
          textColor: "#333333",
          borderColor: "#ffffff",
          priceColor: "#3d3d3d",
          priceLetterColor: "#ffffff",
          buttonColor: "#3d3d3d",
          scrollbarColor: "#1f1f1e",
          starColor: "#3d3d3d",

        },
        firstBannerColor: {
          backgroundThemeColor1: "#fafafa",
          // backgroundThemeColor2: "#fcf3f3",
          textColor: "#1f1f1e",
          buttonColor: "#3d3d3d",
          buttonText: "#ffffff",
        },
        newProductColor: {
          backgroundColor: "#eeeeee",
          cardBackground: "#fafafa",
          borderColor: "#cac4c4",
          headerColor: "#5D4B3F",
          textColor: "#3d3d3d",
          priceColor: "#3d3d3d",
          heartColor: "#FF4D00",
          buttonTextColor: "#ffffff",
          buttonBgColor: "#3d3d3d",
          buttonBorderColor: "#4F3100",
          buttonBgColorOnHover: "#263129",
        },
        secondaryBannerColor: {
          backgroundThemeColor1: "#fafafa",
          // backgroundThemeColor2: "#fafafa",
          textColor: "#1f1f1e",
          buttonColor: "#3d3d3d",
          buttonText: "#ffffff",
        },
        productSection: "#ffffff",
        productListColor: {
          backgroundColor: "#eeeeee",
          cardBackground: "#fafafa",
          borderColor: "#cac4c4",
          headerColor: "#5D4B3F",
          textColor: "#3d3d3d",
          priceColor: "#3d3d3d",
          heartColor: "#FF4D00",
          buttonTextColor: "#ffffff",
          buttonBgColor: "#3d3d3d",
          buttonBorderColor: "#4F3100",
          buttonBgColorOnHover: "#4F3100",
        },
        offerBannerColor: {
          backgroundBoxThemeColor1: "#ffffff",
          backgroundThemeColor: "#eeeeee",
          textColor: "#4E3E34",
          buttonColor: "#401a12",
          buttonText: "#3e1818",
        },
        footerColor: {
          bgColor: "#1e1e20",
          textColor: "#ffffff",
          linkHeaderColor: "#ffffff",
          linkColor: "#f2f2f2",
          btnBgColor: "#ffffff",
          btnText: "#fafafa",
          btnBgColorOnHover: "#4F3100",
        },
        headerColor: {
          headerText: "#ffffff",
          headerBackground: "#7a5C5c",
        },


      }
    },
    {
      name: 'Blue Voyage',
      color: {
        backgroundThemeColor: "#ffffff",
        navColor: {
          backgroundnavColor: "#9fc3de",
          storeNameTextColor: "#0f1035",
          categoryTextColor: "#638897",
          searchBarColor: "#EDEDED"
        },
        subcategoryColor: {
          background: "#FFFFFF",
          text: "#0f1035"
        },
        subProductColor: {
          categoryColor: "#FFFFFF",
          backgroundColor: "#dbf0ff",
          textColor: "#0f1035",
          borderColor: "#dbf0ff",
          priceColor: "#0f1035",
          priceLetterColor: "#EDEDED",
          scrollbarColor: "#8ba6bb",
          starColor: "#0f1035"
        },
        firstBannerColor: {
          backgroundThemeColor1: "#FFFFFF",
          backgroundThemeColor2: "#EDEDED",
          textColor: "#2f464a",
          buttonColor: "#32454b",
          buttonText: "#ffffff"
        },
        newProductColor: {
          backgroundColor: "#FFFFFF",
          cardBackground: "#FFFFFF",
          borderColor: "#dcf2f1",
          headerColor: "#2f464a",
          textColor: "#2f464a",
          priceColor: "#2f4655",
          heartColor: "#FF7D00",
          buttonTextColor: "#2f464a",
          buttonBgColor: "#FFFFFF",
          buttonBorderColor: "#2f464a",
          buttonBgColorOnHover: "#dcf2f1"
        },
        secondaryBannerColor: {
          backgroundThemeColor1: "#FFFFFF",
          backgroundThemeColor2: "#EDEDED",
          textColor: "#2d4147",
          buttonColor: "#2d4147",
          buttonText: "#ffffff"
        },
        offerBannerColor: {
          backgroundBoxThemeColor1: "#ffffff",
          backgroundThemeColor: "#eaf3f6",
          textColor: "#2a4140",
          buttonColor: "#2a4140",
          buttonText: "#EDEDED"
        },
        headerColor: {
          headerText: "#EDEDED",
          headerBackground: "#6B5A5A"
        },
        productSection: "#FFFFFF",
        productListColor: {
          backgroundColor: "#FFFFFF",
          cardBackground: "#FFFFFF",
          borderColor: "#dcf2f1",
          headerColor: "#2f464a",
          textColor: "#2f464a",
          priceColor: "#2f4661",
          heartColor: "#FF7D00",
          buttonTextColor: "#ffffff",
          buttonBgColor: "#2a4140",
          buttonBorderColor: "#2a4140",
          buttonBgColorOnHover: "#2a4140"
        },
        footerColor: {
          bgColor: "#dcf2f1",
          textColor: "#075985",
          linkHeaderColor: "#075d88",
          linkColor: "#075985",
          btnBgColor: "#075985",
          btnText: "#07547d",
          btnBgColorOnHover: "#0891b2"
        }
      }
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
      name: 'Soft Lavender',
      color: {
        backgroundThemeColor: "#F9F5FF",
        navColor: {
          backgroundnavColor: "#E6E0FF",
          storeNameTextColor: "#4B3A5A",
          categoryTextColor: "#A89BC8",
          searchBarColor: "#F2EBFF",
        },
        subcategoryColor: {
          background: "#F2EBFF",
          text: "#4B3A5A",
        },
        subProductColor: {
          categoryColor: "#F9F5FF",
          backgroundColor: "#F2EBFF",
          textColor: "#4B3A5A",
          borderColor: "#E0D9FF",
          priceColor: "#4B3A5A",
          priceLetterColor: "#F2EBFF",
          buttonColor: "#A89BC8",
          scrollbarColor: "#4B3A5A",
          starColor: "#D9CCFF",
        },
        firstBannerColor: {
          backgroundThemeColor1: "#F9F5FF",
          textColor: "#4B3A5A",
          buttonColor: "#A89BC8",
          buttonText: "#F9F5FF",
        },
        newProductColor: {
          backgroundColor: "#F2EBFF",
          cardBackground: "#F9F5FF",
          borderColor: "#E0D9FF",
          headerColor: "#4B3A5A",
          textColor: "#4B3A5A",
          priceColor: "#4B3A5A",
          heartColor: "#D9CCFF",
          buttonTextColor: "#F9F5FF",
          buttonBgColor: "#A89BC8",
          buttonBorderColor: "#4B3A5A",
          buttonBgColorOnHover: "#4B3A5A",
        },
        secondaryBannerColor: {
          backgroundThemeColor1: "#F9F5FF",
          textColor: "#4B3A5A",
          buttonColor: "#A89BC8",
          buttonText: "#F9F5FF",
        },
        offerBannerColor: {
          backgroundBoxThemeColor1: "#F2EBFF",
          backgroundThemeColor: "#E0D9FF",
          textColor: "#4B3A5A",
          buttonColor: "#A89BC8",
          buttonText: "#F9F5FF",
        },
        headerColor: {
          headerText: "#4B3A5A",
          headerBackground: "#E6E0FF",
        },
        productSection: "#F9F5FF",
        productListColor: {
          backgroundColor: "#F2EBFF",
          cardBackground: "#F9F5FF",
          borderColor: "#E0D9FF",
          headerColor: "#4B3A5A",
          textColor: "#4B3A5A",
          priceColor: "#4B3A5A",
          heartColor: "#D9CCFF",
          buttonTextColor: "#F9F5FF",
          buttonBgColor: "#A89BC8",
          buttonBorderColor: "#4B3A5A",
          buttonBgColorOnHover: "#4B3A5A",
        },
        footerColor: {
          bgColor: "#E6E0FF",
          textColor: "#4B3A5A",
          linkHeaderColor: "#4B3A5A",
          linkColor: "#4B3A5A",
          btnBgColor: "#A89BC8",
          btnText: "#F9F5FF",
          btnBgColorOnHover: "#4B3A5A",
        },
      }
    },
    {
      name: 'Peach Blossom',
      color: {
        backgroundThemeColor: "#FFF5EB",
        navColor: {
          backgroundnavColor: "#FFDAB9",
          storeNameTextColor: "#5A4034",
          categoryTextColor: "#FF8C69",
          searchBarColor: "#FFF5EB",
        },
        subcategoryColor: {
          background: "#FFF0E6",
          text: "#5A4034",
        },
        subProductColor: {
          categoryColor: "#FFF0E6",
          backgroundColor: "#FFF9F3",
          textColor: "#5A4034",
          borderColor: "#FFDAB9",
          priceColor: "#5A4034",
          priceLetterColor: "#FFF5EB",
          scrollbarColor: "#FF8C69",
          starColor: "#FF8C69",
        },
        firstBannerColor: {
          backgroundThemeColor1: "#FFF5EB",
          textColor: "#5A4034",
          buttonColor: "#FF8C69",
          buttonText: "#FFF5EB",
        },
        newProductColor: {
          backgroundColor: "#FFF9F3",
          cardBackground: "#FFF0E6",
          borderColor: "#FFDAB9",
          headerColor: "#5A4034",
          textColor: "#5A4034",
          priceColor: "#5A4034",
          heartColor: "#FF8C69",
          buttonTextColor: "#FFF5EB",
          buttonBgColor: "#FF8C69",
          buttonBorderColor: "#5A4034",
          buttonBgColorOnHover: "#5A4034",
        },
        secondaryBannerColor: {
          backgroundThemeColor1: "#FFF5EB",
          textColor: "#5A4034",
          buttonColor: "#FF8C69",
          buttonText: "#FFF5EB",
        },
        offerBannerColor: {
          backgroundBoxThemeColor1: "#FFF9F3",
          backgroundThemeColor: "#FFDAB9",
          textColor: "#5A4034",
          buttonColor: "#FF8C69",
          buttonText: "#FFF5EB",
        },
        headerColor: {
          headerText: "#5A4034",
          headerBackground: "#FFDAB9",
        },
        productSection: "#FFF5EB",
        productListColor: {
          backgroundColor: "#FFF9F3",
          cardBackground: "#FFF0E6",
          borderColor: "#FFDAB9",
          headerColor: "#5A4034",
          textColor: "#5A4034",
          priceColor: "#5A4034",
          heartColor: "#FF8C69",
          buttonTextColor: "#FFF5EB",
          buttonBgColor: "#FF8C69",
          buttonBorderColor: "#5A4034",
          buttonBgColorOnHover: "#5A4034",
        },
        footerColor: {
          bgColor: "#FFDAB9",
          textColor: "#5A4034",
          linkHeaderColor: "#5A4034",
          linkColor: "#5A4034",
          btnBgColor: "#FF8C69",
          btnText: "#FFF5EB",
          btnBgColorOnHover: "#5A4034",
        },
      }
    },


    {
      name: 'Coral Reef',
      color: {
        backgroundThemeColor: "#FFF5F0",
        navColor: {
          backgroundnavColor: "#FFCCB6",
          storeNameTextColor: "#5B4233",
          categoryTextColor: "#FF9273",
          searchBarColor: "#FFEDE3",
        },
        subcategoryColor: {
          background: "#FFEDE3",
          text: "#5B4233",
        },
        subProductColor: {
          categoryColor: "#FFF5F0",
          backgroundColor: "#FFCCB6",
          textColor: "#5B4233",
          borderColor: "#FFCCB6",
          priceColor: "#5B4233",
          priceLetterColor: "#FFEDE3",
          buttonColor: "#FF9273",
          scrollbarColor: "#5B4233",
          starColor: "#FF9273",
        },
        firstBannerColor: {
          backgroundThemeColor1: "#FFF5F0",
          textColor: "#5B4233",
          buttonColor: "#FF9273",
          buttonText: "#FFF5F0",
        },
        newProductColor: {
          backgroundColor: "#FFEDE3",
          cardBackground: "#FFF5F0",
          borderColor: "#FFCCB6",
          headerColor: "#5B4233",
          textColor: "#5B4233",
          priceColor: "#5B4233",
          heartColor: "#FF9273",
          buttonTextColor: "#FFF5F0",
          buttonBgColor: "#FF9273",
          buttonBorderColor: "#5B4233",
          buttonBgColorOnHover: "#5B4233",
        },
        secondaryBannerColor: {
          backgroundThemeColor1: "#FFF5F0",
          textColor: "#5B4233",
          buttonColor: "#FF9273",
          buttonText: "#FFF5F0",
        }, offerBannerColor: {
          backgroundBoxThemeColor1: "#FFEDE3",
          backgroundThemeColor: "#FFCCB6",
          textColor: "#5B4233",
          buttonColor: "#FF9273",
          buttonText: "#FFF5F0",
        }, headerColor: {
          headerText: "#5B4233",
          headerBackground: "#FFCCB6",
        },
        productSection: "#FFF5F0",
        productListColor: {
          backgroundColor: "#FFEDE3",
          cardBackground: "#FFF5F0",
          borderColor: "#FFCCB6",
          headerColor: "#5B4233",
          textColor: "#5B4233",
          priceColor: "#5B4233",
          heartColor: "#FF9273",
          buttonTextColor: "#FFF5F0",
          buttonBgColor: "#FF9273",
          buttonBorderColor: "#5B4233",
          buttonBgColorOnHover: "#5B4233",
        },
        footerColor: {
          bgColor: "#FFCCB6",
          textColor: "#5B4233",
          linkHeaderColor: "#5B4233",
          linkColor: "#5B4233",
          btnBgColor: "#FF9273",
          btnText: "#FFF5F0",
          btnBgColorOnHover: "#5B4233",
        },
      }
    },
    {
      "name": "Pastel Blossom",
      "color": {
        "backgroundThemeColor": "#FFF0F5",
        "navColor": {
          "backgroundnavColor": "#FFC1CC",
          "storeNameTextColor": "#7A3B4E",
          "categoryTextColor": "#FFA3B0",
          "searchBarColor": "#FFE4E1"
        },
        "subcategoryColor": {
          "background": "#FFE4E1",
          "text": "#7A3B4E"
        },
        "subProductColor": {
          "categoryColor": "#FFF0F5",
          "backgroundColor": "#FFC1CC",
          "textColor": "#7A3B4E",
          "borderColor": "#FFC1CC",
          "priceColor": "#7A3B4E",
          "priceLetterColor": "#FFE4E1",
          "buttonColor": "#FFA3B0",
          "scrollbarColor": "#7A3B4E",
          "starColor": "#FFA3B0"
        },
        "firstBannerColor": {
          "backgroundThemeColor1": "#FFF0F5",
          "textColor": "#7A3B4E",
          "buttonColor": "#FFA3B0",
          "buttonText": "#FFF0F5"
        },
        "newProductColor": {
          "backgroundColor": "#FFE4E1",
          "cardBackground": "#FFF0F5",
          "borderColor": "#FFC1CC",
          "headerColor": "#7A3B4E",
          "textColor": "#7A3B4E",
          "priceColor": "#7A3B4E",
          "heartColor": "#FFA3B0",
          "buttonTextColor": "#FFF0F5",
          "buttonBgColor": "#FFA3B0",
          "buttonBorderColor": "#7A3B4E",
          "buttonBgColorOnHover": "#7A3B4E"
        },
        "secondaryBannerColor": {
          "backgroundThemeColor1": "#FFF0F5",
          "textColor": "#7A3B4E",
          "buttonColor": "#FFA3B0",
          "buttonText": "#FFF0F5"
        },
        "offerBannerColor": {
          "backgroundBoxThemeColor1": "#FFE4E1",
          "backgroundThemeColor": "#FFC1CC",
          "textColor": "#7A3B4E",
          "buttonColor": "#FFA3B0",
          "buttonText": "#FFF0F5"
        },
        "headerColor": {
          "headerText": "#7A3B4E",
          "headerBackground": "#FFC1CC"
        },
        "productSection": "#FFF0F5",
        "productListColor": {
          "backgroundColor": "#FFE4E1",
          "cardBackground": "#FFF0F5",
          "borderColor": "#FFC1CC",
          "headerColor": "#7A3B4E",
          "textColor": "#7A3B4E",
          "priceColor": "#7A3B4E",
          "heartColor": "#FFA3B0",
          "buttonTextColor": "#FFF0F5",
          "buttonBgColor": "#FFA3B0",
          "buttonBorderColor": "#7A3B4E",
          "buttonBgColorOnHover": "#7A3B4E"
        },
        "footerColor": {
          "bgColor": "#FFC1CC",
          "textColor": "#7A3B4E",
          "linkHeaderColor": "#7A3B4E",
          "linkColor": "#7A3B4E",
          "btnBgColor": "#FFA3B0",
          "btnText": "#FFF0F5",
          "btnBgColorOnHover": "#7A3B4E"
        }
      }
    },
    {
      "name": "Lavender Fields",
      "color": {
        "backgroundThemeColor": "#F0F0FF",
        "navColor": {
          "backgroundnavColor": "#C1B6FF",
          "storeNameTextColor": "#42335B",
          "categoryTextColor": "#9273FF",
          "searchBarColor": "#EDE3FF"
        },
        "subcategoryColor": {
          "background": "#EDE3FF",
          "text": "#42335B"
        },
        "subProductColor": {
          "categoryColor": "#F0F0FF",
          "backgroundColor": "#C1B6FF",
          "textColor": "#42335B",
          "borderColor": "#C1B6FF",
          "priceColor": "#42335B",
          "priceLetterColor": "#EDE3FF",
          "buttonColor": "#9273FF",
          "scrollbarColor": "#42335B",
          "starColor": "#9273FF"
        },
        "firstBannerColor": {
          "backgroundThemeColor1": "#F0F0FF",
          "textColor": "#42335B",
          "buttonColor": "#9273FF",
          "buttonText": "#F0F0FF"
        },
        "newProductColor": {
          "backgroundColor": "#EDE3FF",
          "cardBackground": "#F0F0FF",
          "borderColor": "#C1B6FF",
          "headerColor": "#42335B",
          "textColor": "#42335B",
          "priceColor": "#42335B",
          "heartColor": "#9273FF",
          "buttonTextColor": "#F0F0FF",
          "buttonBgColor": "#9273FF",
          "buttonBorderColor": "#42335B",
          "buttonBgColorOnHover": "#42335B"
        },
        "secondaryBannerColor": {
          "backgroundThemeColor1": "#F0F0FF",
          "textColor": "#42335B",
          "buttonColor": "#9273FF",
          "buttonText": "#F0F0FF"
        },
        "offerBannerColor": {
          "backgroundBoxThemeColor1": "#EDE3FF",
          "backgroundThemeColor": "#C1B6FF",
          "textColor": "#42335B",
          "buttonColor": "#9273FF",
          "buttonText": "#F0F0FF"
        },
        "headerColor": {
          "headerText": "#42335B",
          "headerBackground": "#C1B6FF"
        },
        "productSection": "#F0F0FF",
        "productListColor": {
          "backgroundColor": "#EDE3FF",
          "cardBackground": "#F0F0FF",
          "borderColor": "#C1B6FF",
          "headerColor": "#42335B",
          "textColor": "#42335B",
          "priceColor": "#42335B",
          "heartColor": "#9273FF",
          "buttonTextColor": "#F0F0FF",
          "buttonBgColor": "#9273FF",
          "buttonBorderColor": "#42335B",
          "buttonBgColorOnHover": "#42335B"
        },
        "footerColor": {
          "bgColor": "#C1B6FF",
          "textColor": "#42335B",
          "linkHeaderColor": "#42335B",
          "linkColor": "#42335B",
          "btnBgColor": "#9273FF",
          "btnText": "#F0F0FF",
          "btnBgColorOnHover": "#42335B"
        }
      }
    },
    {
      "name": "Ghost of Tsushima - Samurai Red & Black",
      "color": {
        "backgroundThemeColor": "#1C1C1C",
        "navColor": {
          "backgroundnavColor": "#2E2E2E",
          "storeNameTextColor": "#FB8E8E",
          "categoryTextColor": "#FF6969",
          "searchBarColor": "#3D3D3D"
        },
        "subcategoryColor": {
          "background": "#3D3D3D",
          "text": "#FB8E8E"
        },
        "subProductColor": {
          "categoryColor": "#1C1C1C",
          "backgroundColor": "#2E2E2E",
          "textColor": "#FB8E8E",
          "borderColor": "#2E2E2E",
          "priceColor": "#FB8E8E",
          "priceLetterColor": "#3D3D3D",
          "buttonColor": "#EDBFBF",
          "scrollbarColor": "#FB8E8E",
          "starColor": "#FF6969"
        },
        "firstBannerColor": {
          "backgroundThemeColor1": "#1C1C1C",
          "textColor": "#FB8E8E",
          "buttonColor": "#EDBFBF",
          "buttonText": "#1C1C1C"
        },
        "newProductColor": {
          "backgroundColor": "#3D3D3D",
          "cardBackground": "#1C1C1C",
          "borderColor": "#2E2E2E",
          "headerColor": "#FB8E8E",
          "textColor": "#FB8E8E",
          "priceColor": "#FB8E8E",
          "heartColor": "#FF6969",
          "buttonTextColor": "#1C1C1C",
          "buttonBgColor": "#EDBFBF",
          "buttonBorderColor": "#FB8E8E",
          "buttonBgColorOnHover": "#FB8E8E"
        },
        "secondaryBannerColor": {
          "backgroundThemeColor1": "#1C1C1C",
          "textColor": "#FB8E8E",
          "buttonColor": "#EDBFBF",
          "buttonText": "#1C1C1C"
        },
        "offerBannerColor": {
          "backgroundBoxThemeColor1": "#3D3D3D",
          "backgroundThemeColor": "#2E2E2E",
          "textColor": "#FB8E8E",
          "buttonColor": "#EDBFBF",
          "buttonText": "#1C1C1C"
        },
        "headerColor": {
          "headerText": "#FB8E8E",
          "headerBackground": "#2E2E2E"
        },
        "productSection": "#1C1C1C",
        "productListColor": {
          "backgroundColor": "#3D3D3D",
          "cardBackground": "#1C1C1C",
          "borderColor": "#2E2E2E",
          "headerColor": "#FB8E8E",
          "textColor": "#FB8E8E",
          "priceColor": "#FB8E8E",
          "heartColor": "#FF6969",
          "buttonTextColor": "#1C1C1C",
          "buttonBgColor": "#EDBFBF",
          "buttonBorderColor": "#FB8E8E",
          "buttonBgColorOnHover": "#FB8E8E"
        },
        "footerColor": {
          "bgColor": "#2E2E2E",
          "textColor": "#FB8E8E",
          "linkHeaderColor": "#FB8E8E",
          "linkColor": "#FB8E8E",
          "btnBgColor": "#FF6969",
          "btnText": "#1C1C1C",
          "btnBgColorOnHover": "#FB8E8E"
        }
      }
    },
    {
      "name": "Ghost of Tsushima - Blood Moon",
      "color": {
        "backgroundThemeColor": "#1F1B2D",
        "navColor": {
          "backgroundnavColor": "#332B47",
          "storeNameTextColor": "#FFFFFF",
          "categoryTextColor": "#FFFFFF",
          "searchBarColor": "#44385D"
        },
        "subcategoryColor": {
          "background": "#44385D",
          "text": "#FFFFFF"
        },
        "subProductColor": {
          "categoryColor": "#1F1B2D",
          "backgroundColor": "#332B47",
          "textColor": "#FFFFFF",
          "borderColor": "#332B47",
          "priceColor": "#FF3B3F",
          "priceLetterColor": "#FFFFFF",
          "buttonColor": "#FFFFFF",
          "scrollbarColor": "#FF3B3F",
          "starColor": "#FFFFFF"
        },
        "firstBannerColor": {
          "backgroundThemeColor1": "#1F1B2D",
          "textColor": "#FFFFFF",
          "buttonColor": "#FFFFFF",
          "buttonText": "#FFFFFF"
        },
        "newProductColor": {
          "backgroundColor": "#44385D",
          "cardBackground": "#1F1B2D",
          "borderColor": "#332B47",
          "headerColor": "#FF3B3F",
          "textColor": "#FFFFFF",
          "priceColor": "#FFFFFF",
          "heartColor": "#FF615E",
          "buttonTextColor": "#1F1B2D",
          "buttonBgColor": "#FF615E",
          "buttonBorderColor": "#FF3B3F",
          "buttonBgColorOnHover": "#FF3B3F"
        },
        "secondaryBannerColor": {
          "backgroundThemeColor1": "#1F1B2D",
          "textColor": "#FFFFFF",
          "buttonColor": "#FFFFFF",
          "buttonText": "#FFFFFF"
        },
        "offerBannerColor": {
          "backgroundBoxThemeColor1": "#44385D",
          "backgroundThemeColor": "#332B47",
          "textColor": "#FFFFFF",
          "buttonColor": "#FF615E",
          "buttonText": "#FFFFFF"
        },
        "headerColor": {
          "headerText": "#FFFFFF",
          "headerBackground": "#332B47"
        },
        "productSection": "#1F1B2D",
        "productListColor": {
          "backgroundColor": "#44385D",
          "cardBackground": "#1F1B2D",
          "borderColor": "#332B47",
          "headerColor": "#FF3B3F",
          "textColor": "#FFFFFF",
          "priceColor": "#FF3B3F",
          "heartColor": "#FFFFFF",
          "buttonTextColor": "#FFFFFF",
          "buttonBgColor": "#FFFFFF",
          "buttonBorderColor": "#FF3B3F",
          "buttonBgColorOnHover": "#FF3B3F"
        },
        "footerColor": {
          "bgColor": "#332B47",
          "textColor": "#FF3B3F",
          "linkHeaderColor": "#FF3B3F",
          "linkColor": "#FF3B3F",
          "btnBgColor": "#FF615E",
          "btnText": "#FFFFFF",
          "btnBgColorOnHover": "#FF3B3F"
        }
      }
    },
    {
      "name": "Cozy Cotton",
      "color": {
        "backgroundThemeColor": "#FAFAFA",
        "navColor": {
          "backgroundnavColor": "#E0E0E0",
          "storeNameTextColor": "#424242",
          "categoryTextColor": "#616161",
          "searchBarColor": "#9E9E9E"
        },
        "subcategoryColor": {
          "background": "#9E9E9E",
          "text": "#424242"
        },
        "subProductColor": {
          "categoryColor": "#FAFAFA",
          "backgroundColor": "#E0E0E0",
          "textColor": "#424242",
          "borderColor": "#E0E0E0",
          "priceColor": "#424242",
          "priceLetterColor": "#9E9E9E",
          "buttonColor": "#616161",
          "scrollbarColor": "#424242",
          "starColor": "#616161"
        },
        "firstBannerColor": {
          "backgroundThemeColor1": "#FAFAFA",
          "textColor": "#424242",
          "buttonColor": "#616161",
          "buttonText": "#FAFAFA"
        },
        "newProductColor": {
          "backgroundColor": "#9E9E9E",
          "cardBackground": "#FAFAFA",
          "borderColor": "#E0E0E0",
          "headerColor": "#424242",
          "textColor": "#424242",
          "priceColor": "#424242",
          "heartColor": "#616161",
          "buttonTextColor": "#FAFAFA",
          "buttonBgColor": "#616161",
          "buttonBorderColor": "#424242",
          "buttonBgColorOnHover": "#424242"
        },
        "secondaryBannerColor": {
          "backgroundThemeColor1": "#FAFAFA",
          "textColor": "#424242",
          "buttonColor": "#616161",
          "buttonText": "#FAFAFA"
        },
        "offerBannerColor": {
          "backgroundBoxThemeColor1": "#9E9E9E",
          "backgroundThemeColor": "#E0E0E0",
          "textColor": "#424242",
          "buttonColor": "#616161",
          "buttonText": "#FAFAFA"
        },
        "headerColor": {
          "headerText": "#424242",
          "headerBackground": "#E0E0E0"
        },
        "productSection": "#FAFAFA",
        "productListColor": {
          "backgroundColor": "#9E9E9E",
          "cardBackground": "#FAFAFA",
          "borderColor": "#E0E0E0",
          "headerColor": "#424242",
          "textColor": "#424242",
          "priceColor": "#424242",
          "heartColor": "#616161",
          "buttonTextColor": "#FAFAFA",
          "buttonBgColor": "#616161",
          "buttonBorderColor": "#424242",
          "buttonBgColorOnHover": "#424242"
        },
        "footerColor": {
          "bgColor": "#E0E0E0",
          "textColor": "#424242",
          "linkHeaderColor": "#424242",
          "linkColor": "#424242",
          "btnBgColor": "#616161",
          "btnText": "#FAFAFA",
          "btnBgColorOnHover": "#424242"
        }
      }
    },
    {
      "name": "Gentle Earth",
      "color": {
        "backgroundThemeColor": "#F5F5F5",
        "navColor": {
          "backgroundnavColor": "#D7CCC8",
          "storeNameTextColor": "#4E342E",
          "categoryTextColor": "#8D6E63",
          "searchBarColor": "#BCAAA4"
        },
        "subcategoryColor": {
          "background": "#BCAAA4",
          "text": "#4E342E"
        },
        "subProductColor": {
          "categoryColor": "#F5F5F5",
          "backgroundColor": "#D7CCC8",
          "textColor": "#4E342E",
          "borderColor": "#D7CCC8",
          "priceColor": "#4E342E",
          "priceLetterColor": "#BCAAA4",
          "buttonColor": "#8D6E63",
          "scrollbarColor": "#4E342E",
          "starColor": "#8D6E63"
        },
        "firstBannerColor": {
          "backgroundThemeColor1": "#F5F5F5",
          "textColor": "#4E342E",
          "buttonColor": "#8D6E63",
          "buttonText": "#F5F5F5"
        },
        "newProductColor": {
          "backgroundColor": "#BCAAA4",
          "cardBackground": "#F5F5F5",
          "borderColor": "#D7CCC8",
          "headerColor": "#4E342E",
          "textColor": "#4E342E",
          "priceColor": "#4E342E",
          "heartColor": "#8D6E63",
          "buttonTextColor": "#F5F5F5",
          "buttonBgColor": "#8D6E63",
          "buttonBorderColor": "#4E342E",
          "buttonBgColorOnHover": "#4E342E"
        },
        "secondaryBannerColor": {
          "backgroundThemeColor1": "#F5F5F5",
          "textColor": "#4E342E",
          "buttonColor": "#8D6E63",
          "buttonText": "#F5F5F5"
        },
        "offerBannerColor": {
          "backgroundBoxThemeColor1": "#BCAAA4",
          "backgroundThemeColor": "#D7CCC8",
          "textColor": "#4E342E",
          "buttonColor": "#8D6E63",
          "buttonText": "#F5F5F5"
        },
        "headerColor": {
          "headerText": "#4E342E",
          "headerBackground": "#D7CCC8"
        },
        "productSection": "#F5F5F5",
        "productListColor": {
          "backgroundColor": "#BCAAA4",
          "cardBackground": "#F5F5F5",
          "borderColor": "#D7CCC8",
          "headerColor": "#4E342E",
          "textColor": "#4E342E",
          "priceColor": "#4E342E",
          "heartColor": "#8D6E63",
          "buttonTextColor": "#F5F5F5",
          "buttonBgColor": "#8D6E63",
          "buttonBorderColor": "#4E342E",
          "buttonBgColorOnHover": "#4E342E"
        },
        "footerColor": {
          "bgColor": "#D7CCC8",
          "textColor": "#4E342E",
          "linkHeaderColor": "#4E342E",
          "linkColor": "#4E342E",
          "btnBgColor": "#8D6E63",
          "btnText": "#F5F5F5",
          "btnBgColorOnHover": "#4E342E"
        }
      }
    },

















  ];





  const handleFontChange = (e) => {
    const selectedFont = e.target.value;
    setStore(prevState => ({ ...prevState, fontFamily: selectedFont }));
  };

  return (
    <AnimatePresence>
      {(!store.fetchedFromBackend && !store.previewMode) || store?.isEdit ? navHide ? !previewMode && (
        <motion.div key='first' initial={{ x: 20 }} exit={{ x: 500 }} transition={{ duration: 0.3 }} animate={{ x: 0 }} className='fixed top-0 right-0 w-80 h-screen overflow-y-scroll bg-white z-20 border-2 border-gray-200 text-gray-600'>
          {/* <h1 className=' mt-[20px] text-[#6A6A6A] text-xl font-bold border-b-2 border-black pb-4 w-full px-4 font-Poppins'></h1> */}
          <div className="fixed bg-white z-10">
            <div className=" relative w-[100%] flex px-5 my-5 ">
              <div
                className='text-gray-600  top-[26px] text-[16px]  flex items-center justify-between font-semibold border-2 px-3 py-2 border-gray-900 rounded-lg bg-white shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out'
                onClick={(e) => { e.preventDefault(); setNavHide(false) }}
              >
                <p>Hide</p>
                <BiSolidHide className="ml-1" />
              </div >
              <div
                className='text-gray-600  top-[26px] text-[16px] flex items-center justify-between font-semibold border-2 px-3 py-2 border-gray-900 rounded-lg bg-white shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out ml-28'
                onClick={(e) => { e.preventDefault(); setStore(n => ({ ...n, previewMode: true })) }}
              >
                <p>Exit</p>
                <RxCrossCircled className="ml-1" />
              </div>
            </div>
          </div>

          <div className='flex justify-between  font-Poppins  mt-24 font-semibold text-[#6A6A6A] border-t-2  pt-4'>
            <button className={`flex-1   text-lg text-center ${openType === 1 ? 'text-black' : ''}`} onClick={e => { e.preventDefault(); setOpenType(1) }}>Content </button>
            <button className={`flex-1  text-lg text-center ${openType === 2 ? 'text-black' : ''}`} onClick={e => { e.preventDefault(); setOpenType(2) }}>Design</button>
            {store.isEdit &&
              <button className={`flex-1  text-lg text-center ${openType === 3 ? 'text-black' : ''}`} onClick={e => { e.preventDefault(); setOpenType(3) }}>Skin</button>
            }
          </div>

          {openType === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ul className='flex flex-col mt-10 gap-4 px-4'>
                <li className='font-bold border-b-2 border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded-lg shadow-md transition duration-300'>
                  <h1 className='text-2xl font-Poppins flex flex-row text-center items-center mb-4'>
                    Navbar
                  </h1>
                  <div>
                    <FontSelector section="Navbar" />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Shop Name</label>
                    <input
                      type='text'
                      className='border-2 border-gray-300 h-10 rounded-lg px-4 text-sm w-full transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                      value={store.name}
                      placeholder='Store Name'
                      onChange={e => setStore(n => ({ ...n, name: e.target.value }))}
                    />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Logo:</label>
                    <ImageDrop setStore={setStore} className="text-sm" imageData='logo.logoUrl' />
                  </div>
                </li>

                <li className='font-semibold border-b-2 border-gray-200 pb-5 font-Poppins hover:bg-gray-50 p-4 rounded-lg shadow-md transition duration-300'>
                  <h1 className='text-2xl font-Poppins mb-4'>Hero Section</h1>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Title</label>
                    <input
                      type='text'
                      className='border-2 border-gray-300 rounded-lg px-4 w-full h-10 text-sm transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                      value={store.name}
                      placeholder='Store Name'
                      onChange={e => setStore(n => ({ ...n, name: e.target.value }))}
                    />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Background:</label>
                    <ImageDrop setStore={setStore} imageData='banner.bannerUrl' />
                  </div>
                </li>

                <li className='font-bold border-b-2 border-gray-200 pb-5 font-Poppins hover:bg-gray-50 p-4 rounded-lg shadow-md transition duration-300'>
                  <h1 className='text-2xl font-Poppins mb-4'>Categories</h1>
                  <div className="font-VT323 text-sm mb-4">
                    <FontSelector section="Categories" />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Title</label>
                    <div className='flex h-10'>
                      <input
                        type='text'
                        className='border-2 border-gray-300 w-full rounded-lg mr-2 px-4 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                        value={categoryData}
                        onChange={e => setCategoryData(e.target.value)}
                      />
                      <button
                        className='px-4 text-sm font-Poppins border-2 border-gray-300 rounded-lg flex items-center justify-center transition duration-300 hover:bg-blue-400 hover:text-white'
                        onClick={handleAddCategory}
                      >
                        Add <FaPlus className="ml-1" />
                      </button>
                    </div>
                  </div>
                  <ul className="font-normal list-disc ml-8 mt-4 text-sm">
                    {store.subCategories.map((item, index) => (
                      <li key={item.name} className="flex justify-between">
                        {item.name}
                        <button
                          onClick={() => handleRemoveCategory(index)}
                          className="ml-4 text-black px-2 py-1 rounded"
                        >
                          -
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className='font-semibold border-b-2 border-gray-200 pb-5 font-Poppins hover:bg-gray-50 p-4 rounded-lg shadow-md transition duration-300'>
                  <h1 className='text-2xl font-Poppins mb-4'>Banner #1</h1>
                  <div className='mt-4'>
                    <FontSelector section="Banner1" />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Title</label>
                    <input
                      type='text'
                      className='border-2 border-gray-300 rounded-lg px-4 w-full h-10 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                      value={store.thirdBannerText.heading}
                      onChange={(e) => { setStore(prev => ({ ...prev, thirdBannerText: { ...prev.thirdBannerText, heading: e.target.value } })) }}
                    />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Description</label>
                    <textarea
                      className='border-2 border-gray-300 rounded-lg px-4 h-24 w-full transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                      value={store.thirdBannerText.paragraph}
                      onChange={(e) => { setStore(prev => ({ ...prev, thirdBannerText: { ...prev.thirdBannerText, paragraph: e.target.value } })) }}
                    />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Image:</label>
                    <ImageDrop setStore={setStore} imageData='thirdBanner.thirdBannerUrl' />
                  </div>
                </li>

                <li className='font-semibold border-b-2 border-gray-200 pb-5 font-Poppins hover:bg-gray-50 p-4 rounded-lg shadow-md transition duration-300'>
                  <h1 className='text-2xl font-Poppins mb-4'>Banner #2</h1>
                  <div className='mt-4'>
                    <FontSelector section="Banner2" />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Title</label>
                    <input
                      type='text'
                      className='border-2 border-gray-300 rounded-lg px-4 w-full h-10 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                      value={store.secondaryBannerText.heading}
                      onChange={(e) => { setStore(prev => ({ ...prev, secondaryBannerText: { ...prev.secondaryBannerText, heading: e.target.value } })) }}
                    />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Description</label>
                    <textarea
                      className='border-2 border-gray-300 rounded-lg px-4 h-24 w-full transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                      value={store.secondaryBannerText.paragraph}
                      onChange={(e) => { setStore(prev => ({ ...prev, secondaryBannerText: { ...prev.secondaryBannerText, paragraph: e.target.value } })) }}
                    />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Image:</label>
                    <ImageDrop setStore={setStore} imageData='secondaryBanner.secondaryBannerUrl' />
                  </div>
                </li>

                <li className='font-semibold border-b-2 border-gray-200 pb-5 font-Poppins hover:bg-gray-50 p-4 rounded-lg shadow-md transition duration-300'>
                  <h1 className='text-2xl font-Poppins mb-4'>Banner #3</h1>
                  <div className='mt-4'>
                    <FontSelector section="Banner3" />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Title</label>
                    <input
                      type='text'
                      className='border-2 border-gray-300 rounded-lg px-4 w-full h-10 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                      value={store.offerBannerText.para1}
                      onChange={(e) => { setStore(prev => ({ ...prev, offerBannerText: { ...prev.offerBannerText, para1: e.target.value } })) }}
                    />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Description</label>
                    <textarea
                      className='border-2 border-gray-300 rounded-lg px-4 h-24 w-full transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                      value={store.offerBannerText.heading}
                      onChange={(e) => { setStore(prev => ({ ...prev, offerBannerText: { ...prev.offerBannerText, heading: e.target.value } })) }}
                    />
                  </div>
                  <div className='font-normal mt-4'>
                    <label className='text-sm font-Poppins mb-2 block'>Image:</label>
                    <ImageDrop setStore={setStore} imageData='offerBanner.offerBannerUrl' />
                  </div>
                </li>
                <li className='font-semibold border-b-2 border-gray-200 pb-5 font-Poppins hover:bg-gray-50 p-4 rounded-lg shadow-md transition duration-300'>
                  Add Products<br />
                  <div className='mt-2'>
                    <button className='px-2 text-[12px]  font-Ubuntu border-2 border-gray-300' onClick={handleAddProduct}>Add +</button>
                  </div>
                </li>
                <li className='font-semibold border-b-2 border-gray-200 pb-5 font-Poppins hover:bg-gray-50 p-4 rounded-lg shadow-md transition duration-300'>
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
                    <button className='px-2 text-[12px]  font-Ubuntu border-2 border-gray-300' onClick={handleAddFeaturedProduct}>Add +</button>
                  </div>
                </li>

                <li className='font-semibold border-b-2 border-gray-200 pb-5 font-Poppins hover:bg-gray-50 p-4 rounded-lg shadow-md transition duration-300'>
                  Footer<br />
                  <div>
                    <FontSelector section="Footer " />
                  </div>
                  <label className='text-[12px]  font-Ubuntu'>Location</label><br />
                  <input value={store.location} type='text' className='border-2 border-gray-300 rounded px-2 ' placeholder='Your Store Location' onChange={(e) => { setStore(prevState => ({ ...prevState, location: e.target.value })); console.log(store.location) }} ></input><br />
                  <label className='text-[12px]  font-Ubuntu'>Email</label><br />
                  <input value={store.email} type='text' className='border-2 border-gray-300 rounded px-2' placeholder='email@abc.com' onChange={(e) => { setStore(prev => ({ ...prev, email: e.target.value })) }} ></input><br />
                  <label className='text-[12px]  font-Ubuntu'>Phone Number</label><br />
                  <input value={store.phoneNumber} type='text' className='border-2 border-gray-300 rounded px-2' placeholder='9876543210' onChange={(e) => { setStore(prev => ({ ...prev, phoneNumber: e.target.value })) }} ></input><br />
                  <div className='mt-3'>Social Media Links</div>
                  <label className='text-[12px]  font-Ubuntu'>Facebook</label><br />
                  <input value={store.socialMediaLinks.facebook} placeholder='facebook.com' type='text' className='border-2 border-gray-300 rounded px-2' onChange={(e) => { setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, facebook: e.target.value } })); }} ></input><br />
                  <label className='text-[12px]  font-Ubuntu'>Twitter</label><br />
                  <input value={store.socialMediaLinks.twitter} placeholder='twitter.com' type='text' className='border-2 border-gray-300 rounded px-2' onChange={(e) => { setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, twitter: e.target.value } })); }} ></input><br />
                  <label className='text-[12px]  font-Ubuntu'>Instagram</label><br />
                  <input value={store.socialMediaLinks.instagram} placeholder='instagram.com' type='text' className='border-2 border-gray-300 rounded px-2' onChange={(e) => { setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, instagram: e.target.value } })); }} ></input><br />
                  <label className='text-[12px]  font-Ubuntu'>linkedIn</label><br />
                  <input value={store.socialMediaLinks.linkedin} placeholder='linked.com' type='text' className='border-2 border-gray-300 rounded px-2' onChange={(e) => { setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, linkedin: e.target.value } })); }} ></input><br />

                </li>
              </ul>
              {addProductForm && <ProductForm onClose={() => setAddProductForm(!addProductForm)} />}
            </motion.div>
          )}


          {openType === 2 && (
            <div className="mt-5 px-4 capitalize">
              <div className="flex flex-col gap-4">

                <div className="mb-4">
                  <h4 className="text-xl font-semibold mb-2">Select Preset</h4>
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
                <div className='flex row justify-center items-center p-4 bg-gray-100 rounded-lg shadow-lg space-y-3'>
                  <div className="flex flex-col items-center w-full">
                    <div className="flex items-center space-x-2">
                      <input type="file" accept=".json" onChange={handleImportPreset} className="hidden" id="importPreset" />
                      <label htmlFor="importPreset" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transform hover:scale-105 transition duration-300 ease-in-out flex items-center">
                        <FaUpload className="mr-2" />
                        Import
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col items-center w-full">
                    <button onClick={handleExportPreset} className="bg-green-500 text-white py-2 px-4 rounded-md shadow mb-3 hover:bg-green-600 transform hover:scale-105 transition duration-300 ease-in-out flex items-center">
                      <FaDownload className="mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                {Object.entries(color).map(([colorKey, colorValue], index) => {
                  if (typeof colorValue === 'object') {
                    return (
                      <div key={index} className=' spac-y-2'>
                        <h4 className="text-xl font-semibold mt-5 mb-2  border-b-2 ">{friendlyNames[colorKey]}</h4>
                        {Object.entries(colorValue).map(([nestedKey, nestedValue], nestedIndex) => (
                          <div key={nestedIndex} className="flex flex-row justify-around items-start items-center ">
                            <label className="text-gray-700 w-24 flex-grow">{nestedFriendlyNames[nestedKey]}</label>
                            <div className="flex mt-2 md:flex-row items-center justify-center ml-4">
                              <input
                                type="color"
                                value={nestedValue}
                                onChange={(e) => handleColorChange(e.target.value, nestedKey, colorKey)}
                                className="rounded-full px-1 shadow-md focus:outline-none mb-1"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    return (
                      <div key={index}>
                        <h4 className="text-xl font-semibold mt-5 mb-2">{friendlyNames[colorKey]}</h4>
                        <div className="flex justify-between border-grey-300 border-b-2">
                          <label className="flex-grow text-gray-700 w-24">Default</label>
                          <div className="flex items-center ml-4">
                            <input
                              type="color"
                              value={colorValue}
                              onChange={(e) => handleSingleColorChange(e, colorKey)}
                              className="rounded-full px-1 border-2 border-gray-300 shadow-md focus:outline-none mb-1"
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
                  <label className='text-[12px]  font-Poppins'>Active Skin</label><br />
                  <select value={component.activeSkin} onChange={e => handleActiveSkinChange(e, index)} className='border-2 border-gray-300 rounded px-2'>
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
        <motion.button key='second' initial={{ x: -20 }} exit={{ x: 20 }} animate={{ x: 0 }} className='fixed top-0 right-0 mt-24 bg-yellow-400 py-1 rounded-l z-20 text-4xl' onClick={(e) => { e.preventDefault(); setNavHide(true) }}><FaCaretLeft />
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
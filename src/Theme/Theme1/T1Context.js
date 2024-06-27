import React, { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Hooks/AuthContext";
import controller from "../../Assets/controller.png";
import offerBannerImg from '../../Assets/offerbanner.webp'
import secondaryBannerImg from '../../Assets/ImageGroup.png'
import herobanner from '../../Assets/firstbanner.webp'
import Shirt from '../../Assets/shirt.webp'

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};


export const StoreProvider = ({ children, passedStore }) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const { storeID } = useParams(); // Extract storeID using useParams

  /*   useEffect(() => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
          console.log('Loaded cart from localStorage:', JSON.parse(savedCart));
          setStore(prevStore => ({ ...prevStore, cart: JSON.parse(savedCart) }));
      }
  }, []); */

  const colorPresets = [
    {
        name: 'preset1',
        colors: {
            backgroundThemeColor: "#FFFFFF",
            navColor: {
                backgroundnavColor: "#B6947D",
                storeNameTextColor: "#000000",
                categoryTextColor: "#1d2830",
                searchBarColor: "#fcf3f3",
            },
            subcategoryColor: {
                background: "#ffffff",
                text: "#4F3100",
            },
            subProductColor: {
                categoryColor: "#ffffff",
                backgroundColor: "#FDF7E6",
                textColor: "#333333",
                borderColor: "#AB8076",
                priceColor: "#4F3100",
                priceLetterColor: "#fff",
                scrollbarColor: "#4F3100",
                starColor: "#875300",
            },
            firstBannerColor: {
                backgroundThemeColor1: "#ffffff",
                backgroundThemeColor2: "#fcf3f3",
                textColor: "#5D4B3F",
                buttonColor: "#AB8076",
                buttonText: "#ffffff",
            },
            newProductColor: {
                backgroundColor: "#FFFFFF",
                cardBackground: "#FFFFFF",
                borderColor: "#B5A297",
                headerColor: "#5D4B3F",
                textColor: "#4F3100",
                priceColor: "#4F3100",
                heartColor: "#FF4D00",
                buttonTextColor: "#4F3100",
                buttonBgColor: "#FFFFFF",
                buttonBorderColor: "#4F3100",
                buttonBgColorOnHover: "#4F3100",
            },
            secondaryBannerColor: {
                backgroundThemeColor1: "#ffffff",
                backgroundThemeColor2: "#fcf3f3",
                textColor: "#5D4B3F",
                buttonColor: "#AB8076",
                buttonText: "#ffffff",
            },
            offerBannerColor: {
                backgroundBoxThemeColor1: "#ffffff",
                backgroundThemeColor: "#C9BCAC",
                textColor: "#4E3E34",
                buttonColor: "#AB8076",
                buttonText: "#ffffff",
            },
            headerColor: {
                headerText: "#ffffff",
                headerBackground: "#7a5C5c",
            },
            productSection: "#ffffff",
            productListColor: {
                backgroundColor: "#FFFFFF",
                cardBackground: "#FFFFFF",
                borderColor: "#B5A297",
                headerColor: "#5D4B3F",
                textColor: "#4F3100",
                priceColor: "#4F3100",
                heartColor: "#FF4D00",
                buttonTextColor: "#4F3100",
                buttonBgColor: "#FFFFFF",
                buttonBorderColor: "#4F3100",
                buttonBgColorOnHover: "#4F3100",
            },
            footerColor: {
                bgColor: "#736860",
                textColor: "#ffffff",
                linkHeaderColor: "#ffffff",
                linkColor: "#ffffff",
                btnBgColor: "#736860",
                btnText: "#ffffff",
                btnBgColorOnHover: "#4F3100",
            },
        },
    },
    {
        name: 'preset2',
        colors: {
            backgroundThemeColor: "#F8F8F8",
            navColor: {
                backgroundnavColor: "#8A6D5B",
                storeNameTextColor: "#FFFFFF",
                categoryTextColor: "#2F2F2F",
                searchBarColor: "#ECECEC",
            },
            subcategoryColor: {
                background: "#F2F2F2",
                text: "#3E2B00",
            },
            subProductColor: {
                categoryColor: "#F9F9F9",
                backgroundColor: "#EFE7CE",
                textColor: "#4A4A4A",
                borderColor: "#947564",
                priceColor: "#3E2B00",
                priceLetterColor: "#ECECEC",
                scrollbarColor: "#3E2B00",
                starColor: "#6E3B00",
            },
            firstBannerColor: {
                backgroundThemeColor1: "#F9F9F9",
                backgroundThemeColor2: "#ECECEC",
                textColor: "#47392B",
                buttonColor: "#947564",
                buttonText: "#ECECEC",
            },
            newProductColor: {
                backgroundColor: "#F9F9F9",
                cardBackground: "#F9F9F9",
                borderColor: "#A69785",
                headerColor: "#47392B",
                textColor: "#3E2B00",
                priceColor: "#3E2B00",
                heartColor: "#FF4D00",
                buttonTextColor: "#3E2B00",
                buttonBgColor: "#F9F9F9",
                buttonBorderColor: "#3E2B00",
                buttonBgColorOnHover: "#3E2B00",
            },
            secondaryBannerColor: {
                backgroundThemeColor1: "#F9F9F9",
                backgroundThemeColor2: "#ECECEC",
                textColor: "#47392B",
                buttonColor: "#947564",
                buttonText: "#ECECEC",
            },
            offerBannerColor: {
                backgroundBoxThemeColor1: "#F9F9F9",
                backgroundThemeColor: "#B9A696",
                textColor: "#3C2C24",
                buttonColor: "#947564",
                buttonText: "#ECECEC",
            },
            headerColor: {
                headerText: "#ECECEC",
                headerBackground: "#6A4B4B",
            },
            productSection: "#F9F9F9",
            productListColor: {
                backgroundColor: "#F9F9F9",
                cardBackground: "#F9F9F9",
                borderColor: "#A69785",
                headerColor: "#47392B",
                textColor: "#3E2B00",
                priceColor: "#3E2B00",
                heartColor: "#FF4D00",
                buttonTextColor: "#3E2B00",
                buttonBgColor: "#F9F9F9",
                buttonBorderColor: "#3E2B00",
                buttonBgColorOnHover: "#3E2B00",
            },
            footerColor: {
                bgColor: "#695C5C",
                textColor: "#ECECEC",
                linkHeaderColor: "#ECECEC",
                linkColor: "#ECECEC",
                btnBgColor: "#695C5C",
                btnText: "#ECECEC",
                btnBgColorOnHover: "#3E2B00",
            },
        },
    },
    {
        name: 'preset3',
        colors: {
            backgroundThemeColor: "#FFF5F5",
            navColor: {
                backgroundnavColor: "#B17A6B",
                storeNameTextColor: "#1A1A1A",
                categoryTextColor: "#2E3A40",
                searchBarColor: "#FAFAFA",
            },
            subcategoryColor: {
                background: "#FAFAFA",
                text: "#5A3600",
            },
            subProductColor: {
                categoryColor: "#FAFAFA",
                backgroundColor: "#FDF5E6",
                textColor: "#4D4D4D",
                borderColor: "#AF806B",
                priceColor: "#5A3600",
                priceLetterColor: "#FAFAFA",
                scrollbarColor: "#5A3600",
                starColor: "#9E5400",
            },
            firstBannerColor: {
                backgroundThemeColor1: "#FAFAFA",
                backgroundThemeColor2: "#FFF5F5",
                textColor: "#6A564B",
                buttonColor: "#AF806B",
                buttonText: "#FAFAFA",
            },
            newProductColor: {
                backgroundColor: "#FAFAFA",
                cardBackground: "#FAFAFA",
                borderColor: "#B6A396",
                headerColor: "#6A564B",
                textColor: "#5A3600",
                priceColor: "#5A3600",
                heartColor: "#FF5D00",
                buttonTextColor: "#5A3600",
                buttonBgColor: "#FAFAFA",
                buttonBorderColor: "#5A3600",
                buttonBgColorOnHover: "#5A3600",
            },
            secondaryBannerColor: {
                backgroundThemeColor1: "#FAFAFA",
                backgroundThemeColor2: "#FFF5F5",
                textColor: "#6A564B",
                buttonColor: "#AF806B",
                buttonText: "#FAFAFA",
            },
            offerBannerColor: {
                backgroundBoxThemeColor1: "#FAFAFA",
                backgroundThemeColor: "#CABDAC",
                textColor: "#5B4734",
                buttonColor: "#AF806B",
                buttonText: "#FAFAFA",
            },
            headerColor: {
                headerText: "#FAFAFA",
                headerBackground: "#8B6B6B",
            },
            productSection: "#FAFAFA",
            productListColor: {
                backgroundColor: "#FAFAFA",
                cardBackground: "#FAFAFA",
                borderColor: "#B6A396",
                headerColor: "#6A564B",
                textColor: "#5A3600",
                priceColor: "#5A3600",
                heartColor: "#FF5D00",
                buttonTextColor: "#5A3600",
                buttonBgColor: "#FAFAFA",
                buttonBorderColor: "#5A3600",
                buttonBgColorOnHover: "#5A3600",
            },
            footerColor: {
                bgColor: "#746760",
                textColor: "#FAFAFA",
                linkHeaderColor: "#FAFAFA",
                linkColor: "#FAFAFA",
                btnBgColor: "#746760",
                btnText: "#FAFAFA",
                btnBgColorOnHover: "#5A3600",
            },
        },
    },
    {
        name: 'preset4',
        colors: {
            backgroundThemeColor: "#EFEFEF",
            navColor: {
                backgroundnavColor: "#A78473",
                storeNameTextColor: "#2B2B2B",
                categoryTextColor: "#334248",
                searchBarColor: "#EDEDED",
            },
            subcategoryColor: {
                background: "#FFFFFF",
                text: "#624D00",
            },
            subProductColor: {
                categoryColor: "#FFFFFF",
                backgroundColor: "#FCF1D8",
                textColor: "#595959",
                borderColor: "#B08473",
                priceColor: "#624D00",
                priceLetterColor: "#EDEDED",
                scrollbarColor: "#624D00",
                starColor: "#835400",
            },
            firstBannerColor: {
                backgroundThemeColor1: "#FFFFFF",
                backgroundThemeColor2: "#EDEDED",
                textColor: "#7B6A5B",
                buttonColor: "#B08473",
                buttonText: "#EDEDED",
            },
            newProductColor: {
                backgroundColor: "#FFFFFF",
                cardBackground: "#FFFFFF",
                borderColor: "#C3AC9D",
                headerColor: "#7B6A5B",
                textColor: "#624D00",
                priceColor: "#624D00",
                heartColor: "#FF6D00",
                buttonTextColor: "#624D00",
                buttonBgColor: "#FFFFFF",
                buttonBorderColor: "#624D00",
                buttonBgColorOnHover: "#624D00",
            },
            secondaryBannerColor: {
                backgroundThemeColor1: "#FFFFFF",
                backgroundThemeColor2: "#EDEDED",
                textColor: "#7B6A5B",
                buttonColor: "#B08473",
                buttonText: "#EDEDED",
            },
            offerBannerColor: {
                backgroundBoxThemeColor1: "#FFFFFF",
                backgroundThemeColor: "#DABDAC",
                textColor: "#6B4734",
                buttonColor: "#B08473",
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
                borderColor: "#C3AC9D",
                headerColor: "#7B6A5B",
                textColor: "#624D00",
                priceColor: "#624D00",
                heartColor: "#FF6D00",
                buttonTextColor: "#624D00",
                buttonBgColor: "#FFFFFF",
                buttonBorderColor: "#624D00",
                buttonBgColorOnHover: "#624D00",
            },
            footerColor: {
                bgColor: "#857C74",
                textColor: "#EDEDED",
                linkHeaderColor: "#EDEDED",
                linkColor: "#EDEDED",
                btnBgColor: "#857C74",
                btnText: "#EDEDED",
                btnBgColorOnHover: "#624D00",
            },
        },
    },
    {
        name: 'preset5',
        colors: {
            backgroundThemeColor: "#FFFCFC",
            navColor: {
                backgroundnavColor: "#D5A490",
                storeNameTextColor: "#3C3C3C",
                categoryTextColor: "#485861",
                searchBarColor: "#FAF3F3",
            },
            subcategoryColor: {
                background: "#FFFCFC",
                text: "#7A5600",
            },
            subProductColor: {
                categoryColor: "#FFFCFC",
                backgroundColor: "#FDF3E4",
                textColor: "#626262",
                borderColor: "#D5A490",
                priceColor: "#7A5600",
                priceLetterColor: "#FAF3F3",
                scrollbarColor: "#7A5600",
                starColor: "#A76A00",
            },
            firstBannerColor: {
                backgroundThemeColor1: "#FFFCFC",
                backgroundThemeColor2: "#FAF3F3",
                textColor: "#8D6E5D",
                buttonColor: "#D5A490",
                buttonText: "#FAF3F3",
            },
            newProductColor: {
                backgroundColor: "#FFFCFC",
                cardBackground: "#FFFCFC",
                borderColor: "#E5C0AF",
                headerColor: "#8D6E5D",
                textColor: "#7A5600",
                priceColor: "#7A5600",
                heartColor: "#FF7D00",
                buttonTextColor: "#7A5600",
                buttonBgColor: "#FFFCFC",
                buttonBorderColor: "#7A5600",
                buttonBgColorOnHover: "#7A5600",
            },
            secondaryBannerColor: {
                backgroundThemeColor1: "#FFFCFC",
                backgroundThemeColor2: "#FAF3F3",
                textColor: "#8D6E5D",
                buttonColor: "#D5A490",
                buttonText: "#FAF3F3",
            },
            offerBannerColor: {
                backgroundBoxThemeColor1: "#FFFCFC",
                backgroundThemeColor: "#E8C2B0",
                textColor: "#7C5744",
                buttonColor: "#D5A490",
                buttonText: "#FAF3F3",
            },
            headerColor: {
                headerText: "#FAF3F3",
                headerBackground: "#7D6B6B",
            },
            productSection: "#FFFCFC",
            productListColor: {
                backgroundColor: "#FFFCFC",
                cardBackground: "#FFFCFC",
                borderColor: "#E5C0AF",
                headerColor: "#8D6E5D",
                textColor: "#7A5600",
                priceColor: "#7A5600",
                heartColor: "#FF7D00",
                buttonTextColor: "#7A5600",
                buttonBgColor: "#FFFCFC",
                buttonBorderColor: "#7A5600",
                buttonBgColorOnHover: "#7A5600",
            },
            footerColor: {
                bgColor: "#968573",
                textColor: "#FAF3F3",
                linkHeaderColor: "#FAF3F3",
                linkColor: "#FAF3F3",
                btnBgColor: "#968573",
                btnText: "#FAF3F3",
                btnBgColorOnHover: "#7A5600",
            },
        },
    },
];


  const defaultStoreData = {
    name: "Store Name",
    location: "Your Store Location",
    email: "store@example.com",
    phoneNumber: "+1234567890",
    logo: {
      logoUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305",
      logoID: ''
    },
    categories: [{ name: "Men" }, { name: "Women" }, { name: "Kids" }],

    subCategories: [{ name: "Watch" }, { name: "Jacket" }, { name: "Pants" }],
    banner: { bannerUrl: `${herobanner}`, bannerID: '' },
    products: [
      {
        id: 1,
        name: "Controller",
        price: '100',
        image: { imageUrl: controller, imageID: '' },
        categories: ["Men"],
        subcategories: ["Watch"],
        rating: 2.5,
        count: 0,
        variant: [
          {
            name: "Color",
            options: [
              {
                name: "Blue",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
                },
                discount: 5
              }, {
                name: "Gray",
                price: 2000,
                image: {
                  imageID: "img123",
                  imageUrl: "https://cms.cloudinary.vpsvc.com/image/upload/v1675872460/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile004_en-us.png"
                },
                discount: 6
              }
            ]
          },
          {
            name: "Color",
            options: [
              {
                name: "blue",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: "https://images.vexels.com/media/users/3/234039/isolated/preview/0bb83cedf3679102fae76c6bbb940ccb-denim-jean-jacket.png"
                },
                discount: 10
              }
            ]
          },
        ],
        description: "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd asdad asdnansd adoamds d adoandnald ",
      },
      {
        id: 2,
        name: "Goggles",
        price: '200',
        image: { imageUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/14/eye-295173_960_720.png', imageID: '' },
        count: 0,
        categories: ["Men"],
        subcategories: ["Watch"],
        rating: 2.5,
        variant: [
          {
            name: "Size",
            options: [
              {
                name: "Small",
                price: 90,
                image: {
                  imageId: "img123",
                  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxEbK3Nqdg3b7KlytQ57iOF7Jxtiy4Kn-nQ&s"
                },
                discount: 5
              }
            ]
          },
          {
            name: "Size",
            options: [
              {
                name: "Small",
                price: 900,
                image: {
                  imageId: "img123",
                  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxEbK3Nqdg3b7KlytQ57iOF7Jxtiy4Kn-nQ&s"
                },
                discount: 5
              }
            ]
          },
        ],
        description: "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd asdad asdnansd adoamds d adoandnald ",
      },
      {
        id: 3,
        name: "Watch",
        price: '100',
        image: { imageUrl: "https://cdn.pixabay.com/photo/2013/07/12/14/44/watch-148700_1280.png", imageID: '' },
        categories: ["Men"],
        subcategories: ["Watch"],
        rating: 2.5,
        count: 0,
        variant: [
          {
            name: "Color",
            options: [
              {
                name: "Blue",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
                },
                discount: 5
              }, {
                name: "Gray",
                price: 2000,
                image: {
                  imageID: "img123",
                  imageUrl: "https://cms.cloudinary.vpsvc.com/image/upload/v1675872460/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile004_en-us.png"
                },
                discount: 6
              }
            ]
          },
          {
            name: "Color",
            options: [
              {
                name: "blue",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: "https://images.vexels.com/media/users/3/234039/isolated/preview/0bb83cedf3679102fae76c6bbb940ccb-denim-jean-jacket.png"
                },
                discount: 10
              }
            ]
          },
        ],
        description: "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd asdad asdnansd adoamds d adoandnald ",
      },
      {
        id: 4,
        name: "Watch1",
        price: '100',
        image: { imageUrl: controller, imageID: '' },
        categories: ["Men"],
        subcategories: ["Watch"],
        rating: 2.5,
        count: 0,
        variant: [
          {
            name: "Color",
            options: [
              {
                name: "Blue",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
                },
                discount: 5
              }, {
                name: "Gray",
                price: 2000,
                image: {
                  imageID: "img123",
                  imageUrl: "https://cms.cloudinary.vpsvc.com/image/upload/v1675872460/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile004_en-us.png"
                },
                discount: 6
              }
            ]
          },
          {
            name: "Color",
            options: [
              {
                name: "blue",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: "https://images.vexels.com/media/users/3/234039/isolated/preview/0bb83cedf3679102fae76c6bbb940ccb-denim-jean-jacket.png"
                },
                discount: 10
              }
            ]
          },
        ],
        description: "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd asdad asdnansd adoamds d adoandnald ",
      },
      {
        id: 5,
        name: "Watch1",
        price: '100',
        image: { imageUrl: controller, imageID: '' },
        categories: ["Men"],
        subcategories: ["Watch"],
        rating: 2.5,
        count: 0,
        variant: [
          {
            name: "Color",
            options: [
              {
                name: "Blue",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
                },
                discount: 5
              }, {
                name: "Gray",
                price: 2000,
                image: {
                  imageID: "img123",
                  imageUrl: "https://cms.cloudinary.vpsvc.com/image/upload/v1675872460/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile004_en-us.png"
                },
                discount: 6
              }
            ]
          },
          {
            name: "Color",
            options: [
              {
                name: "blue",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: "https://images.vexels.com/media/users/3/234039/isolated/preview/0bb83cedf3679102fae76c6bbb940ccb-denim-jean-jacket.png"
                },
                discount: 10
              }
            ]
          },
        ],
        description: "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd asdad asdnansd adoamds d adoandnald ",
      },
    ],
    featuredProducts: [0, 1, 4],
    color: {
      backgroundThemeColor: "#FFFFFF",
      navColor: {
        backgroundnavColor: "#B6947D",
        storeNameTextColor: "#000000",
        categoryTextColor: "#1d2830",
        searchBarColor: "#fcf3f3",
      },
      subcategoryColor: {
        background: "#ffffff",
        text: "#4F3100",
      },
      subProductColor: {
        categoryColor: "#ffffff",
        backgroundColor: "#FDF7E6",
        textColor: "#333333",
        borderColor: "#AB8076",
        priceColor: "#4F3100",
        priceLetterColor: "#fff",
        scrollbarColor: "#4F3100",
        starColor: "#875300",
      },
      firstBannerColor: {
        backgroundThemeColor1: "#ffffff",
        backgroundThemeColor2: "#fcf3f3",
        textColor: "#5D4B3F",
        buttonColor: "#AB8076",
        buttonText: "#ffffff",
      },
      newProductColor: {
        // Define productListColor object
        backgroundColor: "#FFFFFF",
        cardBackground: "#FFFFFF",
        borderColor: "#B5A297",
        headerColor: "#5D4B3F",
        textColor: "#4F3100",
        priceColor: "#4F3100",
        heartColor: "#FF4D00",
        buttonTextColor: "#4F3100",
        buttonBgColor: "#FFFFFF",
        buttonBorderColor: "#4F3100",
        buttonBgColorOnHover: "#4F3100",
      },
      secondaryBannerColor: {
        backgroundThemeColor1: "#ffffff",
        backgroundThemeColor2: "#fcf3f3",
        textColor: "#5D4B3F",
        buttonColor: "#AB8076",
        buttonText: "#ffffff",
      },

      offerBannerColor: {
        backgroundBoxThemeColor1: "#ffffff",
        backgroundThemeColor: "#C9BCAC",
        textColor: "#4E3E34",
        buttonColor: "#AB8076",
        buttonText: "#ffffff",
      },
    
      headerColor: {
        headerText: "#ffffff",
        headerBackground: "#7a5C5c",
      },

      productSection: "#ffffff",
      productListColor: {
        // Define productListColor object
        backgroundColor: "#FFFFFF",
        cardBackground: "#FFFFFF",
        borderColor: "#B5A297",
        headerColor: "#5D4B3F",
        textColor: "#4F3100",
        priceColor: "#4F3100",
        heartColor: "#FF4D00",
        buttonTextColor: "#4F3100",
        buttonBgColor: "#FFFFFF",
        buttonBorderColor: "#4F3100",
        buttonBgColorOnHover: "#4F3100",
      },
    
      footerColor: {
        bgColor: "#736860",
        textColor: "#ffffff",
        linkHeaderColor: "#ffffff",
        linkColor: "#ffffff",
        btnBgColor: "#736860",
        btnText: "#ffffff",
        btnBgColorOnHover: "#4F3100"
      },
    },
    offerBanner: { offerBannerUrl: `${offerBannerImg}`, offerBannerID: '' },
    offerBannerText: {
      para1: "",
      para2: "",
      para3: "",
    },
    secondaryBanner: { secondaryBannerUrl: `${secondaryBannerImg}`, secondaryBannerID: '' },
    thirdBanner: { thirdBannerUrl: `${secondaryBannerImg}`, secondaryBannerID: '' },
    thirdBannerText: {
      heading: "",
      paragraph: "",
    },
    previewMode: true,
    selectedSubCategory: "Watch",
    cart: [

    ],
    cartCount: 0,
    secondaryBannerText: {
      heading: "",
      paragraph: "",
    },
    socialMediaLinks: {
      facebook: "facebook.com",
      twitter: "twitter.com",
      instagram: "instagram.com",
      linkedin: "linkedin.com",
    },
    footerDescription: "A modern online store for all your needs.",
    fetchedFromBackend: false,
    fonts: {

    },
    componentSkin: {
      type: [
        {
          component: { type: String },
          skinType: { type: String },
          activeSkin: { type: String },
          skinInventory: [{ type: String, unique: true }],
        }
      ],
      default: [
        {
          component: "Navbar",
          skinType: "Navbar",
          activeSkin: "default",
          skinInventory: ["default"]
        },
        {
          component: "Product1",
          skinType: "Card",
          activeSkin: "default",
          skinInventory: ["default"]
        },
        {
          component: "Product2",
          skinType: "Card",
          activeSkin: "default",
          skinInventory: ["default"]
        },
        {
          component: "Product3",
          skinType: "Card",
          activeSkin: "default",
          skinInventory: ["default"]
        },
        {
          component: "Banner1",
          skinType: "Banner",
          activeSkin: "default",
          skinInventory: ["default"]
        },
        {
          component: "Banner2",
          skinType: "Banner",
          activeSkin: "default",
          skinInventory: ["default"]
        },
        {
          component: "Banner3",
          skinType: "Banner",
          activeSkin: "default",
          skinInventory: ["default"]
        },
        {
          component: "Footer",
          skinType: "Footer",
          activeSkin: "default",
          skinInventory: ["default"]
        },
        {
          component: "Background",
          skinType: "Background",
          activeSkin: "default",
          skinInventory: ["default"]
        }
      ]
    },
    expectedDeliveryPrice:100,
    // Rest of the default store data...
  };

  // useEffect(() => {
  //   console.log(passedStore);
  // }, [passedStore]);

  const [store, setStore] = useState(defaultStoreData); // Start with null while fetching

  useEffect(() => {
    const fetchStoreData = async (isEdit) => {
      try {
        console.log("inside fetching");
        // Fetch store data from the server using the provided store ID
        const response = await sendRequest(
          `store/get/${storeID}`, // Replace 'your-api-endpoint' with your actual API endpoint
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        ); // Use storeID from useParams
        console.log(response);
        setStore({
          ...response.store,
          fetchedFromBackend: true,
          selectedSubCategory: response.store.subCategories[0].name,
          previewMode: true,
          isEdit,
          cart: [],
          fonts: response.store.fonts || {} // Set fetchedFromBackend to true when data is fetched
        });

      } catch (error) {
        // If an error occurs during fetch, set default store data
        setStore(defaultStoreData);
        console.error("Error fetching store data:", error);
      }
    };
    if (window.location.pathname.includes("/store/edit/")) {
      fetchStoreData(true);
      setStore(prev => ({ ...prev, previewMode: false, fetchedFromBackend: false }))
      console.log("I reached here")
    }
    else if (window.location.pathname.includes("/store/")) {
      fetchStoreData(false);
    } else {
      setStore(defaultStoreData);
    }
  }, [storeID]);

  useEffect(() => {
    // Fetch cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedCartCount = parseInt(localStorage.getItem('cartCount'), 10) || 0;

    // Set initial state with data from localStorage and preserve other state properties
    if (store) {
      setStore(prevState => ({
        ...prevState,
        cart: storedCart,
        cartCount: storedCartCount
      }));
    }
  }, []);

  const addProduct = (newProduct) => {
    setStore((prevState) => ({
      ...prevState,
      products: [...prevState.products, newProduct],
    }));
  };

  const updateSecondaryBanner = (newBannerUrl) => {
    setStore((prevState) => ({
      ...prevState,
      secondaryBanner: newBannerUrl,
    }));
  };

  const updateFont = (section, font) => {
    setStore((prevState) => ({
      ...prevState,
      fonts: {
        ...prevState?.fonts,
        [section]: font,
      },
    }));
  };

  const addToCart = (product) => {
    console.log(product, "Product being added");

    const selectedOption = product.variant[0]?.options.find(option => option.price === product.price) || null;

    const cartItem = {
      product: product.name,
      price: selectedOption ? selectedOption.price : product.price,
      discountAmount: selectedOption ? selectedOption.discount : 0,
      count: 1,
      productID:product._id || 1,
      selectedVariant: selectedOption ? [{
        name: product.variant[0].name,
        options: {
          name: selectedOption.name
        }
      }] : [{
        name: "default",
        options: {
          name: "default"
        }
      }]
    };

    const existingCartItemIndex = store.cart.findIndex(item =>
      item.product === product.name &&
      item.price === cartItem.price &&
      JSON.stringify(item.selectedVariant) === JSON.stringify(cartItem.selectedVariant)
    );

    let updatedCart;
    if (existingCartItemIndex !== -1) {
      updatedCart = [...store.cart];
      updatedCart[existingCartItemIndex] = {
        ...updatedCart[existingCartItemIndex],
        count: updatedCart[existingCartItemIndex].count + 1
      };
    } else {
      updatedCart = [...store.cart, cartItem];
    }

    console.log(updatedCart);
    // Update the state and local storage
    setStore((prevState) => {
      const newStore = {
        ...prevState,
        cart: updatedCart,
        cartCount: prevState.cartCount + 1
      };
      localStorage.setItem('cart', JSON.stringify(newStore.cart));
      localStorage.setItem('cartCount', newStore.cartCount.toString());
      return newStore;
    });
  };



  const deleteFromCart = (product) => {
    console.log(product.product);
    const {  price, selectedVariant } = product;
    const name = product.product;
    console.log(name,price,selectedVariant);
    console.log(store.cart);
    // Find index of the item in cart
    const existingCartItemIndex = store.cart.findIndex(item =>
      item.product === name &&
      item.price === price &&
      JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
    );
    console.log(existingCartItemIndex);
    if (existingCartItemIndex !== -1) {
      const updatedCart = [...store.cart];

      if (updatedCart[existingCartItemIndex].count === 1) {
        // Remove the item from cart if count is 1
        updatedCart.splice(existingCartItemIndex, 1);
      } else {
        // Decrease the count if more than 1
        updatedCart[existingCartItemIndex] = {
          ...updatedCart[existingCartItemIndex],
          count: updatedCart[existingCartItemIndex].count - 1
        };
      }

    console.log(updatedCart);
      // Update the state and local storage
      setStore(prevState => ({
        ...prevState,
        cart: updatedCart,
        cartCount: prevState.cartCount - 1
      }));

      // Update local storage after modifying the state
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      localStorage.setItem('cartCount', (store.cartCount - 1).toString());

      // Remove the specific item from localStorage based on its name
    }
  };

  const setSelectedSubCategory = (subcategoryName) => {
    setStore((prevState) => ({
      ...prevState,
      selectedSubCategory: subcategoryName,
    }));
  };

  const addCategory = (newCategory) => {
    if (newCategory.trim() === "") {
      console.error("Category name cannot be empty.");
      return;
    }

    if (
      store.categories.some((category) => category.name === newCategory.trim())
    ) {
      console.error("Category already exists.");
      return;
    }

    setStore((prevState) => ({
      ...prevState,
      categories: [...prevState.categories, { name: newCategory.trim() }],
    }));
  };

  const addSubCategory = (newCategory) => {
    if (newCategory.trim() === "") {
      console.error("Subcategory name cannot be empty.");
      return;
    }

    if (
      store.subCategories.some(
        (subcategory) => subcategory.name === newCategory.trim()
      )
    ) {
      console.error("Subcategory already exists.");
      return;
    }

    setStore((prevState) => ({
      ...prevState,
      subCategories: [...prevState.subCategories, { name: newCategory.trim() }],
    }));
  };

  const removeCategory = (index) => {
    if (index < 0 || index >= store.categories.length) {
      console.error("Invalid index for category removal.");
      return;
    }

    setStore((prevState) => ({
      ...prevState,
      categories: prevState.categories.filter((_, i) => i !== index),
    }));
  };

  const removeSubCategory = (index) => {
    if (index < 0 || index >= store.subCategories.length) {
      console.error("Invalid index for subcategory removal.");
      return;
    }

    setStore((prevState) => ({
      ...prevState,
      subCategories: prevState.subCategories.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return <div>is Loading</div>;
  } else
    return (
      <StoreContext.Provider
        value={{
          store,
          setStore,
          storeID,
          addCategory,
          addSubCategory,
          removeCategory,
          removeSubCategory,
          setSelectedSubCategory,
          updateSecondaryBanner,
          addProduct,
          addToCart,
          deleteFromCart,
          updateFont
        }}
      >
        {children}
      </StoreContext.Provider>
    );
};

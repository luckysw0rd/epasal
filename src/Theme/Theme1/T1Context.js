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
      secondaryBannerColor: {
        backgroundThemeColor1: "#ffffff",
        backgroundThemeColor2: "#fcf3f3",
        textColor: "#5D4B3F",
        buttonColor: "#AB8076",
        buttonText: "#ffffff",
      },
      firstBannerColor: {
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
      navColor: {
        backgroundnavColor: "#B6947D",
        storeNameTextColor: "#000000",
        categoryTextColor: "#1d2830",
        searchBarColor: "#fcf3f3",
      },
      headerColor: {
        headerText: "#ffffff",
        headerBackground: "#7a5C5c",
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
    cart: [],
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

    }
    // Rest of the default store data...
  };

  useEffect(() => {
    console.log(passedStore);
  }, [passedStore]);

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
          fonts :response.store.fonts|| {} // Set fetchedFromBackend to true when data is fetched
        });
      } catch (error) {
        // If an error occurs during fetch, set default store data
        setStore(defaultStoreData);
        console.error("Error fetching store data:", error);
      }
    };
    if(window.location.pathname.includes("/store/edit/")){
      fetchStoreData(true);
      setStore(prev=>({...prev,previewMode:false,fetchedFromBackend:false}))
      console.log("I reached here")
    } 
    else if (window.location.pathname.includes("/store/")) {
      fetchStoreData(false);
    } else {
      setStore(defaultStoreData);
    }
  }, [storeID]);

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
    console.log(store, "asdnaisdad ")
    const existingCartItem = store.cart.find(item => item.product.id === product.id);
    if (existingCartItem) {
      setStore((prevState) => ({
        ...prevState,
        cart: prevState.cart.map(item =>
          item.product.id === product.id
            ? { ...item, count: item.count + 1 }
            : item
        ),
        cartCount: prevState.cartCount + 1
      }));
    } else {
      setStore((prevState) => ({
        ...prevState,
        cart: [...prevState.cart, { product, count: 1 }],
        cartCount: prevState.cartCount + 1
      }));
    }
  };

  const deleteFromCart = (product) => {
    const existingCartItem = store.cart.find(item => item.product.id === product.id);
    if (existingCartItem) {
      if (existingCartItem.count === 1) {
        setStore((prevState) => ({
          ...prevState,
          cart: prevState.cart.filter(item => item.product.id !== product.id),
          cartCount: prevState.cartCount - 1
        }));
      } else {
        setStore((prevState) => ({
          ...prevState,
          cart: prevState.cart.map(item =>
            item.product.id === product.id
              ? { ...item, count: item.count - 1 }
              : item
          ),
          cartCount: prevState.cartCount - 1
        }));
      }
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
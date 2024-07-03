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
import fiveHundred from '../../Assets/ratio/500.png';
import sevenForty from '../../Assets/ratio/740.png';
import oneFourty from '../../Assets/ratio/140.png';
import twoFiftySix from '../../Assets/ratio/256.png';
import sixTeenHundred from '../../Assets/ratio/1600.png';
import graybg from '../../Assets/graybg.webp';
import b1 from '../../Assets/Banners/b1.webp';
import b2 from '../../Assets/Banners/b2.webp';
import b3 from '../../Assets/Banners/b3.webp';

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

    subCategories: [{ name: "Category 1" }, { name: "Category 2" }, { name: "Category 3" }],
    banner: { bannerUrl: `${graybg}`, bannerID: '' },
    products: [
      {
        id: 1,
        name: "Product 1",
        price: '100',
        image: { imageUrl: oneFourty, imageID: '' },
        categories: ["Men"],
        subcategories: ["Category 1"],
        rating: 2.5,
        count: 0,
        variant: [
          {
            name: "Variant 1",
            options: [
              {
                name: "Variant A",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: oneFourty
                },
                discount: 5
              }, {
                name: "Variant B",
                price: 2000,
                image: {
                  imageID: "img123",
                  imageUrl: oneFourty
                },
                discount: 6
              }
            ]
          },
          {
            name: "Variant 2",
            options: [
              {
                name: "Variant A",
                price: 1200,
                image: {
                  imageID: "img123",
                  imageUrl: oneFourty
                },
                discount: 10
              }
            ]
          },
        ],
        description: "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd asdad asdnansd adoamds d adoandnald ",
        review: [{
          user: "Ram",
          text: "Very good happy to have it"
        },
        {
          user: "Shyam",
          text: "Scam Alert!! Dont buy"
        }]
      },
      {
        id: 2,
        name: "Product 2",
        price: '200',
        image: { imageUrl: oneFourty, imageID: '' },
        count: 0,
        categories: ["Men"],
        subcategories: ["Category 1"],
        rating: 2.5,
        variant: [
          {
            name: "Variant 1",
            options: [
              {
                name: "Small",
                price: 90,
                image: {
                  imageId: "img123",
                  imageUrl: oneFourty
                },
                discount: 5
              }
            ]
          },
          {
            name: "Variant 2",
            options: [
              {
                name: "Small",
                price: 900,
                image: {
                  imageId: "img123",
                  imageUrl: oneFourty
                },
                discount: 5
              }
            ]
          },
        ],
        description: "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd asdad asdnansd adoamds d adoandnald ",
        review: [{
          user: "Ram",
          text: "Very good happy to have it"
        },
        {
          user: "Shyam",
          text: "Scam Alert!! Dont buy"
        }]
      },
      {
        id: 3,
        name: "Product 3",
        price: '100',
        image: { imageUrl: oneFourty, imageID: '' },
        categories: ["Men"],
        subcategories: ["Category 1"],
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
                  imageUrl: oneFourty
                },
                discount: 5
              }, {
                name: "Gray",
                price: 2000,
                image: {
                  imageID: "img123",
                  imageUrl: oneFourty
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
                  imageUrl: oneFourty
                },
                discount: 10
              }
            ]
          },
        ],
        description: "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd asdad asdnansd adoamds d adoandnald ",
        review: [{
          user: "Sita",
          text: "Ok"
        },
        {
          user: "Hari",
          text: "Bad"
        }]
      },
      {
        id: 4,
        name: "Product 4",
        price: '100',
        image: { imageUrl: oneFourty, imageID: '' },
        categories: ["Men"],
        subcategories: ["Category 1"],
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
                  imageUrl: oneFourty
                },
                discount: 5
              }, {
                name: "Gray",
                price: 2000,
                image: {
                  imageID: "img123",
                  imageUrl: oneFourty
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
                  imageUrl: oneFourty
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
        name: "Product 5",
        price: '100',
        image: { imageUrl: oneFourty, imageID: '' },
        categories: ["Men"],
        subcategories: ["Category 1"],
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
                  imageUrl: oneFourty
                },
                discount: 5
              }, {
                name: "Gray",
                price: 2000,
                image: {
                  imageID: "img123",
                  imageUrl: oneFourty
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
                  imageUrl: oneFourty
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
         buttonColor:"#3d3d3d",
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
   
     
    },
    offerBanner: { offerBannerUrl: `${b3}`, offerBannerID: '' },
    offerBannerText: {
      para1: "",
      para2: "",
      para3: "",
    },
    secondaryBanner: { secondaryBannerUrl: `${b2}`, secondaryBannerID: '' },
    thirdBanner: { thirdBannerUrl: `${b1}`, secondaryBannerID: '' },
    thirdBannerText: {
      heading: "",
      paragraph: "",
    },
    previewMode: true,
    selectedSubCategory: "Category 1",
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
    expectedDeliveryPrice: 100,
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
        const response = await sendRequest(
          `store/get/${storeID}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        console.log(response);
        setStore({
          ...response.store,
          fetchedFromBackend: true,
          selectedSubCategory: response.store.subCategories[0].name,
          previewMode: true,
          isEdit,
          cart: [],
          fonts: response.store.fonts || {}
        });

      } catch (error) {
        setStore(defaultStoreData);
        console.error("Error fetching store data:", error);
      }
    };
    if (window.location.pathname.includes("/store/edit/")) {
      fetchStoreData(true);
      setStore(prev => ({ ...prev, previewMode: false, fetchedFromBackend: false }));
      console.log("I reached here");
    } else if (window.location.pathname.includes("/store/")) {
      fetchStoreData(false);
    } else {
      setStore(defaultStoreData);
    }
  }, [storeID]);

  useEffect(() => {
    if (store?.fetchedFromBackend) {
      const initializeLocalStorage = () => {
        if (!localStorage.getItem('store')) {
          localStorage.setItem('store', JSON.stringify({ name: store.name }));
        }
      };

      const storedStore = JSON.parse(localStorage.getItem('store'));

      if (storedStore && storedStore.name !== store.name) {
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('cartCount', '0');
        localStorage.setItem('store', JSON.stringify({ name: store.name }));
      }

      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const storedCartCount = parseInt(localStorage.getItem('cartCount'), 10) || 0;

      setStore(prevState => ({
        ...prevState,
        cart: storedCart,
        cartCount: storedCartCount
      }));

      initializeLocalStorage();
    }
  }, [store?.name, store?.fetchedFromBackend]);

  const addToCart = (product) => {
    console.log(product, "Product being added");

    const selectedOption = product.variant[0]?.options.find(option => option.price === product.price) || null;

    const cartItem = {
      product: product.name,
      price: selectedOption ? selectedOption.price : product.price,
      discountAmount: selectedOption ? selectedOption.discount : 0,
      count: 1,
      image: product.image.imageUrl,
      productID: product._id || 1,
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
    const { price, selectedVariant } = product;
    const name = product.product;
    console.log(name, price, selectedVariant);
    console.log(store.cart);

    const existingCartItemIndex = store.cart.findIndex(item =>
      item.product === name &&
      item.price === price &&
      JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
    );
    console.log(existingCartItemIndex);
    if (existingCartItemIndex !== -1) {
      const updatedCart = [...store.cart];

      if (updatedCart[existingCartItemIndex].count === 1) {
        updatedCart.splice(existingCartItemIndex, 1);
      } else {
        updatedCart[existingCartItemIndex] = {
          ...updatedCart[existingCartItemIndex],
          count: updatedCart[existingCartItemIndex].count - 1
        };
      }

      console.log(updatedCart);
      setStore(prevState => ({
        ...prevState,
        cart: updatedCart,
        cartCount: prevState.cartCount - 1
      }));

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      localStorage.setItem('cartCount', (store.cartCount - 1).toString());
    }
  };


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

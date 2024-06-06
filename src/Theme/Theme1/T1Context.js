
import React, { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Hooks/AuthContext";
import controller from "../../Assets/controller.png";
const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children, passedStore }) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, onCloseError } = useFetch();

  const { storeID } = useParams(); // Extract storeID using useParams
  console.log(storeID);

  const defaultStoreData = {
    name: "Store Name",
    location: "Your Store Location",
    email: "store@example.com",
    phoneNumber: "+1234567890",
    logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305",
    logofile:'',
    categories: [{ name: "Men" }, { name: "Women" }, { name: "Unisex" }],
    subCategories: [{ name: "Watch" }, { name: "Jacket" }, { name: "Pants" }],
    banner:'',
    bannerfile:'',
    products: [
      {
        id: 1,
        name: "Watch1",
        image: controller,
        categories: ["Men"],
        subcategories: ["Watch"],
        rating: 2.5,
        sizes: ["S", "M", "L"],
        // variants: [
        //   { type: "Color", option: "Black", prices: [50, 60, 70] },
        //   { type: "Color", option: "White", prices: [55, 65, 75] },
        //   { type: "Color", option: "Red", prices: [60, 70, 80] },
        // ],
        variant: [
                              {
                                  name: "Size",
                                  options: [
                                      {
                                          name: "Small",
                                          price: 90,
                                          image: {
                                              imageId: "img123",
                                              imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
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
                                          price: 90,
                                          image: {
                                              imageId: "img123",
                                              imageUrl: "https://images-na.ssl-images-amazon.com/images/I/714xodINSzL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
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
                                          price: 90,
                                          image: {
                                              imageId: "img123",
                                              imageUrl: "http://example.com/image-small.jpg"
                                          },
                                          discount: 5
                                      }
                                  ]
                              },
                          ],
        description:
          "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd  asdad asdnansd adoamds d adoandnald  ",
      },
      // {
      //   id: 2,
      //   name: "Watch2",
      //   rating: 4,
      //   image:
      //     "https://s3-alpha-sig.figma.com/img/8a0d/6d87/f42170d618c62d98aee3e5865eb5fdd3?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mGJNf3-Y-t~JPu99g5ge0k8gvU34-7oEWG8M1-LtO9rloYMZK9PVRDKGOSLmJr4FYiiH0d8Us9CzK~ctg-5atJWbgutaIS6kB1tZ2njjpF2ujl1xRpxrwJsUeb7-HXRcjDDL3VoD~xTmB67CZlPCzXi97~CVIRtBxt8Z7T9GTkWlibwH6gW~54MFTFKy2~2JgecKrjmFDaRQZKUyZCos8RqeWH9smbKwRyRvqdfhikeZL-ItvwnfmNFL1M2zjzHh7PztnSNwvH1MimhfQXzXK9fGRXe-RCNeK41W08rp7F4tCS~bmK10BO9WlL-MyJGtwSbF4~4tZGg9vaEwpekcOw__",
      //   categories: ["Men"],
      //   subcategories: ["Watch"],
      //   sizes: ["S", "M", "L"],
      //   variants: [
      //     { type: "Color", option: "Black", prices: [50, 60, 70] },
      //     { type: "Color", option: "White", prices: [55, 65, 75] },
      //     { type: "Color", option: "Red", prices: [60, 70, 80] },
      //   ],
      //   description:
      //     "A sleek and modern watch that combines elegance with functionality.",
      // },
      // {
      //   id: 3,
      //   name: "Watch3",
      //   image:
      //     "https://www.awco.nl/wp-content/uploads/2022/07/cartier-baignoire-awco-2-e1658830551133.jpg",
      //   categories: ["Men"],
      //   subcategories: ["Watch"],
      //   sizes: ["S", "M", "L"],
      //   variants: [
      //     { type: "Color", option: "Black", prices: [50, 60, 70] },
      //     { type: "Color", option: "White", prices: [55, 65, 75] },
      //     { type: "Color", option: "Red", prices: [60, 70, 80] },
      //   ],
      //   description:
      //     "A timeless classic watch that exudes sophistication and style.",
      // },
      // {
      //   id: 4,
      //   name: "Watch4",
      //   image:
      //     "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/4538ed94e47b06cb2b5325636236e6a5.jpg?imageView2/2/w/500/q/60/format/webp",
      //   categories: ["Men"],
      //   subcategories: ["Watch"],
      //   sizes: ["S", "M", "L"],
      //   variants: [
      //     { type: "Color", option: "Black", prices: [50, 60, 70] },
      //     { type: "Color", option: "White", prices: [55, 65, 75] },
      //     { type: "Color", option: "Red", prices: [60, 70, 80] },
      //   ],
      //   description:
      //     "A sporty watch designed for the active lifestyle, combining durability with style.",
      // },
      // {
      //   id: 5,
      //   name: "Watch5",
      //   image:
      //     "https://img.chrono24.com/images/uhren/31781576-yxk1zakhh64ioxtbwozl4tqj-ExtraLarge.jpg",
      //   categories: ["Men"],
      //   subcategories: ["Watch"],
      //   sizes: ["S", "M", "L"],
      //   variants: [
      //     { type: "Color", option: "Black", prices: [50, 60, 70] },
      //     { type: "Color", option: "White", prices: [55, 65, 75] },
      //     { type: "Color", option: "Red", prices: [60, 70, 80] },
      //   ],
      //   description:
      //     "A luxurious watch that blends classic design with modern technology.",
      // },
      // {
      //   id: 6,
      //   name: "Watch6",
      //   image:
      //     "https://i.pinimg.com/originals/2f/7a/9f/2f7a9f72f64dfb34a9942cf3f15f6ed4.jpg",
      //   categories: ["Men"],
      //   subcategories: ["Watch"],
      //   sizes: ["S", "M", "L"],
      //   variants: [
      //     { type: "Color", option: "Black", prices: [50, 60, 70] },
      //     { type: "Color", option: "White", prices: [55, 65, 75] },
      //     { type: "Color", option: "Red", prices: [60, 70, 80] },
      //   ],
      //   description:
      //     "An elegant watch with a minimalist design, perfect for any occasion.",
      // },
      // {
      //   id: 7,
      //   name: "Product 2 - Jacket",
      //   image:
      //     "https://img4.dhresource.com/webp/m/0x0/f3/albu/km/y/03/8527bf64-ccfa-4ba8-869d-d27318be5fe5.jpg",
      //   categories: ["Women"],
      //   subcategories: ["Jacket"],
      //   sizes: ["S", "M", "L"],
      //   variants: [
      //     { type: "Color", option: "Blue", prices: [70, 80, 90] },
      //     { type: "Color", option: "Green", prices: [75, 85, 95] },
      //     { type: "Color", option: "Yellow", prices: [80, 90, 100] },
      //   ],
      //   description:
      //     "A stylish and comfortable jacket, perfect for everyday wear and outdoor activities.",
      // },
      // {
      //   id: 8,
      //   name: "Product 3 - Pants",
      //   image:
      //     "https://urbanwearoutsiders.com/cdn/shop/products/H1fe8973abaae4b30aa2e18a0a3e8bec3V.jpg?v=1660239498",
      //   categories: ["Unisex"],
      //   subcategories: ["Pants"],
      //   sizes: ["S", "M", "L"],
      //   variants: [
      //     { type: "Color", option: "Black", prices: [40, 45, 50] },
      //     { type: "Color", option: "Gray", prices: [45, 50, 55] },
      //     { type: "Color", option: "Navy", prices: [50, 55, 60] },
      //   ],
      //   description:
      //     "Comfortable and versatile pants suitable for both casual and formal occasions.",
      // },
      // Add more products here...
    ],

    color: {
      backgroundThemeColor: "#B6947D",

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
      productSection: "ffffff",
      productListColor: {
        // Define productListColor object
        productBackground: "ffffff",
        backgroundColor: "#fefbfb",
        textColor: "#333333",
        borderColor: "#cccccc",
        selectedBackground: "#c8bcbc",
      },
      footerColor: {
        background: "#333333",
        textColor: "#ffffff",
        linkColor: "#59CE8F",
      },
    },
    offerBanner: "../Assets/secondarybanner.jpg",
    secondaryBanner: "../Assets/secondarybanner.jpg",
    previewMode: true,
    selectedSubCategory: "Watch",
    cart: [], // New cart array to store product IDs

    secondaryBannerText: {
      heading: "",
      paragraph: "",
    },
    offerBannerText: {
      para1: "",
      Para2: "",
      para3: "",
    },
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    footerDescription: "A modern online store for all your needs.",
    fetchedFromBackend: false,
    // Rest of the default store data...
  };

  useEffect(() => {
    console.log(passedStore);
  }, [passedStore]);
  const [store, setStore] = useState(defaultStoreData); // Start with null while fetching

  useEffect(() => {
    const fetchStoreData = async () => {
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
          fetchedFromBackend: true, // Set fetchedFromBackend to true when data is fetched
        });
      } catch (error) {
        // If an error occurs during fetch, set default store data
        setStore(defaultStoreData);
        console.error("Error fetching store data:", error);
      }
    };

    if (window.location.pathname.includes("/store/")) {
      fetchStoreData();
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

  const addToCart = (productId) => {
    if (!store.cart.includes(productId)) {
      setStore((prevState) => ({
        ...prevState,
        cart: [...prevState.cart, productId],
      }));
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
          addCategory,
          addSubCategory,
          removeCategory,
          removeSubCategory,
          setSelectedSubCategory,
          addToCart,
          updateSecondaryBanner,
          addProduct,
        }}
      >
        {children}
      </StoreContext.Provider>
    );
};

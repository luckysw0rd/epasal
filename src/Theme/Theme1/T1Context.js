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

    const defaultStoreData = {
        name: "Store Name",
        location: "Your Store Location",
        email: "store@example.com",
        phoneNumber: "+1234567890",
        logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305",
        categories: [{ name: "Men" }, { name: "Women" }, { name: "Unisex" }],
        subCategories: [{ name: "Watch" }, { name: "Jacket" }, { name: "Pants" }],
        products: [
            {
                id: 1,
                name: "Watch1",
                image: controller,
                categories: ["Men"],
                subcategories: ["Watch"],
                rating: 2.5,
                sizes: ["S", "M", "L"],
                variant: [
                    {
                        name: "Size",
                        options: [
                            {
                                name: "Small",
                                price: 1000,
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
                                price: 1200,
                                image: {
                                    imageId: "img123",
                                    imageUrl: "https://images.vexels.com/media/users/3/234039/isolated/preview/0bb83cedf3679102fae76c6bbb940ccb-denim-jean-jacket.png"
                                },
                                discount: 5
                            }
                        ]
                    },
                ],
                description:
                    "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd  asdad asdnansd adoamds d adoandnald  ",
            },
            {
                id: 2,
                name: "Watch1",
                image: controller,
                categories: ["Men"],
                subcategories: ["Watch"],
                rating: 2.5,
                sizes: ["S", "M", "L"],
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
                                price: 90,
                                image: {
                                    imageId: "img123",
                                    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxEbK3Nqdg3b7KlytQ57iOF7Jxtiy4Kn-nQ&s"
                                },
                                discount: 5
                            }
                        ]
                    },
                ],
                description:
                    "A vintage-inspired chronometer with a nostalgic design, perfect for the modern man. ansod ansdoan oandosna onasda onadonadon oansdand andansd anaspdna daonsdoansd asndasda sdaonsdasd adooasd  asdad asdnansd adoamds d adoandnald  ",
            },
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
                backgroundColor: "#fefbfb",
                textColor: "#4F3100",
                priceColor: "#000000",
                heartColor: "#FF0000",
                borderColor: "#B5A297",
                buttonTextColor: "#4F3100",
                buttonBgColor: "#ffffff",
                buttonBorderColor: "#4F3100",
                buttonBgColorOnHover: "#4F3100",
                header: "#000000"
            },
            footerColor: {
                background: "#333333",
                textColor: "#ffffff",
                linkColor: "#59CE8F",
            },
        },

        secondaryBanner: "../Assets/secondarybanner.jpg",
        previewMode: true,
        selectedSubCategory: "Watch",
        cart: [], // New cart array to store product IDs

        cartCount: 0,

        secondaryBannerText: {
            heading: "",
            paragraph: "",
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

    const addToCart = (product) => {
        if (!store.cart.includes(product)) {
            setStore((prevState) => ({
                ...prevState,
                cart: [...prevState.cart, product],
                cartCount: prevState.cartCount + 1
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
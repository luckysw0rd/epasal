import React, { useContext, useEffect, useState } from 'react';
import { useStore } from '../T1Context';
import { AuthContext } from '../../../Hooks/AuthContext';
import Loading from '../Loading/Loading';
import useFetch from "../../../Hooks/useFetch";
import { useImage } from '../../../Hooks/useImage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loading/Loading';
const SaveStoreButton = () => {
    const { uploadImage } = useImage();
    const auth = useContext(AuthContext);
    const [tempLoading, setTempLoading] = useState(false)
    const [storeNew, setStoreNew] = useState(false);
    const { store, setStore } = useStore();
    const [storeMade, setStoreMade] = useState(false);
    const navigate = useNavigate();
    var storeNewImage = {};
    const { previewMode } = store;
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const ImageUpload = async () => {
        try {
            setTempLoading(true);
            const ImageData = await uploadImage(store?.logo?.logoUrl)
            const MobileBannerData = await uploadImage(store?.mobileBanner?.bannerUrl)
            const BannerData = await uploadImage(store?.banner?.bannerUrl)
            const secondaryBannerData = await uploadImage(store?.secondaryBanner?.secondaryBannerUrl)
            const offerBannerData = await uploadImage(store?.offerBanner?.offerBannerUrl)
            const thirdBannerData = await uploadImage(store?.thirdBanner?.thirdBannerUrl)
            for (let i = 0; i < store.products.length; i++) {
                const product = store.products[i];
                const productImg = await uploadImage(product?.image?.imageUrl);

                // Update product image
                setStore(prev => {
                    const updatedProducts = [...prev.products];
                    updatedProducts[i] = {
                        ...updatedProducts[i],
                        image: {
                            imageUrl: productImg.img,
                            imageID: productImg.id
                        }
                    };
                    return {
                        ...prev,
                        products: updatedProducts
                    };
                });

                // Update variant images
                if (!store.isEdit) {
                    for (let j = 0; j < product?.variant[0]?.options.length; j++) {
                        const variantOption = product?.variant[0]?.options[j];
                        const variantImg = await uploadImage(variantOption?.image?.imageUrl);

                        setStore(prev => {
                            const updatedProducts = [...prev.products];
                            const updatedOptions = [...updatedProducts[i]?.variant[0]?.options];
                            updatedOptions[j] = {
                                ...updatedOptions[j],
                                image: {
                                    imageID: variantImg.id,
                                    imageUrl: variantImg.img
                                }
                            };

                            updatedProducts[i] = {
                                ...updatedProducts[i],
                                variant: [{
                                    ...updatedProducts[i].variant[0],
                                    options: updatedOptions
                                }]
                            };

                            return {
                                ...prev,
                                products: updatedProducts
                            };
                        });
                    }
                }
            }

            setStore(prev => (
                {
                    ...prev, logo: {
                        logoUrl: ImageData?.img,
                        logoID: ImageData?.id
                    }, banner: {
                        bannerUrl: BannerData?.img,
                        bannerID: BannerData?.id
                    }, mobileBanner: {
                        bannerUrl: MobileBannerData?.img,
                        bannerID: MobileBannerData?.id
                    }
                    , secondaryBanner: {
                        secondaryBannerUrl: secondaryBannerData?.img,
                        secondaryBannerID: secondaryBannerData?.id
                    }, offerBanner: {
                        offerBannerUrl: offerBannerData?.img,
                        offerBannerID: offerBannerData?.id
                    }, thirdBanner: {
                        thirdBannerUrl: thirdBannerData?.img,
                        thirdBannerID: thirdBannerData?.id
                    }
                }
            ))
            storeNewImage = store;
            setTempLoading(false);
            PostData(storeNewImage)

            setStoreNew(true)
        } catch (err) {
            setTempLoading(false);
            toast.error('Error Uploading Image', {
                position: "top-center",
                pauseOnFocusLoss: false,
                pauseOnHover: false
            })

        }
    }
    useEffect(() => {
        if (storeNew) {
            PostData();
        }
    }, [storeNew, setStoreNew])
    const PostData = async () => {
        try {

            if (!store.isEdit && !storeMade) {
                const responseData = await sendRequest(
                    'store/create', // Replace 'your-api-endpoint' with your actual API endpoint
                    'POST',
                    JSON.stringify({ store }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token,
                    }
                );
                setStoreMade(true)
                setStoreNew(false)
                toast.success(responseData.message); // Handle response data as needed
                const storeName = encodeURIComponent(store.name.trim());
                const url = `${process.env.REACT_APP_BASE_URL}/adminpanel/${storeName}`;

                console.log(url);
                navigate(url);
            } else {
                const responseData = await sendRequest(
                    `store/update/${store._id}`, // Replace 'your-api-endpoint' with your actual API endpoint
                    'PATCH',
                    JSON.stringify({ store }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token,
                    }
                );
                setStoreNew(false)
                toast.success(responseData.message); // Handle response data as needed
                const storeName = encodeURIComponent(store.name.trim());
                const url = `${process.env.REACT_APP_BASE_URL}/adminpanel/${storeName}`;
                console.log(url);
                navigate(url);
            }
        } catch (error) {
            console.error('Error saving store data:', error);
            if (error.message && error.message.includes("Store Name Already Taken")) {
                toast.error(error.message);
            }
        }
    }
    const saveStore = async () => {

        if (auth.token) {
            await ImageUpload();
        } else {
            toast("Please Log In First");
            window.open('/login'); // Open the login page in a new tab
        }
    };

    if (isLoading || tempLoading) {
        return (
            <Loader></Loader>
        )
    }
    if (!store.fetchedFromBackend || store.isEdit) {

        return (
            <div className='mt-4 h-20 flex justify-center'>
                {isLoading ? (
                    <Loading /> // Render Loading component when isLoading is true
                ) : (
                    <div>
                        {/* <button onClick={ImageUpload}>UploadImage</button> */}
                        <button className="group group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-sky-300 duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-300 hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-sky-900 relative bg-sky-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur" onClick={saveStore}>Save Store</button>
                    </div>
                )}
            </div>
        );
    } else {
        return null;
    }
};

export default SaveStoreButton;
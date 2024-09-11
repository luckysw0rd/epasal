import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../Hooks/AuthContext';
import { StoreProvider, useStore } from "./ThemeContext";
import Theme1 from './Theme2/Theme1';
const Theme = (passedStore = { passedStore }) => {
  const [activeTheme, setActiveTheme] = useState(1);
  const [themeNumber, setThemeNumber] = useState(1);
  const { storeID } = useParams();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [storeName, setStoreName] = useState('');
  const [storeLogoUrl, setStoreLogoUrl] = useState('');
 


useEffect(() => {
  if (storeLogoUrl) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/jpeg';
    link.rel = 'shortcut icon';
    link.href = storeLogoUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}, [storeLogoUrl]);
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const responseData = await sendRequest(`store/get/${storeID}`);
        console.log(responseData.store.logo.logoUrl);
        if (responseData && responseData.store) {
          setStoreName(storeID);
          // Update this line to access the logo URL correctly
          setStoreLogoUrl(responseData.store.logo.logoUrl);
        }
      } catch (err) {
        console.error('Error fetching store data:', err);
        setStoreName(storeID); // Fallback to storeID if fetch fails
      }
    };
    console.log(storeLogoUrl);

    fetchStoreData();
  }, [storeID, sendRequest]);

  return (
    <div className='overflow-x-hidden'>
      <StoreProvider passedStore={passedStore} >
      <Helmet>
        <title>{storeName}</title>
       
      </Helmet>
      <Theme1 useStore={useStore}/>
      </StoreProvider>
    </div>
  );
};

export default Theme;
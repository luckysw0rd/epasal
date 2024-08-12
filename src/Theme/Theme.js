import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../Hooks/AuthContext';
import Theme1 from './Theme1/Theme1';

const Theme = () => {
  const [activeTheme, setActiveTheme] = useState(1);
  const [themeNumber, setThemeNumber] = useState(1);
  const { storeID } = useParams();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, onCloseError } = useFetch();
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    // Fetch the store name based on the storeID
    fetchStoreName(storeID).then(name => setStoreName(name));
  }, [storeID]);

  return (
    <div className='overflow-x-hidden'>
      <Helmet>
        <title>{storeName}</title>
      </Helmet>
      <Theme1 />
    </div>
  );
};

// Assume this function fetches the store name from an API or database
async function fetchStoreName(storeID) {
  // Replace this with your actual store name fetching logic
  return `${storeID}`;
}

export default Theme;
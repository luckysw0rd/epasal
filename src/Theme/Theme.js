// Theme.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../Hooks/AuthContext';
import Theme1 from './Theme1/Theme1';
export default function Theme() {
  const [activeTheme, setActiveTheme] = useState(1);
  const [themeNumber, setThemeNumber] = useState(1);
  const { storeID } = useParams(); // Extract storeID using useParams
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, onCloseError } = useFetch();


  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        console.log('inside fetching');
        // Fetch store data from the server using the provided store ID
        const response = await sendRequest(
          `store/getactiveTheme/${storeID}`, // Replace 'your-api-endpoint' with your actual API endpoint
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          }
        ); // Use storeID from useParams
      
        console.log(response);

      } catch (error) {
        // If an error occurs during fetch, set default store data
        console.error('Error fetching store data:', error);
      }
    };

    if (window.location.pathname.includes('/store/')) {
      fetchStoreData();
    } else {
    }
  }, [storeID, sendRequest, auth.token]);


  return (
    <div className=' overflow-x-hidden'>
      <Theme1/>
    </div>
  );
}

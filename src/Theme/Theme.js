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




  return (
    <div className=' overflow-x-hidden'>
      <Theme1/>
    </div>
  );
}

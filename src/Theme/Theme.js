// Theme.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../Hooks/AuthContext';
import { StoreProvider, useStore } from "./ThemeContext";
import Theme1 from './Theme2/Theme2';
export default function Theme(passedStore = { passedStore }) {
  const [activeTheme, setActiveTheme] = useState(1);
  const [themeNumber, setThemeNumber] = useState(1);
  const { storeID } = useParams(); 
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, onCloseError } = useFetch();

  return (
    <div className=' overflow-x-hidden'>
      <StoreProvider passedStore={passedStore} >
      <Theme1 StoreProvider={StoreProvider} useStore={useStore}/>
      </StoreProvider>
    </div>
  );
}

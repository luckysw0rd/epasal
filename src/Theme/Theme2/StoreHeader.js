import React from 'react';
import { useStore } from '../ThemeContext';
import Header from '../../Components/Header/Header';
const StoreHeader = () => {
    const { store } = useStore();
    const color = store.color || {};

    const headerProps = {
        color,
        text: "10% Sale!",
    };

    return (
        <Header
            headerProps={headerProps}
            headerType="Header1" // Change this to "Header2" or "Header3" to switch header types
        />
    );
};

export default StoreHeader;

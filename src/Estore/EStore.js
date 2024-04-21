import React, { useState } from 'react';
import { StoreProvider, useStore } from './StoreContext';
import EStoreNavbar from './EStoreNavbar';
import AboutPage from './AboutPage';
import ColorPicker from './ColorPicker';
import StoreHeader from './StoreHeader';
import CategorySelector from './CategorySelector';
import { useMediaQuery } from 'react-responsive';
import SubProduct from './SubProduct/SubProduct';
import SecondaryBanner from './SecondaryBanner';
import ProductList from './ProductList/ProductList';
import Footer from './Footer/Footer';
import SaveStoreButton from './SaveButton/SaveStoreButton';

const EStore = () => {
    const { store } = useStore();

    // Ensure useState and useMediaQuery are called unconditionally
    const [showColorPicker, setShowColorPicker] = useState(true);
        const isMobile = useMediaQuery({ maxWidth: 768 });

    if (!store) {
        return <div>Loading...</div>;
    }

    const { color } = store;

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    return (
        <div className=' h-full' style={{ backgroundColor: color.backgroundThemeColor }}>
            <StoreHeader />
            <ColorPicker />
            <EStoreNavbar toggleColorPicker={toggleColorPicker} />
            <AboutPage />
            <CategorySelector /> {/* Render CategorySelector only on mobile devices */}
            <SubProduct />
            <SecondaryBanner/>
            <ProductList/>
            <Footer/>
            <SaveStoreButton/>
        </div>
    );
};


const EStoreWithStoreProvider = () => {
    return (
        <StoreProvider>
            <EStore />
        </StoreProvider>
    );
};

export default EStoreWithStoreProvider;

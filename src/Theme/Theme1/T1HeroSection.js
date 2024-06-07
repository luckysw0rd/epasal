import React from 'react';
import { useStore } from './T1Context';
import HeroSection from '../../Components/HeroSection/HeroSection';
const AboutPage = () => {
    const { store,setStore } = useStore();
    const { previewMode } = store;

    const heroSectionProps = {
        previewMode,
        store,
        setStore
    };

    return (
        <HeroSection
            heroSectionProps={heroSectionProps}
            heroSectionType="HeroSection1" // Change this to "HeroSection2" or "HeroSection3" to switch hero section types
        />
    );
};

export default AboutPage;

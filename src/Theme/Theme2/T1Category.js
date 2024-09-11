import React, { useState } from 'react';
import { useStore } from '../ThemeContext';
import Category from '../../Components/Category/Category';
const CategorySelector = ({store,setSelectedSubCategory, removeSubCategory}) => {
    const {addSubCategory}=useStore();
    const { subCategories, previewMode, color,isEdit } = store;
    const categoryType = 'Category1'; // Set the category type here

    const categoryProps = {
        subCategories,
        previewMode,
        color,
        categoryType,
        setSelectedSubCategory,
        removeSubCategory,
        isEdit,
        addSubCategory
    };

    return <Category {...categoryProps} />;
};

export default CategorySelector;

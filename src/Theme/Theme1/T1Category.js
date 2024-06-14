import React, { useState } from 'react';
import { useStore } from './T1Context';
import AddCategoryModal from './AddCategoryModal';
import Category from '../../Components/Category/Category';
const CategorySelector = () => {
    const { store, setSelectedSubCategory, removeSubCategory } = useStore();
    const { subCategories, previewMode, color,isEdit } = store;
    const categoryType = 'Category1'; // Set the category type here

    const categoryProps = {
        subCategories,
        previewMode,
        color,
        categoryType,
        setSelectedSubCategory,
        removeSubCategory,
        isEdit
    };

    return <Category {...categoryProps} />;
};

export default CategorySelector;

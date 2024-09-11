import React from 'react';
import { useStore } from '../../ThemeContext';
import ProductCard from './T1ProductCard';
import ProductForm from './ProductForm';
import { useDraggable } from "react-use-draggable-scroll";
import CategorySelector from '../T1Category';
import SubProduct from '../../../Components/SubProduct/SubProduct';
import useFetch from '../../../Hooks/useFetch';
import { toast } from 'react-toastify';

const T1SubProduct = () => {
    const { store, setStore ,addToCart,isVisitorAddToCart,setIsVisitorAddToCart,setSelectedSubCategory, removeSubCategory,addSubCategory} = useStore();
    const { products, categories, subCategories, previewMode } = store;
    const { sendRequest } = useFetch();
    const subProductType = 'Category1';
    const handleAddToCartAnalytics = async (product) => {

            // Check if it's the visitor's first time adding to the cart
            if (!isVisitorAddToCart) {
                try {
                    setIsVisitorAddToCart(true);
                    await sendRequest(
                        `analytics/visitorCartAdd/${store._id}`,
                        'POST',
                        JSON.stringify({}),
                        { 'Content-Type': 'application/json' }
                    );
                } catch (err) {
                    console.error('Error logging visitor cart addition:', err.message);
                    toast.error(err.message);
                }
            }
            
            // Log the product addition event
            try {
                await sendRequest(
                    `analytics/addToCartEvent/${store._id}`,
                    'POST',
                    JSON.stringify({ productId: product }),
                    { 'Content-Type': 'application/json' }
                );
            } catch (err) {
                console.error('Error logging product addition:', err.message);
                toast.error(err.message);
            }
            
    
        

    };
    
    const subProductsProps = {
        products, addToCart, categories, subCategories, previewMode, store, setStore, subProductType, CategorySelector, AddProduct: ProductForm, ProductCard, useDraggable,handleAddToCartAnalytics,setSelectedSubCategory, removeSubCategory
    };

    return (
        <SubProduct {...subProductsProps} />
    );
};

export default T1SubProduct;

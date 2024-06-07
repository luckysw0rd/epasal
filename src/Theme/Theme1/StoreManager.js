import React, { useState } from 'react';
import { useStore } from './T1Context';
const StoreManager = () => {
    const {
        store,
        setStore,
        addCategory,
        addSubCategory,
        removeCategory,
        removeSubCategory,
        setSelectedSubCategory,
        addToCart,
        updateSecondaryBanner,
        addProduct,
    } = useStore();

    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '',
        image: '',
        categories: [],
        subcategories: [],
        rating: 0,
        sizes: [],
        variants: [],
        description: '',
    });
    const [newBannerUrl, setNewBannerUrl] = useState('');

    const handleAddCategory = () => {
        addCategory(newCategory);
        setNewCategory('');
    };

    const handleAddSubCategory = () => {
        addSubCategory(newSubCategory);
        setNewSubCategory('');
    };

    const handleAddProduct = () => {
        addProduct(newProduct);
        setNewProduct({
            name: '',
            image: '',
            categories: [],
            subcategories: [],
            rating: 0,
            sizes: [],
            variants: [],
            description: '',
        });
    };

    const handleUpdateBanner = () => {
        updateSecondaryBanner(newBannerUrl);
        setNewBannerUrl('');
    };

    return (
        <div>
            <h1>Store Manager</h1>

            <h2>Categories</h2>
            <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New Category"
            />
            <button onClick={handleAddCategory}>Add Category</button>
            <ul>
                {store.categories.map((category, index) => (
                    <li key={index}>
                        {category.name}
                        <button onClick={() => removeCategory(index)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h2>SubCategories</h2>
            <input
                type="text"
                value={newSubCategory}
                onChange={(e) => setNewSubCategory(e.target.value)}
                placeholder="New SubCategory"
            />
            <button onClick={handleAddSubCategory}>Add SubCategory</button>
            <ul>
                {store.subCategories.map((subcategory, index) => (
                    <li key={index}>
                        {subcategory.name}
                        <button onClick={() => removeSubCategory(index)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h2>Products</h2>
            <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Product Name"
            />
            <input
                type="text"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                placeholder="Product Image URL"
            />
            <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Product Description"
            />
            <button onClick={handleAddProduct}>Add Product</button>

            <h2>Update Banner</h2>
            <input
                type="text"
                value={newBannerUrl}
                onChange={(e) => setNewBannerUrl(e.target.value)}
                placeholder="New Banner URL"
            />
            <button onClick={handleUpdateBanner}>Update Banner</button>

            <h2>Cart</h2>
            <ul>
                {store.cart.map((productId, index) => (
                    <li key={index}>{productId}</li>
                ))}
            </ul>

            <h2>Selected SubCategory</h2>
            <select
                value={store.selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
            >
                {store.subCategories.map((subcategory, index) => (
                    <option key={index} value={subcategory.name}>
                        {subcategory.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StoreManager;

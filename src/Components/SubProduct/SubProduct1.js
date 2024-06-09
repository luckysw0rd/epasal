import React, { useRef, useState, useEffect } from 'react';

const SubProduct1 = ({
    products, categories, subCategories, previewMode, store, CategorySelector, setStore, AddProduct, ProductCard, useDraggable
}) => {
    const ref = useRef();
    const containerRef = useRef(null);
    const { events } = useDraggable(ref);

    const selectedSubCategory = store.selectedSubCategory || subCategories[0].name;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState({});
    const [showAddProduct, setShowAddProduct] = useState(false);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.subcategories && product.subcategories.includes(selectedSubCategory)
        );
        setFilteredProducts(filtered);
    
        if (containerRef.current) {
            containerRef.current.scrollLeft = 0;
        }
    }, [products, selectedSubCategory]);
    
    const handleStyleSelect = (productId, styleIndex) => {
        setSelectedStyles(prevStyles => ({
            ...prevStyles,
            [productId]: prevStyles[productId] === styleIndex ? null : styleIndex,
        }));
    };

    const handleRemoveProduct = (productId) => {
        setStore(prevStore => ({
            ...prevStore,
            products: prevStore.products.filter(product => product.id !== productId)
        }));
    };

    const toggleAddProduct = () => {
        setShowAddProduct(prev => !prev);
    };

    const subProductColor = store.color.subProductColor;

    return (
        <div className='  h-[400px]'>
            <CategorySelector />
            <div className="px-20  pb-8 font-Cinzel overflow-x-scroll" style={{
                maxWidth: '100vw', backgroundColor: subProductColor.categoryColor
            }}
                {...events}
                ref={ref}
            >
                <div ref={containerRef} className="  flex py-4 gap-5 pb-6 overflow-x-scroll scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar">
                    <style>{`
                        .scrollbar::-webkit-scrollbar {
                            height: 12px;
                        }
                        .scrollbar::-webkit-scrollbar-track {
                            background: ${subProductColor.scrollbarColor};
                            border: 5px solid ${subProductColor.categoryColor};
                        }
                        .scrollbar::-webkit-scrollbar-thumb {
                            background-color: ${subProductColor.scrollbarColor};
                            border-radius: 10px;
                        }
                    `}</style>
                    {filteredProducts.map(product => (
                        <div key={product.id} className="flex-none mr-4 ml-2">
                            <ProductCard
                                product={product}
                                selectedStyle={selectedStyles[product.id]}
                                handleStyleSelect={handleStyleSelect}
                                handleRemoveProduct={handleRemoveProduct}
                                store={store}
                            />
                        </div>
                    ))}
                    {!previewMode && (
                        <div className="flex-none mr-4">
                            <button onClick={toggleAddProduct} className="flex flex-col items-center justify-center w-32 h-40 border border-dashed border-gray-300 rounded-md hover:bg-gray-50/50 focus:outline-none">
                                <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span className="text-gray-900">Add Product</span>
                            </button>
                        </div>
                    )}
                </div>
                {showAddProduct && <AddProduct onClose={toggleAddProduct} />}
            </div>
        </div>
    );
};

export default SubProduct1;
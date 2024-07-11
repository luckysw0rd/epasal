import React, { useState } from 'react';
import Subscription from './Subscription';
import ProductCard from './ProductCard/ProductCard'; // Import the new ProductCard component
import { FiBox, FiShoppingCart } from 'react-icons/fi'; // Import icons

const renderComponent = (componentName, props) => {
    switch (componentName) {
        case 'subscription':
            return <Subscription {...props} />;
        case 'productCard':
            return <ProductCard {...props} />;
        default:
            return <Subscription {...props} />;
    }
};

export default function Shop({ store }) {
    const [activeComponent, setActiveComponent] = useState('subscription');

    const isActive = (componentName) => componentName === activeComponent;

    return (
        <div>
            <div className="flex font-Poppins justify-center -mb-18">
                <button
                    className={`flex items-center text-black px-4 mr-4 py-2 rounded-md hover:bg-gray-200 transition-colors ${isActive('subscription') ? 'bg-gray-200' : ''}`}
                    onClick={() => setActiveComponent('subscription')}
                >
                    <FiBox className="mr-2" />
                    Subscription
                </button>
                <button
                    className={`flex items-center text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors ${isActive('productCard') ? 'bg-gray-200' : ''}`}
                    onClick={() => setActiveComponent('productCard')}
                >
                    <FiShoppingCart className="mr-2" />
                    Product Card
                </button>
            </div>
            <div className="w-full">
                {renderComponent(activeComponent, { store })}
            </div>
        </div>
    );
}

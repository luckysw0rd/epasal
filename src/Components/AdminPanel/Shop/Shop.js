import React, { useState } from 'react';
import Subscription from './Subscription';

// Function to render components with props
const renderComponent = (componentName, props) => {
    switch (componentName) {
        case 'subscription':
            return <Subscription {...props} />;
        // Add cases for other components here, e.g.:
        // case 'anotherComponent':
        //     return <AnotherComponent {...props} />;
        default:
            return <Subscription {...props} />;
    }
};

export default function Shop({ store }) {
    const [activeComponent, setActiveComponent] = useState('subscription');

    return (
        <div>
            <div className="flex font-Cinzel justify-start -mb-18">
                <button
                    className="text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => setActiveComponent('subscription')}
                >
                    Subscription
                </button>
                {/* Add buttons for other components here */}
            </div>
            <div className="w-full">
                {renderComponent(activeComponent, { store })}
            </div>
        </div>
    );
}


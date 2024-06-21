import React, { useState } from 'react';
import Subscription from './Subscription';

const components = {
    subscription: <Subscription />,
    // Add other components here as needed
};

export default function Shop() {
    const [activeComponent, setActiveComponent] = useState('subscription');
    const renderComponent = () => {
        switch (activeComponent) {
            case 'subscription':
                return components.subscription;
            // Add cases for other components here
            default:
                return components.subscription;
        }
    };

    return (
        <div>
            <div className="flex font-Cinzel justify-start  -mb-18 ">
                <button
                    className="  text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => setActiveComponent('subscription')}
                >
                    Subscription
                </button>
                {/* Add buttons for other components here */}
            </div>
            <div className='  w-full '>
            {renderComponent()}
            </div>
        </div>
    );
}

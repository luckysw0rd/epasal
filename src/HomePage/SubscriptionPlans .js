import React, { useState } from 'react';

const plans = {
    monthly: [
        {
            name: "Silver",
            price: 0,
            customization: "Advanced",
            products: 30,
            staff: 2,
            liveChat: false,
            analytics: "Basic",
            seo: "Basic",
            customDomain: false
        },
        {
            name: "Gold",
            price: 999,
            customization: "Advanced",
            products: 1000,
            staff: 5,
            liveChat: true,
            analytics: "Intermediate",
            seo: "Intermediate",
            customDomain: true,
            popular: true
        },
        {
            name: "Platinum",
            price: 1999,
            customization: "Advanced",
            products: 10000,
            staff: 10,
            liveChat: true,
            analytics: "Advanced",
            seo: "Advanced",
            customDomain: true
        }
    ],
    quarterly: [
        {
            name: "Silver",
            price: 0,
            customization: "Advanced",
            products: 30,
            staff: 2,
            liveChat: false,
            analytics: "Basic",
            seo: "Basic",
            customDomain: false
        },
        {
            name: "Gold",
            price: 1999,
            customization: "Advanced",
            products: 1000,
            staff: 5,
            liveChat: true,
            analytics: "Intermediate",
            seo: "Intermediate",
            customDomain: true,
            popular: true
        },
        {
            name: "Platinum",
            price: 4499,
            customization: "Advanced",
            products: 10000,
            staff: 10,
            liveChat: true,
            analytics: "Advanced",
            seo: "Advanced",
            customDomain: true
        }
    ],
    yearly: [
        {
            name: "Silver",
            price: 0,
            customization: "Advanced",
            products: 30,
            staff: 2,
            liveChat: false,
            analytics: "Basic",
            seo: "Basic",
            customDomain: false
        },
        {
            name: "Gold",
            price: 6999,
            customization: "Advanced",
            products: 1000,
            staff: 5,
            liveChat: true,
            analytics: "Intermediate",
            seo: "Intermediate",
            customDomain: true,
            popular: true
        },
        {
            name: "Platinum",
            price: 15999,
            customization: "Advanced",
            products: 10000,
            staff: 10,
            liveChat: true,
            analytics: "Advanced",
            seo: "Advanced",
            customDomain: true
        }
    ]
};

const getMonthlyEquivalent = (price, duration) => {
    switch (duration) {
        case 'quarterly':
            return price / 3;
        case 'yearly':
            return price / 12;
        default:
            return price;
    }
};

const getPercentageSavings = (monthlyPrice, durationPrice, duration) => {
    const fullPrice = monthlyPrice * (duration === 'quarterly' ? 3 : 12);
    const savings = fullPrice - durationPrice;
    return ((savings / fullPrice) * 100).toFixed(2);
};

const SubscriptionPlans = () => {
    const [duration, setDuration] = useState('monthly');

    return (
        <div className="bg-[#FFFFFF] font-Poppins py-12 px-4">
            <div className="max-w-[1200px] max-h-[1000px] mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Subscription Plans</h2>
                    <p className="text-lg text-gray-600 mt-2">Start Free, Upgrade as You Grow! Choose one that works for you the best.</p>
                    <div className="mt-4">
                        <button
                            className={`px-4 py-2 mx-2 rounded ${duration === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setDuration('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded ${duration === 'quarterly' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setDuration('quarterly')}
                        >
                            Quarterly
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded ${duration === 'yearly' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setDuration('yearly')}
                        >
                            Yearly
                        </button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    {plans[duration].map((plan, index) => {
                        const monthlyEquivalent = getMonthlyEquivalent(plan.price, duration);
                        const monthlyPlan = plans['monthly'].find(p => p.name === plan.name);
                        const savings = monthlyPlan.price > 0 ? (monthlyPlan.price * (duration === 'quarterly' ? 3 : 12) - plan.price) : 0;
                        const savingsPercentage = monthlyPlan.price > 0 ? getPercentageSavings(monthlyPlan.price, plan.price, duration) : 0;
                        const isDeal = duration !== 'monthly' && plan.name !== 'Silver' && (plan.name === 'Gold' || plan.name === 'Platinum');
                        const fullPrice = monthlyPlan.price * (duration === 'quarterly' ? 3 : 12);

                        return (
                            <div
                                key={index}
                                className={`flex-1 bg-white border rounded-lg shadow-lg overflow-hidden relative ${plan.popular ? 'border-green-500' : 'border-gray-200'}`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 mt-4 mr-4 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                                        POPULAR
                                    </div>
                                )}
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-extrabold text-gray-900 mb-4">Rs. {plan.price}</div>
                                    <p className="text-sm text-gray-600 mb-4">{duration.charAt(0).toUpperCase() + duration.slice(1)}</p>
                                    {isDeal && savings > 0 && (
                                        <div>
                                            <p className="text-sm text-green-600 font-semibold">Limited Deal! Save {savingsPercentage}%</p>
                                            <p className="text-sm text-gray-500 line-through">Original Price: Rs. {fullPrice}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-gray-50 p-6">
                                    <ul className="space-y-4 mb-6 text-gray-700">
                                        <li className="flex items-center justify-between">
                                            <span>Customization:</span>
                                            <span>{plan.customization}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span>Products:</span>
                                            <span>{plan.products}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span>Staff Accounts:</span>
                                            <span>{plan.staff}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span>Live Chat:</span>
                                            <span>{plan.liveChat ? '✔️' : '❌'}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span>Analytics:</span>
                                            <span>{plan.analytics}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span>SEO:</span>
                                            <span>{plan.seo}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span>Custom Domain:</span>
                                            <span>{plan.customDomain ? '✔️' : '❌'}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPlans;

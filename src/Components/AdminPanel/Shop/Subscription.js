import React, { useContext, useState } from 'react';
import esewa from '../../../Assets/esewa.webp';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { FaClock, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
            customDomain: false,
            limitedOffer: true,
            promoCode: false,
            Music: false
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
            popular: true,
            limitedOffer: true,
            promoCode: true,
            Music: false
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
            customDomain: true,
            limitedOffer: true,
            promoCode: true,
            Music: true

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
            customDomain: false,
            limitedOffer: true,
            promoCode: false,
            Music: false

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
            popular: true,
            limitedOffer: true,
            promoCode: true,
            Music: false

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
            customDomain: true,
            limitedOffer: true,
            promoCode: true,
            Music: true

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
            customDomain: false,
            limitedOffer: true,
            promoCode: false,
            Music: false

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
            popular: true,
            limitedOffer: true,
            promoCode: true,
            Music: false

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
            customDomain: true,
            limitedOffer: true,
            promoCode: true,
            Music: true
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

const SubscriptionPlans = ({ store }) => {

    const [duration, setDuration] = useState('monthly');
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext);

    const handleBuy = async (plan, selectedDuration) => {
        console.log(store);
        console.log(selectedDuration);
        console.log(plan);

        if (store.subscriptionStatus !== 'Silver') {
            toast.error('Wait for older subscription to expire')
            return;
        }
        const price = selectedDuration === 'monthly' ? plan.price :
            selectedDuration === 'quarterly' ? plan.price :
                plan.price;
        const data = {
            amount: price,
            duration: selectedDuration,
            payment_method: 'esewa',
            subscription: `${plan.name}`,
            store: store._id,
        };
        try {
            const responseData = await sendRequest(
                'payment/create',
                'POST',
                JSON.stringify({ data }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            console.log(responseData); // Handle response data as needed
            if (responseData.payment.payment_method === 'esewa') {
                esewaCall(responseData.formData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const esewaCall = (formData) => {
        console.log(formData);
        var path = process.env.REACT_APP_ESEWA_URL;

        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in formData) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", formData[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div className="bg-[#FFFFFF] font-Poppins py-12 px-4">
            <div className="max-w-[1200px] mx-auto">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                className={`bg-white rounded-lg shadow-lg overflow-hidden relative ${plan.popular ? 'border-2 border-green-500' : 'border border-gray-200'}`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 mt-4 mr-4 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                                        POPULAR
                                    </div>
                                )}
                                <div className={`p-6 ${plan.name === 'Silver' ? 'rounded-bl-lg' : 'border-t border-gray-300'}`}>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-extrabold text-gray-900 mb-4">Rs. {plan.price}</div>
                                    <p className="text-sm text-gray-600 mb-4">{duration.charAt(0).toUpperCase() + duration.slice(1)}</p>
                                    {isDeal && savings > 0 && (
                                        <div>
                                            <p className="text-sm text-green-600 font-semibold">Limited Deal! Save {savingsPercentage}%</p>
                                            <p className="text-sm text-gray-500 line-through">Original Price: Rs. {fullPrice}</p>
                                        </div>
                                    )}
                                    <ul className="space-y-4 mb-6 text-gray-700">
                                        <li className="flex items-center justify-between">
                                            <span>Customization:</span>
                                            <span>{plan.limitedOffer ? "Unlimited" : plan.customization}</span>
                                            {/* {plan.limitedOffer && (
                                                <div className="absolute -top-2 right-3 mt-2 mr-2 mb-2 flex items-center">
                                                    <FaStar className="text-orange-700" />
                                                    <span className="ml-1 text-xs text-orange-500 font-semibold">Limited Offer</span>
                                                </div>
                                            )} */}
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
                                        <li className="flex items-center justify-between">
                                            <span>Promo Code:</span>
                                            <span>{plan.promoCode ? '✔️' : '❌'}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span>Background Music</span>
                                            <span>{plan.Music ? '✔️' : '❌'}</span>
                                        </li>
                                    </ul>
                                    <div className="p-6 text-center">
                                        <button
                                            className="flex items-center justify-center mt-auto text-green-800 bg-gray-300 border-0 py-2 px-4 w-full focus:outline-none hover:text-white hover:bg-gray-700 rounded"
                                            onClick={() => handleBuy(plan, duration)}
                                        >
                                            <img src={esewa} alt="eSewa" className="font-Cinzel rounded-md w-20 h-10 mr-6" />
                                            <span className="relative right-1">Pay Now</span>
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-4 h-4"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                        <p className="text-xs text-gray-500 mt-3">Brought to you By Banau, Saika Nepal</p>
                                    </div>
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

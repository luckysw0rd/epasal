import React, { useContext, useState } from 'react';
import esewa from '../../../Assets/esewa.webp';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
const plans = [
    {
        name: 'Silver',
        price: 'Free',
        description: 'per month',
        features: [
            { name: 'Customization', value: 'Advanced', color: 'text-green-600' },
            { name: 'Products', value: 30, color: 'text-green-600' },
            { name: 'Staff Account (Role Based)', value: 2, color: 'text-green-600' },
            { name: 'Live Chat On Your Store', value: false, color: 'text-green-600' },
            { name: 'Analytics', value: 'Basic', color: 'text-green-600' },
            { name: 'Search Engine Optimization (SEO)', value: 'Basic', color: 'text-green-600' },
            { name: 'Custom Domain', value: false, color: 'text-green-600' },
        ],
    },
    {
        name: 'Gold',
        price: 'Rs 1000',
        description: '8500 per year',
        features: [
            { name: 'Customization', value: 'Advanced', color: 'text-indigo-600' },
            { name: 'Products', value: 1000, color: 'text-indigo-600' },
            { name: 'Staff Account (Role Based)', value: 5, color: 'text-indigo-600' },
            { name: 'Live Chat On Your Store', value: true, color: 'text-indigo-600' },
            { name: 'Analytics', value: 'Intermediate', color: 'text-indigo-600' },
            { name: 'Search Engine Optimization (SEO)', value: 'Intermediate', color: 'text-indigo-600' },
            { name: 'Custom Domain', value: true, color: 'text-indigo-600' },
        ],
    },
    {
        name: 'Platinum',
        price: 'Rs 2500',
        description: 'Only at 20,000 per Year',
        features: [
            { name: 'Customization', value: 'Advanced', color: 'text-blue-600' },
            { name: 'Products', value: '10,000', color: 'text-blue-600' },
            { name: 'Staff Account (Role Based)', value: 10, color: 'text-blue-600' },
            { name: 'Live Chat On Your Store', value: true, color: 'text-blue-600' },
            { name: 'Analytics', value: 'Advanced', color: 'text-blue-600' },
            { name: 'Search Engine Optimization (SEO)', value: 'Advanced', color: 'text-blue-600' },
            { name: 'Custom Domain', value: true, color: 'text-blue-600' },
        ],
    },
];

export default function Subscription({store}) {
    const [productName, setProductName] = useState("");
    const [productQuantity, setProductQuantity] = useState(1);
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext);


    const handleBuy = async (plan) => {
        console.log(store);
        console.log(plan.name);
        const data = {
            amount: 400,
            payment_method: 'esewa',
            subscription:'Gold',
            store:store._id,
        };
        try {
            const responseData = await sendRequest(
                'payment/create',
                'POST',
                JSON.stringify({
                    data
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            console.log(responseData); // Handle response data as needed
            if (responseData.payment.payment_method === 'esewa') {
                esewaCall(responseData.formData);
            }

        } catch (error) {
            // Check if the error message contains "user not verified" (case insensitive)
            console.log(error);
        }
    };


    const esewaCall = (formData) => {
        console.log(formData);
        var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

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
        <section className="text-gray-900 body-font overflow-hidden border-t border-gray-200">
            <div className="container px-5 py-8 mx-auto flex flex-wrap">
                <div className="lg:w-1/4 mt-48 hidden lg:block">
                    <div className="mt-px border-t border-gray-300 border-b border-l rounded-tl-lg rounded-bl-lg overflow-hidden">
                        {plans[0].features.map((feature, index) => (
                            <p key={index} className={`text-gray-900 h-12 text-center px-4 flex items-center justify-start ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                {feature.name}
                            </p>
                        ))}
                        <div className="text-center bg-gray-200 h-20 flex items-center justify-center border-t border-gray-300">
                            <p className="text-lg font-semibold">More Coming Soon</p>
                        </div>
                    </div>
                </div>
                <div className="flex lg:w-3/4 w-full flex-wrap lg:border border-gray-300 rounded-lg">
                    {plans.map((plan, planIndex) => (
                        <div
                            key={planIndex}
                            className={`lg:w-1/3 lg:mt-px w-full mb-10 lg:mb-0 plan-box relative transition-all duration-300 ease-in-out hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/50 hover:animate-shine ${plan.name === 'Gold' ? 'border-2 rounded-lg border-indigo-600 relative' : 'border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none'}`}
                        >
                            {plan.name === 'Gold' && <span className="bg-indigo-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>}
                            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
                                <h3 className="tracking-widest">{plan.name}</h3>
                                <h2 className="text-5xl text-gray-900 font-medium leading-none mb-4 mt-2">{plan.price}</h2>
                                <span className="text-sm text-gray-600">{plan.description}</span>
                            </div>
                            {plan.features.map((feature, featureIndex) => (
                                <div
                                    key={featureIndex}
                                    className={`flex flex-col md:flex-row md:items-center md:mx-auto md:justify-center items-center h-12 px-4 ${feature.color} ${featureIndex % 2 === 0 ? 'bg-gray-100' : ''} ${featureIndex !== 0 && 'border-t border-gray-300'}`}
                                >
                                    <span className="md:hidden">{feature.name}</span>
                                    <span>
                                        {typeof feature.value === 'boolean' ? (
                                            feature.value ? (
                                                <span className="w-5 h-5 inline-flex items-center justify-center bg-gray-200 text-green-600 rounded-full flex-shrink-0">
                                                    <svg
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="3"
                                                        className="w-3 h-3"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M20 6L9 17l-5-5"></path>
                                                    </svg>
                                                </span>
                                            ) : (
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.2"
                                                    className="w-5 h-5 text-red-400"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                                </svg>
                                            )
                                        ) : (
                                            feature.value
                                        )}
                                    </span>
                                </div>
                            ))}
                            <div className={`p-6 text-center ${plan.name === 'START' ? 'rounded-bl-lg' : 'border-t border-gray-300'}`}>
                                <button
                                    className="flex items-center justify-center space-x-10 mt-auto text-green-800 bg-gray-300 border-0 py-2 px-4 w-full focus:outline-none hover:text-white hover:bg-gray-700 rounded"
                                    onClick={() => handleBuy(plan)}
                                >
                                    <img src={esewa} alt="eSewa" className="font-Cinzel rounded-md w-20 h-10 mr-6" />
                                    <span className='  relative right-10 '>Pay Now</span>
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
                    ))}
                </div>
            </div>
        </section>
    );
}

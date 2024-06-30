import React, { useContext, useState } from 'react';
import esewa from '../../../Assets/esewa.webp';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';

const plans = [
    {
        name: 'Silver',
        priceMonthly: 0,
        priceQuarterly: 0,
        priceYearly: 0,
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
        priceMonthly: 999,
        priceQuarterly: 1999,
        priceYearly: 6999,
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
        priceMonthly: 1999,
        priceQuarterly: 4499,
        priceYearly: 15999,
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

export default function Subscription({ store }) {
    const [selectedDurations, setSelectedDurations] = useState(plans.map(() => 'monthly'));
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext);

    const handleBuy = async (plan, duration) => {
        console.log(store);
        console.log(duration);
        console.log(plan);

        const price = duration === 'monthly' ? plan.priceMonthly :
            duration === 'quarterly' ? plan.priceQuarterly : plan.priceYearly;
        const data = {
            amount: price,
            duration: duration,
            payment_method: 'esewa',
            subscription: `${plan.name}`,
            store: store._id,
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

    const handleDurationChange = (index, duration) => {
        const updatedDurations = [...selectedDurations];
        updatedDurations[index] = duration;
        setSelectedDurations(updatedDurations);
    };

    return (
        <section className="text-gray-900 body-font overflow-hidden border-t border-gray-200">
            <div className="container  py-8 mx-auto flex flex-wrap">
                <div className="lg:w-[300px] mt-48 hidden lg:block">
                    <div className="mt-[10px]  border-t border-gray-300 border-b border-l rounded-tl-lg rounded-bl-lg overflow-hidden">
                        <p className={`text-white h-12 text-center px-4 flex items-center justify-start bg-gray-800 `}>
                            Time Frame
                        </p>
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
                <div className="flex w-screen  space-x-0 md:w-screen lg:w-[500px] xl:w-[700px] 2xl:w-[1230px] 3xl:w-[1200px]  flex-wrap lg:border border-gray-300 rounded-lg">
                    {plans.map((plan, planIndex) => (
                        <div
                            key={planIndex}
                            className={`lg:w-1/3 px-2  lg:mt-px w-full mb-10 lg:mb-0 plan-box relative transition-all duration-300 ease-in-out hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/50 hover:animate-shine ${plan.name === 'Gold' ? 'border-2 rounded-lg border-indigo-600 relative' : plan.name === 'Silver' ? 'border-2   rounded-lg lg:rounded-none' : ''}`}
                        >
                            {plan.name === 'Gold' && <span className="bg-indigo-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>}
                            {/* {plan.name === 'Silver' && <span className="bg-yellow-600 border-yellow-400 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>}
                            {plan.name === 'Platinum' && <span className="bg-indigo-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>} */}

                            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
                                <h3 className="tracking-widest">{plan.name}</h3>
                                <h2 className="text-5xl text-gray-900 font-medium leading-none mb-4 mt-2">
                                    Rs {selectedDurations[planIndex] === 'monthly' ? plan.priceMonthly :
                                        selectedDurations[planIndex] === 'quarterly' ? plan.priceQuarterly : plan.priceYearly}
                                </h2>
                                <span className="text-sm text-gray-600">
                                    {selectedDurations[planIndex] === 'monthly' ? 'per month' :
                                        selectedDurations[planIndex] === 'quarterly' ? 'per quarter' : 'per year'}
                                </span>
                            </div>
                            <div className="flex justify-center my-4">
                                <label className="flex items-center space-x-2">
                                    <select
                                        name={`duration-${planIndex}`}
                                        value={selectedDurations[planIndex]}
                                        onChange={(e) => handleDurationChange(planIndex, e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="monthly">Monthly</option>
                                        <option value="quarterly">Quarterly</option>
                                        <option value="yearly">Yearly</option>
                                    </select>
                                </label>
                            </div>

                            {plan.features.map((feature, featureIndex) => (
                                <div
                                    key={featureIndex}
                                    className={`flex  flex-col md:flex-row md:items-center md:mx-auto md:justify-center items-center h-12 px-4 ${feature.color} ${featureIndex % 2 === 0 ? 'bg-gray-100' : ''} ${featureIndex !== 0 && 'border-t border-gray-300'}`}
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
                            <div className={`p-6 text-center ${plan.name === 'Silver' ? 'rounded-bl-lg' : 'border-t border-gray-300'}`}>
                                <button
                                    className="flex items-center justify-center space-x-10 mt-auto text-green-800 bg-gray-300 border-0 py-2 px-4 w-full focus:outline-none hover:text-white hover:bg-gray-700 rounded"
                                    onClick={() => handleBuy(plan, selectedDurations[planIndex])}
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

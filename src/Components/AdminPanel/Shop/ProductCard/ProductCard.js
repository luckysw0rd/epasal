import React, { useState } from 'react';
import cosmetic from '../../../../Assets/cosmetic.webp';
import esewa from '../../../../Assets/esewa.webp';
import useFetch from '../../../../Hooks/useFetch';
const ProductCard2 = () => (
    <div className="w-62 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
            <img
                src="https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="Product"
                className="h-60 w-full object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                <p className="text-lg font-bold text-black truncate block capitalize">Modern Minimalistic</p>
                <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3"> Rs 149</p>
                    <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2"> Rs 199</p>
                    </del>
                    <div className="ml-[100px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-bag-plus"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                            />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </a>
    </div>
);

const ProductCard3 = () => (
    <div className="product-card w-62  rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
        <div className="para uppercase text-center leading-none z-40">
            <p
                style={{
                    WebkitTextStroke: "1px rgb(207, 205, 205)",
                    WebkitTextFillColor: "transparent",
                }}
                className="z-10 font-bold text-lg -mb-5 tracking-wider text-gray-500"
            >
                New Product
            </p>
            <p className="font-bold text-xl tracking-wider text-[#495c48] z-30">
             Slider 
            </p>
        </div>
        <div
            className="w-[180px] aspect-square relative z-20 after:absolute after:h-1 after:w-full flex justify-center flex-col items-center after:opacity-0 after:bg-[#7b956a] after:top-8 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full flex justify-center flex-col items-center after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300"
        >
            <img
                src={cosmetic}
                alt="Product"
                className="object-cover w-full flex justify-center flex-col items-center h-full flex justify-center flex-col items-center"
            />
            <div
                className="tooltips absolute top-0 left-10 -translate-x-[150%] p-2 flex flex-col items-start gap-10 transition-all duration-300 group-hover:-translate-x-full flex justify-center flex-col items-center"
            >
                <p
                    className="text-[#7b956a] pl-2 font-semibold text-xl uppercase group-hover:delay-1000 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                >
                    Toner
                </p>
                <ul className="flex flex-col items-start gap-2">
                    <li
                        className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                    >
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="3"
                            className="stroke-[#495c48]"
                            stroke="#000000"
                            fill="none"
                            viewBox="0 0 24 24"
                            height="10"
                            width="10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-xs break-words font-semibold  text-[#495c48]">          l orem lorem lorem loremlorem loremasdasldjsadlorem loremasdkajdaskldalorem loremasdsadasdasd</p>
                    </li>
     
                </ul>
            </div>
        </div>
        <div className="flex flex-col items-center mt-2">
            <p className="text-lg font-semibold text-black">Rs 149</p>
            <del className="ml-2 text-gray-600"> Rs 500</del>
        </div>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-full flex justify-center flex-col items-center hover:bg-blue-600 duration-300 mt-4">
            Add to Cart
        </button>
    </div>
);

const productCardsArray = [<ProductCard2 />, <ProductCard3 />]; // Add more as needed
const productInfo = [{
    name: 'Modern Minimalistic',
    price: 150,
},
{
    name: 'Slider',
    price: 400,
}
]


export default function ProductCards({ store }) {
    const { isLoading, error, sendRequest, onCloseError } = useFetch();

    const handleBuyNow = async (cardNumber) => {
        // Function to handle the purchase action with this card's details
        const data = {
            skin: {
                skinType: 'Card',
                name: productInfo[cardNumber].name,
            },
            amount: productInfo[cardNumber].price,
            payment_method: 'esewa',
            store: store._id,
        };
        const success_url = process.env.REACT_APP_BASE_URL+'/esewa/skin';
        try {
            const responseData = await sendRequest(
                'payment/create',
                'POST',
                JSON.stringify({
                    data, success: success_url
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

    return (
        <div className="container  mx-auto px-5 py-8 flex flex-wrap">
            <div className="product-list flex  flex-wrap gap-4">
                {productCardsArray.map((card, index) => (
                    <>
                        <div className=' flex flex-col'>
                            <React.Fragment key={index}>{card}</React.Fragment>
                            <div>
                                <button
                                    className="flex items-center justify-center space-x-5 mt-auto text-green-800 bg-gray-300 border-0 py-2 px-4 w-full focus:outline-none hover:text-white hover:bg-gray-700 rounded"
                                    onClick={() => handleBuyNow(index)}
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
                                </button></div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}


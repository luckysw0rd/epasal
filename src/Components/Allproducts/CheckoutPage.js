import React, { useState, useEffect, useContext } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import useFetch from '../../Hooks/useFetch';
import { AuthContext } from '../../Hooks/AuthContext';
import PaymentConfirmation from '../CheckoutPage/PaymentConfirmation';
import { toast } from 'react-toastify';
const CheckoutPage = ({ cart, onClose, deleteItem, store, setStore }) => {
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const [promoCode, setPromoCode] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const expectedDeliveryPrice = store?.expectedDeliveryPrice || 10;
    const [discount, setDiscount] = useState(0);
    const [orderResponse, setOrderResponse] = useState(null);
    const auth = useContext(AuthContext);

    const totalAmount = cart.reduce((total, item) => total + item.price * item.count, 0) + expectedDeliveryPrice - discount;

    const UnderlineSVG = () => (
        <svg className="w-full h-2 absolute bottom-0" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5H100" stroke="#3B82F6" strokeWidth="2" />
        </svg>
    );
    useEffect(() => {
        if (cart.length === 0) {
            onClose();
        }
    }, [cart, onClose]);

    const handleApplyCode = () => {
        alert(`Promo code ${promoCode} applied!`);
    };


    const handleDeleteFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setStore(prevState => ({ ...prevState, cart: updatedCart }));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const esewaCall = (formData) => {
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

    const handleSubmitOrder = async () => {
        console.log(cart);
        const orderData = {
            fullName,
            phoneNumber,
            email,
            status: 'Processing',
            cart: cart.map(item => ({
                product: item.product,
                productName: item.prodproductName,
                price: item.price,
                discountAmount: discount,
                count: item.count,
                selectedVariant: item.selectedVariant,
            })),
            price: cart.reduce((total, item) => total + item.price * item.count, 0),
            deliveryCharge: expectedDeliveryPrice,
            promoCode,
            promoDiscount: discount,
            totalPrice: totalAmount,
            address,
            landmark,
            paymentMethod: selectedPayment || 'CashOnDelivery',
            esewaTransactionID: null,
            deliveryCode: null,
        };
        const success_url = 'http://localhost:3000/esewa/order';
        console.log(orderData);
        try {
            console.log(store);
            const responseData = await sendRequest(
                'order/create/' + store._id,
                'POST',
                JSON.stringify({ orderData, success: success_url }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            toast.success(responseData.message || "Order made")
            console.log(responseData);
            if (responseData?.payment?.paymentMethod === 'esewa' || responseData?.paymentMethod === 'esewa') {
                esewaCall(responseData.formData);
            }
            if (responseData.paymentMethod === 'CashOnDelivery') {
                setOrderResponse(responseData);
            }
        } catch (error) {
            toast.error(error.message || "Error Creating Order")

            console.log(error);
        }
    };

    const paymentOptions = [
        { id: 'esewa', label: 'esewa', src: 'https://cdn.esewa.com.np/ui/images/esewa_og.png?111https://www.nopbooster.com/images/thumbs/0000090_esewa-payment-plugin.webp' },
        // { id: 'khalti', label: 'Khalti', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Khalti_Digital_Wallet_Logo.png.jpg/640px-Khalti_Digital_Wallet_Logo.png.jpg' },
        { id: 'cod', label: 'CashOnDelivery', src: 'https://cdn-icons-png.flaticon.com/512/1554/1554401.png' },
    ];

    if (orderResponse) {
        return <PaymentConfirmation order={orderResponse} onClose={onClose} />;
    }

    return (
        <div className="fixed font-Roboto  inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 overflow-auto">
            <div className="relative w-[1200px] p-4 mt-24 flex flex-col lg:flex-row gap-4 bg-white shadow-md rounded-md max-h-full overflow-auto">
                <IoCloseCircleOutline
                    size={24}
                    className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                />
                <div className="lg:w-2/5 p-4 bg-gray-100 rounded-md shadow-md">
                    <h1 className="text-2xl text-center font-bold mb-4 py-2 rounded-lg">CheckoutPage</h1>
                    <div className="flex flex-col h-full overflow-auto">
                        <div className=' border-b-2 border-gray-500 '>
                            <h2 className="text-xl font-bold mb-2">Cart Items</h2>
                            {cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <div className="flex   items-center justify-between mb-4" key={index}>
                                        <div className="flex max-w-[250px] items-center">
                                            <div>
                                                <p className="font-semibold">{item.productName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-xl flex-1 justify-between">
                                            <span className="mx-auto text-center">{item.count}</span>
                                            <span className='mr-4 '>रु {item.price}</span>
                                            <IoCloseCircleOutline size={20} onClick={() => handleDeleteFromCart(index)} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No items in the cart.</p>
                            )}
                        </div>
                        <div className="flex mt-4">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Promo code"
                                className="border border-gray-300 rounded-md px-4 py-1 mr-3 w-2/5 placeholder-center"
                            />
                            <button
                                onClick={handleApplyCode}
                                className="bg-gray-700 text-white rounded-md px-6 py-1 ml-auto sm:px-3 sm:py-1"
                            >
                                <span className="hidden sm:inline">Apply Promo Code</span>
                                <span className="inline sm:hidden">Apply</span>
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <p className="text-sm font-medium">Delivery Charge</p>
                                <p className="text-sm">रु {expectedDeliveryPrice}</p>
                            </div>
                            <div className="flex justify-between mt-8">
                                <p className="text-sm font-medium">Discount</p>
                                <p className="text-sm">-रु {discount}</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between font-bold">
                                <p className="text-lg">Total Amount</p>
                                <p className="text-lg">रु {totalAmount}</p>
                            </div>
                            <button
                                onClick={handleSubmitOrder}
                                className="w-full bg-gray-700 text-white rounded-md px-6 py-1 ml-auto sm:px-3 sm:py-1 mt-4"
                            >
                                <span className="hidden sm:inline">Submit Order</span>
                                <span className="inline sm:hidden">Submit</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/5  p-4">
                    <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                    <form className="space-y-4 ">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="fullName" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                        <hr className="my-6 border-gray-400 border-t-2 w-full" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Nearby Landmark</label>
                                <input type="text" id="landmark" name="landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                        <hr className="my-6 border-gray-400 border-t-2 w-full" />
                        <p className="text-lg font-semibold mb-2">Payment Options</p>
                        <div className="flex md:flex-row sm:flex-row gap-2 mb-10">
                            {paymentOptions.map(option => (
                                <div
                                    key={option.id}
                                    className={` w-[80px]  relative h-[60px] mr-4  object-contain border border-gray-100 rounded-md mb-4 sm:w-1/6 sm:self-center cursor-pointer ${selectedPayment === option.label ? 'border-2 border-blue-500' : 'border-gray-900'
                                        } ${option.label === 'esewa' ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => setSelectedPayment(option.label)}
                                >
                                    <img src={option.src} alt={option.label} className="  h-full w-full" />
                                    {option.label === 'esewa' && (
                                        <span className="absolute top-0 right-0 px-1 bg-blue-500 text-white text-xs font-semibold rounded-bl-md">Popular</span>
                                    )}
                                    {selectedPayment === option.label && <UnderlineSVG className='w-[800px]' />}
                                    <h3 className=' font-md text-center'>{option.label}</h3>
                                </div>
                            ))}
                        </div>


                    </form>
                    <div className="mt-16 text-sm font-semibold text-center text-gray-600">
                    <p>
                        &copy; Brought To You By <a href="/" target="_blank" className=" underline hover:text-orange-200">Shop At Banau</a>, By <a href="https://www.saikanepal.com" target="_blank" className=" underline hover:text-blue-300">Saika Nepal</a> @ {new Date().getFullYear()}
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

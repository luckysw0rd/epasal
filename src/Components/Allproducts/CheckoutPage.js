import React, { useState, useEffect, useContext } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import useFetch from '../../Hooks/useFetch';
import { AuthContext } from '../../Hooks/AuthContext';
import PaymentConfirmation from '../CheckoutPage/PaymentConfirmation';
import { toast } from 'react-toastify';
import Loading from "../Loading/Loading"
import io from 'socket.io-client'
const CheckoutPage = ({ cart, onClose, deleteItem, store, setStore }) => {
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const [promoCode, setPromoCode] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('esewa');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const expectedDeliveryPrice = store?.expectedDeliveryPrice || 10;
    const [discount, setDiscount] = useState(0);
    const [orderResponse, setOrderResponse] = useState(null);
    const [isOrderSubmit, setIsOrderSubmit] = useState(false)
    const auth = useContext(AuthContext);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.count, 0)
    const totalAmount = totalPrice - totalPrice * (discount / 100) + expectedDeliveryPrice

    const UnderlineSVG = () => (
        <svg className="w-full  h-2 absolute bottom-0" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5H100" stroke="#3B82F6" strokeWidth="2" />
        </svg>
    );
    useEffect(() => {
        if (cart.length === 0) {
            onClose();
        }
    }, [cart, onClose]);

    const handleApplyCode = async () => {
        if (promoCode == "")
            toast.error("Please provide promo code")
        else {

            try {

                const responseData = await sendRequest(
                    'store/applypromocode',
                    'POST',
                    JSON.stringify({ promoCode, id: store?._id }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token,
                    }
                );

                setDiscount(responseData?.discount)
                toast.success("Promo code applied")

            }
            catch (err) {
                toast.error(err.message)
            }
        }


    };


    const handleDeleteFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setStore(prevState => ({ ...prevState, cart: updatedCart }));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const esewaCall = (formData) => {

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

    const socketConnection = () => {
        const socket = io(process.env.REACT_APP_BACKEND_URL_NOAPI);
        socket.on('connect', () => {
            socket.emit("notification", { message: true, name: store.name, isAdmin: false })
            socket.disconnect();
        });
    }
    useEffect(() => {
        if (isOrderSubmit) {
            console.log("connection created");
            socketConnection()
        }
    }, [isOrderSubmit])

    const handleSubmitOrder = async () => {

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
        const success_url = process.env.REACT_APP_BASE_URL + '/esewa/order';

        try {

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
            setIsOrderSubmit(true)


            console.log(responseData);
            if (responseData?.payment?.paymentMethod === 'esewa' || responseData?.paymentMethod === 'esewa') {
                esewaCall(responseData.formData);
            }
            if (responseData.paymentMethod === 'CashOnDelivery') {
                setOrderResponse(responseData);
            }
        } catch (error) {
            toast.error(error.message || "Error Creating Order")


        }
    };

    const paymentOptions = [
        { id: 'esewa', label: 'esewa', src: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp', alternate: 'Esewa' },
        // { id: 'khalti', label: 'Khalti', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Khalti_Digital_Wallet_Logo.png.jpg/640px-Khalti_Digital_Wallet_Logo.png.jpg' },
        { id: 'cod', label: 'CashOnDelivery', src: 'https://cdn-icons-png.flaticon.com/512/6491/6491490.png', alternate: 'COD' },
    ];

    if (orderResponse) {
        return <PaymentConfirmation order={orderResponse} onClose={onClose} />;
    }

    return (
        isLoading ? <Loading /> :
            <div className="fixed font-Poppins overflow-y-scroll  inset-0 flex items-center justify-center bg-gray-400 bg-opacity-75 w-full h-full z-50 overflow-auto">
                <div className="relative w-[1200px]   flex flex-col justify-center items-center lg:flex-row gap-4 bg-white  rounded-md max-h-full overflow-auto ">
                    <IoCloseCircleOutline
                        size={24}
                        className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-gray-900"
                        onClick={onClose}
                    />

                    <div className="max-w-[452px] w-full p-8 bg-white border-2 border-gray-300 rounded-md h-full min-h-[650px] overflow-auto">

                        <h1 className=" font-Saira text-xl text-start font-bold mb-2 py-2 rounded-lg border-b-2 border-r-0 pl-2">Checkout</h1>
                        <div className="flex flex-col h-full overflow-auto p-4 border-b-0">
                            <div className="border-b-2 border-gray-500 mb-4">
                                <h2 className="text-lg text-[#767676] font-bold mb-4">Items</h2>
                                {cart.length > 0 ? (
                                    cart.map((item, index) => (
                                        <div
                                            className="flex items-center justify-between mb-4 p-4 bg-white shadow-md rounded-lg"
                                            key={index}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={item?.selectedVariant[0]?.options?.image || item?.productImage}
                                                    alt={item.productName}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-[10px] sm:text-lg">{item.productName}</p>
                                                    {item.selectedVariant?.length > 0 && (
                                                        <p><strong className='  text-[8px] '>Selected Variants:</strong>


                                                            <p className=' text-[10px]'> {item.selectedVariant.map(variant => `${variant.name}: ${variant.options.name}`).join(', ')}</p></p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-gray-500 pr-6"> x {item.count}</span>
                                                <span className="text-gray-800 font-semibold">रु {item.price}</span>
                                                {/* Remove button */}
                                                {/* <button onClick={() => handleDeleteFromCart(index)}>
                                                    <span className="text-gray-500 hover:text-red-500">×</span>
                                                </button> */}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No items in the cart.</p>
                                )}
                            </div>

                            <div className="flex justify-between items-center mt-4 gap-2">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    onWheel={(e) => e.target.blur()}
                                    placeholder="Promo code"
                                    className=" h-[35px] w-[220px] border border-gray-300 rounded-md px-4 py-2 placeholder-center"
                                />
                                <button
                                    onClick={handleApplyCode}
                                    className=" flex justify-center items-center bg-[#4D4D4D]  text-[12px] text-white rounded-md text-center py-2  w-[144px]  h-[35px] text-center"
                                >
                                    Apply Promo
                                </button>
                            </div>

                            <div className="mt-6 ">
                                <div className=' flex flex-col space-y-4'>
                                    <div className="flex justify-between text-sm font-medium">
                                        <p>Delivery Charge</p>
                                        <p>रु {expectedDeliveryPrice}</p>
                                    </div>
                                    <div className="flex justify-between text-sm font-medium mt-2">
                                        <p>Promo Discount</p>
                                        <p>-रु {totalPrice * (discount / 100)}</p>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between text-lg font-bold">
                                    <p>Total</p>
                                    <p>रु {totalAmount}</p>
                                </div>

                            </div>
                        </div>


                    </div>
                    <div className="lg:w-3/5 w-full p-8 bg-white border-2 my-10 border-gray-300 rounded-md h-full  overflow-auto">
                        <h2 className="text-[16px] font-bold mb-4">Contact Information</h2>
                        <form className="space-y-4 ">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="block text-[12px] font-medium text-gray-400"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm bg-gray-100 text-gray-600 focus:outline-none focus:ring-0 focus:border-gray-400 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phoneNumber"
                                        className="block text-[12px]  font-medium text-gray-400"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm bg-gray-100 text-gray-600 focus:outline-none focus:ring-0 focus:border-gray-400 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-[12px]  font-medium text-gray-400"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm bg-gray-100 text-gray-600 focus:outline-none focus:ring-0 focus:border-gray-400 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <hr className="my-6 border-gray-200 border-t-2 w-full" />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-[12px] font-medium text-gray-400"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm bg-gray-100 text-gray-600 focus:outline-none focus:ring-0 focus:border-gray-400 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="landmark"
                                        className="block text-[12px] font-medium text-gray-400"
                                    >
                                        Nearby Landmark
                                    </label>
                                    <input
                                        type="text"
                                        id="landmark"
                                        name="landmark"
                                        value={landmark}
                                        onChange={(e) => setLandmark(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm bg-gray-100 text-gray-600 focus:outline-none focus:ring-0 focus:border-gray-400 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <hr className="my-6 border-gray-400 border-t-2 w-full" />
                            <p className="text-[16px] font-semibold mb-2">Payment Options</p>
                            <div className="flex flex-row gap-6 mb-10">
                                {paymentOptions.map(option => (
                                    <div
                                        key={option.id}
                                        className={`w-[100px] h-[100px] flex flex-col justify-center items-center border rounded-md cursor-pointer ${selectedPayment === option.label ? 'border-2 border-blue-600' : 'border-gray-300'}`}
                                        onClick={() => setSelectedPayment(option.label)}
                                    >
                                        <img src={option.src} alt={option.label} className="w-[72px] h-[72px] p-2 mt-2 object-contain" />
                                        {option.label === 'esewa' && (
                                            <span className="relative bottom-16 left-6 px-1 bg-blue-500 text-white text-xs font-semibold rounded-bl-md">Popular</span>
                                        )}
                                        <h3 className="text-[12px] font-medium  text-center">{option.alternate}</h3>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleSubmitOrder}
                                className="w-full bg-[#4D4D4D] text-white rounded-md px-6 py-2 mt-4"
                            >
                                Submit Order
                            </button>

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

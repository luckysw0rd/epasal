import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IoCloseCircleOutline } from "react-icons/io5";

const PaymentConfirmation = ({ order, onClose }) => {

    useEffect(() => {
        console.log(order);
    }, [order]);

    const handleDownloadPDF = () => {
        const input = document.getElementById('details-wrapper');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('order-details.pdf');
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 overflow-auto">
            <div className="relative p-4 mt-24 flex flex-col bg-white shadow-md rounded-md max-h-full overflow-auto">
                {/* Close button */}
                <IoCloseCircleOutline
                    size={24}
                    className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                />
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
                    <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                        <div className="flex justify-center mb-5">
                            <div className="bg-green-100 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-16 h-16 text-green-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Order Successful</h1>
                        <p className="text-gray-700 mb-6">Your order has been placed successfully. Here are your order details:</p>
                        <div id="details-wrapper">
                            {order && (
                                <div id="updated-order-details" className="bg-gray-50 p-4 rounded-lg mb-4 border-t border-gray-200">
                                    <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                                    <div className="text-left">
                                    <p><strong>Order ID :</strong>{order?._id}</p>

                                        <p><strong>Full Name:</strong> {order.fullName}</p>
                                        <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
                                        <p><strong>Email:</strong> {order.email}</p>
                                        <p><strong>Store ID:</strong> {order.store}</p>
                                        <p><strong>Status:</strong> {order.status}</p>
                                        <h3 className="text-lg font-semibold mt-4">Cart Items:</h3>
                                        <ul className="list-disc list-inside">
                                            {order.cart?.map(item => (
                                                <li key={item._id} className="ml-4">
                                                    <p><strong>Product Name:</strong> {item.productName}</p>
                                                    <p><strong>Price:</strong> {item.price}</p>
                                                    <p><strong>Count:</strong> {item.count}</p>
                                                    {item.selectedVariant?.length > 0 && (
                                                        <p><strong>Selected Variants:</strong> {item.selectedVariant.map(variant => `${variant.name}: ${variant.options.name}`).join(', ')}</p>
                                                    )}
                                                </li>
                                            )) ?? <li>No items in the cart</li>}
                                        </ul>
                                        <p><strong>Price:</strong> {order.price}</p>
                                        <p><strong>Delivery Charge:</strong> {order.deliveryCharge}</p>
                                        <p><strong>Promo Discount:</strong> {order.promoDiscount}</p>
                                        <p><strong>Total Price:</strong> {order.totalPrice}</p>
                                        <p><strong>Address:</strong> {order.address}</p>
                                        <p><strong>Landmark:</strong> {order.landmark}</p>
                                        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                        <p className=' text-xl font-bold'><strong>DELIVERY CODE:</strong> {order.deliveryCode}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-gray-700 text-white rounded-md px-6 py-2 mt-4"
                        >
                            Download PDF
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-700 text-white rounded-md px-6 py-2 mt-4 ml-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmation;

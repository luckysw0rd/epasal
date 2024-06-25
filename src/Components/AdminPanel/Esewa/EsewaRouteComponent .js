import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const EsewaRouteComponent = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const [parsedData, setParsedData] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const location = useLocation();
    const { field } = useParams();

    const updateStoreSubscription = async (data) => {
        try {
            console.log("Data to be sent:", data);
            const responseData = await sendRequest(
                'store/upgrade/storeSubscription/' + data.transaction_uuid, // Ensure the correct endpoint
                'PATCH',
                JSON.stringify(data),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            console.log("Response data:", responseData);
            setIsSuccess(true);
        } catch (error) {
            console.error("Error message:", error.message);
            console.error("Error details:", error);
        }
    };

    const updateStoreSkin = async (data) => {
        try {
            console.log("Data to be sent:", data);
            const responseData = await sendRequest(
                'store/upgrade/storeSkin/' + data.transaction_uuid, // Ensure the correct endpoint
                'PATCH',
                JSON.stringify(data),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            console.log("Response data:", responseData);
            setIsSuccess(true);
        } catch (error) {
            console.error("Error message:", error.message);
            console.error("Error details:", error);
        }
    };

    const updateOrder = async (data) => {
        try {
            console.log("Data to be sent:", data);
            const responseData = await sendRequest(
                'store/upgrade/storeSkin/' + data.transaction_uuid, // Ensure the correct endpoint
                'PUT',
                JSON.stringify({status:'Confirmed'}),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            console.log("Response data:", responseData);
            setIsSuccess(true);
        } catch (error) {
            console.error("Error message:", error.message);
            console.error("Error details:", error);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const data = queryParams.get('data');

        if (data) {
            // Decode the base64 encoded string
            const decodedData = atob(data);
            // Parse the decoded JSON string
            const parsedJson = JSON.parse(decodedData);
            setParsedData(parsedJson);
            console.log("Parsed data:", parsedJson);
            console.log("Field:", field);

            if (field === "subscription" && parsedJson) {
                console.log("subscription now...");
                updateStoreSubscription(parsedJson);
            }

            if (field === 'skin' && parsedJson) {
                console.log("skin update");
                updateStoreSkin(parsedJson);
            }

            if (field === 'order' && parsedJson) {
                console.log("order update");
                updateOrder(parsedJson);
            }
        }
    }, [location.search, field]);

    const downloadPDF = async () => {
        const input = document.getElementById('transaction-details');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), 0);
            pdf.save('transaction-details.pdf');
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                {isSuccess ? (
                    <div>
                        <div className="flex justify-center mb-5">
                            <div className="bg-green-100 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-16 h-16 text-green-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
                        <p className="text-gray-700 mb-6">Your subscription has been activated. You can now access all the features of our SaaS product.</p>
                        {parsedData.total_amount && parsedData.transaction_uuid && (
                            <div id="transaction-details" className="bg-gray-50 p-4 rounded-lg mb-4 border-t border-gray-200">
                                <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
                                <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
                                    <span className="text-gray-800 font-medium">Amount:</span>
                                    <span className="text-gray-900">{parsedData.total_amount}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="text-gray-800 font-medium">Transaction ID:</span>
                                    <span className="text-gray-900">{parsedData.transaction_uuid}</span>
                                </div>
                                {/* Add more details if available in parsedData */}
                            </div>
                        )}
                        <div className=' w-full gap-4 flex flex-row space-x-5 justify-center'>
                            <button
                                onClick={downloadPDF}
                                className="bg-blue-500 text-white px-4 py-2  rounded-md shadow-md hover:bg-blue-600 transition duration-300 mb-4"
                            >
                                Download PDF
                            </button>
                            <Link to="/" className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300 mb-4">
                                Go to Homepage
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Processing Payment...</h2>
                        {isLoading && <p className="text-blue-500">Loading...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EsewaRouteComponent;

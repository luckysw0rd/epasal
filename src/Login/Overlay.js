import React, { useEffect, useState, useContext } from 'react';
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../Hooks/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Overlay = ({ email, setShowOverlay }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const responseData = await sendRequest(
                'users/verify',
                'POST',
                JSON.stringify({
                    email: email,
                    verificationCode: verificationCode
                }),
                {
                    'Content-Type': 'application/json'
                }
            );

            if (responseData && responseData.message) {
                console.log(responseData);
                auth.login(responseData.user.id, responseData.token);
                toast.success('Verification Successfull')
                navigate('/');

            } else {
                console.error('Unexpected response format:', responseData);
            }
        } catch (error) {
            console.log("here");
            console.error(error.message || 'An error occurred during login');
            toast.error(error.message || 'verfication failed');
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-md">
                <button className="absolute top-30 -mt-5 ml-36 left-1/2 text-gray-600 hover:text-gray-800" onClick={() => setShowOverlay(false)}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl font-semibold mb-4">Enter Verification Code</h2>
                <h2 className="text-sm  text-yellow-500 font-semibold mb-4">OTPS May take upto 10 minutes to arrive</h2>
                <h2 className="text-sm font-semibold mb-4 text-green-400">Or you may contact an agent via the live chat for verification</h2>


                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Verification Code"
                        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Overlay;

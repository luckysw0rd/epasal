import React, { useState, useContext, useEffect } from 'react';
import useFetch from '../Hooks/useFetch';
import Overlay from './Overlay';
import { AuthContext } from '../Hooks/AuthContext';
import Loading from "../Components/Loading/Loading";
import { toast } from 'react-toastify';
import { FaDiscord, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const SignInPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [showOverlay, setShowOverlay] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [canResendOTP, setCanResendOTP] = useState(true);
    const [isPolicyChecked, setIsPolicyChecked] = useState(false)
    const [timer, setTimer] = useState(0);
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (window.location.pathname === '/login') {
            abc();
        }
    }, [window.location.pathname]);

    useEffect(() => {
        const lastSentTime = localStorage.getItem('otpLastSentTime');
        if (lastSentTime) {
            const timePassed = Date.now() - parseInt(lastSentTime, 10);
            if (timePassed < 2 * 60 * 1000) {
                setCanResendOTP(false);
                setTimeout(() => {
                    setCanResendOTP(true);
                }, 2 * 60 * 1000 - timePassed);
            }
        }
    }, []);

    useEffect(() => {
        let interval;
        if (!canResendOTP) {
            interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        setCanResendOTP(true);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [canResendOTP]);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z]).{8,}$/;
        return re.test(password);
      };

    const handleSignIn = async (e) => {
        try {
            console.log(process.env.REACT_APP_BACKEND_URL + 'users/signin');
            const responseData = await sendRequest(
                'users/signin',
                'POST',
                JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            console.log(responseData); // Handle response data as needed

            auth.login(responseData.user.id, responseData.token);
            toast('Sign In successful');
            window.location.href = "/";

        } catch (error) {
            console.log(error.message);
            if (error?.message === 'User not verified') {
                toast.warn("OTP sent to email address , please verify yourself");
                setShowOverlay(true);
            } else {
                toast.error(error.message || "Sign In Failure");
                console.error('Sign-in request failed:', error);
            }
        }
    };

    const handleSignUp = async (e) => {
        try {
            e.preventDefault();
            if (!validatePassword(formData.password)) {
                toast.error('Password must be at least 8 characters long and contain at least one uppercase letter.');
                return;
            }
            const responseData = await sendRequest(
                'users/signup',
                'POST',
                JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                }),
                {
                    'Content-Type': 'application/json'
                }
            );

            if (responseData && responseData.message) {
                console.log(responseData.message);
                toast.warn("OTP sent to email address , please verify yourself");
                setShowOverlay(true);
            } else {
                toast.error(error.message || "Sign Up Failure");
                console.error('Unexpected response format:', responseData);
            }
        }
        catch (error) {
            console.error(error.message || 'An error occurred during signup');
            toast.error(error.message || 'An error occurred during signup');
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        console.log(forgotPasswordEmail);
        setShowForgotPasswordModal(false);
        // setShowUpdatePasswordModal(true);
        try {
            const responseData = await sendRequest(
                'users/forgotpassword',
                'POST',
                JSON.stringify({
                    email: forgotPasswordEmail,
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            console.log(responseData.message);
            setShowForgotPasswordModal(false);
            setShowUpdatePasswordModal(true);
            setCanResendOTP(false);
            setTimer(2 * 60);
            localStorage.setItem('otpLastSentTime', Date.now().toString());
        } catch (error) {
            console.error(error.message || 'An error occurred during signup');
            toast.error(error.message);
        }
    };

    const handleUpdatePassword = async (e) => {
        console.log({ otp, newPassword });
        try {
            if (!validatePassword(formData.password)) {
                toast.error('Password must contain at least 8 characters, including one numeric digit and one uppercase letter.');
                return;
            }
            const responseData = await sendRequest(
                'users/forgotpasswordnewpassword',
                'POST',
                JSON.stringify({
                    email: forgotPasswordEmail,
                    newPassword: newPassword,
                    verificationCode: otp
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            console.log(responseData.message);
            toast.success('Password Changed');
            setShowUpdatePasswordModal(false);
        } catch (error) {
            toast.error(error.message || 'verfication failed');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            isSignIn ? handleSignIn() : handleSignUp();
        }
    };

    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    {showOverlay && <Overlay email={formData.email} setShowOverlay={setShowOverlay} />}

                    <div className="flex items-center justify-center lg:min-h-screen bg-[#EEEEEE]">
                        <div className="relative flex flex-col justify-center gap-16 p-8 md:p-10 m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                            {/* left side */}
                            <div className="flex flex-col justify-center ">
                                <span className="mb-3 text-3xl lg:text-4xl font-bold">{isSignIn ? 'Welcome back' : 'Create an Account'}</span>
                                <span className="font-light text-gray-700 mb-4">
                                    {isSignIn ? 'Welcome back! Please enter your details' : 'Please enter your details to sign up'}
                                </span>
                                {!isSignIn && (
                                    <>
                                        <div className="py-2">
                                            <span className="mb-2 text-md">Name</span>
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                                name="name"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="py-2 ">
                                    <span className="mb-4 text-md">Email:</span>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="py-2 ">
                                    <span className="mb-4 text-md">Password:</span>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                {!isSignIn && (
                                    <>
                                        <div className="py-2 mb-4">
                                            <span className="mb-2 text-md">Confirm Password</span>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </div>
                                    </>
                                )}
                                {isSignIn ? (
                                    <div className="flex justify-between w-full py-2">
                                        <span onClick={() => setShowForgotPasswordModal(true)} className="font-semibold text-md cursor-pointer my-2">Forgot password</span>
                                    </div>
                                ) : null}
                                {
                                    !isSignIn ? (
                                        <span className='text-gray-600 my-2 ml-2'><input value={isPolicyChecked} onClick={(e) => setIsPolicyChecked(e.target.checked)} type='checkbox' /> Accept <a className='text-blue-600 underline' target='_blank' href='/terms-and-conditions'>Terms and Conditions</a></span>
                                    ) : null
                                }
                                <button
                                    className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                                    onClick={isSignIn ? handleSignIn : handleSignUp}
                                    disabled={!isSignIn && !isPolicyChecked}
                                >
                                    {isSignIn ? 'Sign in' : 'Sign up'}
                                </button>
                                <div className="cursor-pointer text-center flex flex-col text-gray-400" onClick={toggleForm}>
                                    {isSignIn ? "Don't have an account?" : "Already have an account?"}
                                    <span className="font-bold text-black">
                                        {isSignIn ? 'Sign up for free' : 'Sign in'}
                                    </span>
                                </div>
                            </div>
                            {/* right side */}

                        </div>
                    </div>


                    {showForgotPasswordModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    placeholder="Enter your email"
                                    value={forgotPasswordEmail}
                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button
                                    className="w-full mt-1 bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300"
                                    onClick={handleForgotPassword}
                                    disabled={!canResendOTP}
                                >
                                    {canResendOTP ? 'Send OTP' : `Resend OTP in ${timer} seconds`}
                                </button>

                                <button
                                    className="bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300 w-full mt-1"
                                    onClick={e => {
                                        try {
                                            if (!forgotPasswordEmail || forgotPasswordEmail === '')
                                                throw new Error("[-] Please provide your email where otp was sent");
                                            setShowForgotPasswordModal(false);
                                            setShowUpdatePasswordModal(true);
                                        } catch (error) {
                                            return toast.info(error.message);
                                        }
                                    }}
                                >
                                    Already have an OTP?
                                </button>
                                <button
                                    className="bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300 w-full mt-1"
                                    onClick={() => setShowForgotPasswordModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {showUpdatePasswordModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">Update Password</h2>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <input
                                    type="password"
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button
                                    className="w-full bg-black text-white p-2 rounded-lg mb-2 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                                    onClick={handleUpdatePassword}
                                >
                                    Update Password
                                </button>
                                <button
                                    className="w-full bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
                                    onClick={() => {
                                        setShowUpdatePasswordModal(false);
                                        setOtp('');
                                        setNewPassword('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </>
            }
        </>
    );
};

export default SignInPage;

function abc(liveChatSource) {
    var s1 = document.createElement('script'),
        s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/66827eb5eaf3bd8d4d16c22f/1i1mrtts8';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
}

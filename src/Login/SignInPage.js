import React, { useState, useContext, useEffect } from 'react';
import useFetch from '../Hooks/useFetch';
import Overlay from './Overlay';
import { AuthContext } from '../Hooks/AuthContext';
import Loading from "../Components/Loading/Loading";
import { toast } from 'react-toastify';
import { FaDiscord, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import image1 from '../Assets/image1.webp';
import image2 from '../Assets/image2.webp';
import logoImage from '../Assets/logo.webp'; // Replace with the actual path to your logo
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SignInPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();
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
        if (auth.isLoggedIn) {
            navigate('/');
        }
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
        // Handle response data as needed

            auth.login(responseData.user.id, responseData.token);
            toast('Sign In successful');
            window.location.href = "/";

        } catch (error) {
           
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
        
        try {
            if (!validatePassword(newPassword)) {
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
    const swipeVariants = {
        initial: (direction) => ({
          x: direction === "left" ? "-100%" : "100%", // Initial position based on direction
          opacity: 0,
        }),
        animate: {
          x: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 3,
          },
        },
        
      };
      const direction = isSignIn ? "left" : "right";      

    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    {showOverlay && <Overlay email={formData.email} setShowOverlay={setShowOverlay} />}

                    

                    <div className="relative h-screen overflow-hidden bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignIn ? "signInPage" : "signUpPage"}
          custom={direction}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={swipeVariants}
          className="absolute inset-0 flex bg-white"
        >
          <div
            className={`hidden sm:block w-3/4 ${
              isSignIn ? "order-2" : "order-1"
            }`}
          >
            <div className="flex justify-center items-center h-full">
  <img
    src={isSignIn ? image1 : image2}
    alt={isSignIn ? "Sign In" : "Sign Up"}
    className="h-2/3 w-2/3 object-cover"
  />
</div>
          </div>
          <div
            className={`w-full sm:w-1/2 flex items-center justify-center bg-pink-50 ${
              isSignIn ? "order-1" : "order-2"
            }`}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
              <div className="flex items-center mb-6">
              <Link to="/" className="flex items-center mb-6">
  <img src={logoImage} alt="Logo" className="h-10 mr-2" />
  <span className="text-lg sm:text-xl font-bold">ShopAtBanau</span>
</Link>
              </div>
              <div className="w-full max-w-md">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  {isSignIn ? "Welcome back" : "Create an Account"}
                </h2>
                <p className="text-gray-700 mb-6">
                  {isSignIn
                    ? "Welcome back! Please enter your details"
                    : "Please enter your details to sign up"}
                </p>
                <form className="space-y-4">
                  {!isSignIn && (
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 h-12"
                      />
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 h-12"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 h-12"
                    />
                  </div>
                  {!isSignIn && (
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 h-12"
                      />
                    </div>
                  )}
                  {isSignIn && (
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setShowForgotPasswordModal(true)}
                        className="text-sm font-semibold text-[#b5651d] hover:text-[#ff7f50]"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}
                  {!isSignIn && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="policyCheck"
                        checked={isPolicyChecked}
                        onChange={(e) => setIsPolicyChecked(e.target.checked)}
                        className="h-4 w-4 text-[#b5651d] focus:ring-[#b5651d] border-gray-300 rounded"
                      />
                      <label
                        htmlFor="policyCheck"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Accept{" "}
                        <a
                          href="/terms-and-conditions"
                          target="_blank"
                          className="text-[#b5651d] hover:text-[#ff7f50]"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={isSignIn ? handleSignIn : handleSignUp}
                    disabled={!isSignIn && !isPolicyChecked}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ffa047] hover:bg-[#ff7f50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffa047]"
                  >
                    {isSignIn ? "Sign in" : "Sign up"}
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {isSignIn
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                    <button
                      onClick={toggleForm}
                      className="font-medium text-[#b5651d] hover:text-[#ff7f50]"
                    >
                      {isSignIn ? "Sign up for free" : "Sign in"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
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
  
import React, { useState, useContext } from 'react';
import useFetch from '../Hooks/useFetch';
import Overlay from './Overlay';
import { AuthContext } from '../Hooks/AuthContext';
const SignInPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [showOverlay, setShowOverlay] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { isLoading, error, sendRequest, onCloseError } = useFetch();

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };
    const auth = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSignIn = async () => {
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
            console.log(responseData); // Handle response data as needed

            auth.login(responseData.user.id,responseData.token);
            window.location.href = "/";

        } catch (error) {
            console.log(error.message);
            // Check if the error message contains "`user `not verified" (case insensitive)
            if (error?.message === 'User not verified') {
                setShowOverlay(true); // Set showOverlay to true if the error message contains "user not verified"
            } else {
                console.error('Sign-in request failed:', error);
            }
        }
    };
    const handleSignUp = async () => {
        try {
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
                setShowOverlay(true);
            } else {
                console.error('Unexpected response format:', responseData);
            }
        } catch (error) {
            console.error(error.message || 'An error occurred during login');
        }
    };

    return (
        <>
            {showOverlay && <Overlay email={formData.email} setShowOverlay={setShowOverlay} />}

            <div className="flex  items-center justify-center min-h-screen bg-[#EEEEEE]">
                <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                    {/* left side */}
                    <div className="flex flex-col justify-center p-8 md:p-14">
                        <span className="mb-3 text-4xl font-bold">{isSignIn ? 'Welcome back' : 'Create an Account'}</span>
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
                                    />
                                </div>
                            </>
                        )}
                        <div className="py-2 ">
                            <span className="mb-2 text-md">Email</span>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-2 ">
                            <span className="mb-2 text-md">Password</span>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                value={formData.password}
                                onChange={handleChange}
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
                                    />
                                </div>
                            </>
                        )}
                        {isSignIn ? (
                            <div className="flex  justify-between w-full py-4">
                                <span onClick={() => { console.log("forgot") }} className=" font-semibold text-md">Forgot password</span>
                            </div>
                        ) : null}
                        <button
                            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                            onClick={isSignIn ? handleSignIn : handleSignUp}
                        >
                            {isSignIn ? 'Sign in' : 'Sign up'}
                        </button>

                        <div className=" cursor-pointer text-center flex flex-col text-gray-400" onClick={toggleForm}>
                            {isSignIn ? "Don't have an account?" : "Already have an account?"}
                            <span className="font-bold text-black">
                                {isSignIn ? 'Sign up for free' : 'Sign in'}
                            </span>
                        </div>
                    </div>
                    {/* right side */}
                    <div className="relative">
                        <img
                            src="https://cdn.dribbble.com/users/3752227/screenshots/10861282/media/5ff20e1ea27d71052d6f4e90ac8a0b0b.gif"
                            alt="img"
                            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                        />
                        {/* text on image */}
                        <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                            <span className="text-white text-xl">
                                We've been using Untitle to kick<br />
                                start every new project and can't <br />
                                imagine working without it.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default SignInPage;

import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { jwtDecode } from "jwt-decode";

const GoogleOAuth = () => {
    return (
        <div className='p-4'>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const response = jwtDecode(credentialResponse.credential);
                    console.log({ response });
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    );
};

export default GoogleOAuth;

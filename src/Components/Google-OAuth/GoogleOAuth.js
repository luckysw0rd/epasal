import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { jwtDecode } from "jwt-decode";

const GoogleOAuth = () => {
    return (
        <div className='p-4'>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const response = jwtDecode(credentialResponse.credential);
                   
                }}
                onError={() => {
                    
                }}
            />
        </div>
    );
};

export default GoogleOAuth;

import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleOAuthCustom = () => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
               
                const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                });
                
            } catch (error) {
                
            }
        },
        onError: (e) => {
            
        }
    });
    return (
        <div>
            <button onClick={() => login()}>Sign in with Google 🚀</button>
        </div>
    );
};

export default GoogleOAuthCustom;

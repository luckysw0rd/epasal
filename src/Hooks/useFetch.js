import { useState, useCallback } from 'react';

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (
        url,
        method = 'GET',
        body = null,
        headers = {}
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + url, {
                method,
                body,
                headers,
            });
            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || 'Request failed');
                error.response = responseData;
                setIsLoading(false);
                throw error;
            }

            setIsLoading(false);
            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
            setIsLoading(false);
            throw error;
        }
    }, []);

    const onCloseError = () => {
        setError(null);
    };

    return { isLoading, error, sendRequest, onCloseError };
};

export default useFetch;

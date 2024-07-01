import { useState, useCallback, useRef, useEffect } from 'react';

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (
        url,
        method = 'GET',
        body = null,
        headers = {}
    ) => {
        setIsLoading(true);
        setError(null);

        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });
            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                abortCtrl => abortCtrl !== httpAbortCtrl
            );

            if (!response.ok) {
                const error = new Error(responseData.message || 'Request failed');
                error.response = responseData;
                setIsLoading(false);
                throw error;
            }

            setIsLoading(false);
            return responseData;
        } catch (error) {
            if (error.name === 'AbortError') {
                // If the error is an abort error, we don't set the error state
                console.log('Fetch aborted');
                setIsLoading(false);

            } else {
                setError(error);
                console.error('Fetch error:', error);
                setIsLoading(false);

            }
            setIsLoading(false);
            throw error;
        }
    }, []);

    const onCloseError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, onCloseError };
};

export default useFetch;

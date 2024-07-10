import { useState, useCallback, useEffect } from "react";


let logoutTimer;
export const useAuth = () => {
    const [token, setToken] = useState(localStorage?.getItem('userData')?.token||null);
    const [userID, setUserId] = useState(localStorage?.getItem('userData')?.userID||null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

console.log(localStorage.getItem('userData'));
    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        const newTokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
        setTokenExpirationDate(newTokenExpirationDate);
        localStorage.setItem('userData', JSON.stringify({
            userID: uid,
            token: token,
            expiration: newTokenExpirationDate.toISOString()
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
        window.location.href = '/';
    }, []);



    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userID, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
            return () => {
                clearTimeout(logoutTimer);
            };
        }
    }, [token, tokenExpirationDate, logout]);
    return { token, login, logout, userID };
}
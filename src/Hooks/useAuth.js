import { useState, useCallback, useEffect } from "react";
import io from 'socket.io-client';
import logo from '../Assets/banau.png'
let logoutTimer;
export const useAuth = () => {
    const [token, setToken] = useState(localStorage?.getItem('userData')?.token||null);
    const [userID, setUserId] = useState(localStorage?.getItem('userData')?.userID||null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
    const [store,setStore]=useState(null);
    const [hasOrder,setHasOrder]=useState(0)
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
          } else {
            console.log('Notification permission denied.');
          }
        });
      }

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
    console.log('Hi socket',JSON.parse(localStorage?.getItem('userData')));

    const socketConnection=()=>{
        const socket = io(process.env.REACT_APP_BACKEND_URL_NOAPI);
        socket.on('connect',() => {
            console.log('Connected to Socket.IO server',localStorage?.getItem('userData')?.userID);
            socket.emit('isAdmin',{userID: JSON.parse(localStorage?.getItem('userData'))?.userID} );
            
        });
        socket.on('notification-admin',(data)=>{
          console.log('notification',data);
          setHasOrder(1)
          if (Notification.permission === 'granted') {
            const notification=new Notification('Order', {body:"New Order Recieved",icon:logo});
            notification.onclick = function() {
                window.focus();
                window.location.href=`${process.env.REACT_APP_FRONTEND_URL}adminpanel/${data.name}?page=Order`;
                console.log('Notification clicked');
              };
          } else {
            alert("New Order Recieved")
            alert("Enable notification to get it on time")
          }
        })
        
        return () => {
            socket.disconnect();
        };

    }
    useEffect(() => {
        
        if( store){
            socketConnection();
        }
      }, [store]);

    return { token, login, logout, userID,store,setStore,hasOrder,setHasOrder };
}
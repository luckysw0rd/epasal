import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './Hooks/AuthContext';


const PublicRoutes = () => {
    const { token } = useContext(AuthContext);

    return !token ? <Outlet /> : <Navigate to="/" replace />;
}

export default PublicRoutes;

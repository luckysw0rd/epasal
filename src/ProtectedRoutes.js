import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './Hooks/AuthContext';

const ProtectedRoutes = () => {
    const { token } = useContext(AuthContext);

    return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;

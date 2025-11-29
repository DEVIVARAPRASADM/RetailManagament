import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { token } = useAuth();
    // console.lo(user)
    // Check if the user is logged in and has the 'Admin' role
    if (!token ) {
        // Redirect them to the login page or a 'not authorized' page
        return <Navigate to="/login" replace />;
    }

    // If authorized, render the child components
    return <Outlet />;
};

export default AdminRoute;
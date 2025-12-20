import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !user?.isAdmin) {
        // Redirect to home if not admin but adminOnly is true
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

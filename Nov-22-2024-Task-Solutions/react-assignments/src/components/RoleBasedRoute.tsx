import React from 'react';
import { Navigate } from 'react-router-dom';

type Role = 'ADMIN' | 'USER' ;

interface RoleBasedRouteProps {
    children: React.ReactNode;
    allowedRoles: Role[];
    returnUrl: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
    children, 
    allowedRoles,
    returnUrl 
}) => {
    const token = sessionStorage.getItem('AUTH_TOKEN');
    const userRoles = JSON.parse(sessionStorage.getItem('USER_ROLES') || '[]') as Role[];

    if (!token) {
        return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
    }

    const hasRequiredRole = userRoles.some(role => allowedRoles.includes(role));
    
    if (!hasRequiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};
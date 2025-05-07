import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loading } from '@/components/common/Loading/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean; // true=must be logged in
  redirectIfAuth?: boolean; // true=send away when already logged in
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectIfAuth = false,
  redirectTo,
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) null;

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (redirectIfAuth && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;

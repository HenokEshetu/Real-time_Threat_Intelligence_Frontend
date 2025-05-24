import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loading } from '@/components/common/Loading/Loading';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/auth',
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  const location = useLocation();
  const auth = isLoggedIn;
  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

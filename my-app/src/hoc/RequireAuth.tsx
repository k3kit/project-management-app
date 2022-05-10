import { useLocation, Navigate } from 'react-router-dom';
import React from 'react';
import WelcomePage from '../pages/welcome-page/welcomePage';
export const auth = false;
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

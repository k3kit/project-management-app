import { useLocation, Navigate } from 'react-router-dom';
import React from 'react';
import WelcomePage from '../pages/welcome-page/welcomePage';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const dispath = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  const location = useLocation();
  const auth = isLoggedIn;
  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

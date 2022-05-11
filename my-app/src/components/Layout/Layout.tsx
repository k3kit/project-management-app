import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { Footer } from '../footer';
import { Header } from '../header';

const Layout = () => {
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { auth } from '../../hoc/RequireAuth';
import { Footer } from '../footer';
import { Header } from '../header';

const Layout = () => {
  return (
    <>
      {auth ? <Header /> : ''}
      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;

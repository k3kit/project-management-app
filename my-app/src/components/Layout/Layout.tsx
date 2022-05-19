import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

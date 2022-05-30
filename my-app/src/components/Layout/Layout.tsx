import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import './style.css';
const Layout = () => {
  return (
    <>
      <div className="wrapper">
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

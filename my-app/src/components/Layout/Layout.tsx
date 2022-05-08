import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <button>edit profile</button>
        <button>logout</button>
        <button>create new board</button>
        <button>RU/EN</button>
      </header>
      <Outlet />
      <footer>2021 K3k1t</footer>
    </>
  );
};

export default Layout;

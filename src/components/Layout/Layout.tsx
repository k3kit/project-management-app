import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import './style.css';
const Layout = () => {
  return (
    <>
      <Header></Header>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 65px)',
        }}
      >
        {/* <Container component="main"> */}
        <Outlet />
        {/* </Container> */}

        <Footer />
      </Box>
    </>
  );
};

export default Layout;

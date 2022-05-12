import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Header } from '../../components/header';

const MainPage = () => {
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', marginTop: 10 }}>Main page</Box>
      </Container>
    </>
  );
};

export default MainPage;

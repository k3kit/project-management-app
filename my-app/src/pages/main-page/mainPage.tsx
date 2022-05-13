import { Container, Dialog } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import EditProfile from '../../components/editProfile';
import { Header } from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ModalProfileSlice } from '../../store/slices/header';

const MainPage = () => {
  const dispath = useAppDispatch();
  const { setOpenEditProfile } = ModalProfileSlice.actions;
  const { onedEditProfile } = useAppSelector((state) => state.modalReducer);
  return (
    <>
      <Header />{' '}
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <Container id="main">Main Page</Container>
      </Box>
    </>
  );
};

export default MainPage;

import React from 'react';
import { Box } from '@mui/material';
import EditProfile from '../../components/editProfile';
import { Header } from '../../components/header';

const EditPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ height: '100vh' }}>
        <EditProfile />
      </Box>
    </>
  );
};

export default EditPage;

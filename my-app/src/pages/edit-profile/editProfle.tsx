import React from 'react';
import { Box } from '@mui/material';
import EditProfile from '../../components/profile/editProfile';
import { Header } from '../../components/header/header';

const EditPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ height: '73vh' }}>
        <EditProfile />
      </Box>
    </>
  );
};

export default EditPage;

import { Container, Dialog, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { Board } from '../../components/boards';
// import EditProfile from '../../components/editProfile';
import { Header } from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBoards } from '../../store/slices/boards';
// import { ModalProfileSlice } from '../../store/slices/header';

const MainPage = () => {
  const dispath = useAppDispatch();
  // const { setOpenEditProfile } = ModalProfileSlice.actions;
  // const { onedEditProfile } = useAppSelector((state) => state.modalReducer);
  const { boards } = useAppSelector((state) => state.boardReducer);
  useEffect(() => {
    dispath(getBoards());
  }, [dispath]);

  return (
    <>
      <Header />{' '}
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', marginTop: 2 }}>
        <Container id="main">
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 12 }}>
            {boards.map(({ id, title }) => (
              <Board key={id} id={id} title={title} />
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MainPage;

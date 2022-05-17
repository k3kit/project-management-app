import { Container, Dialog, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { BoardModal } from '../../components/BoardModal';
import { Board } from '../../components/boards';
import { Header } from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice, getBoards } from '../../store/slices/boards';

const MainPage = () => {
  const dispath = useAppDispatch();
  const { setOpen } = boardsSlice.actions;
  const { Modal, boards } = useAppSelector((state) => state.boardReducer);

  useEffect(() => {
    dispath(getBoards());
  }, [dispath]);

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', marginTop: 2 }}>
        <Container id="main">
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 12 }}>
            {boards.map(({ id, title }) => (
              <Board key={id} id={id} title={title} setConfirmOpen={Modal} />
            ))}
          </Grid>
          <Dialog open={Modal} onClose={() => dispath(setOpen(false))}>
            <BoardModal />
          </Dialog>
        </Container>
      </Box>
    </>
  );
};

export default MainPage;

import React, { useEffect } from 'react';
import { Box, Container, Dialog, Grid, Typography } from '@mui/material';
import { BoardModal } from '../../components/board/BoardModal';
import { Board } from '../../components/board/Boards';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice, getBoards } from '../../store/slices/boards';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';

const MainPage = () => {
  const dispath = useAppDispatch();
  const { setOpen } = boardsSlice.actions;
  const { Modal, boards, isLoading, error } = useAppSelector((state) => state.boardReducer);

  useEffect(() => {
    dispath(getBoards());
  }, [dispath]);

  return (
    <>
      {/* <Header /> */}
      <Box sx={{ marginTop: 2 }}>
        <Container sx={{ height: '100vh' }}>
          {isLoading && <Loading />}
          {error && <Error message={error} />}
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 12 }}>
            {boards.map(({ id, title, description }) => (
              <Board
                key={id}
                id={id}
                title={title}
                description={description}
                setConfirmOpen={Modal}
              />
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

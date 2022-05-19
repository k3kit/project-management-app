import React, { useState } from 'react';
import { AppBar, Button, Stack, Toolbar, Typography, Switch } from '@mui/material';
import { useAppDispatch } from '../hooks/redux';
import { logout } from '../store/slices/Auth';
import { Link } from 'react-router-dom';
import { boardsSlice } from '../store/slices/boards';

export const Header = () => {
  const [fix, setFix] = useState(false);
  const dispath = useAppDispatch();
  const { setOpen } = boardsSlice.actions;

  const setFixed = () => {
    if (window.scrollY >= 100) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener('scroll', setFixed);
  const handleLogout = () => {
    dispath(logout());
  };

  const openModal = () => {
    dispath(setOpen(true));
  };

  return (
    <AppBar className={fix ? 'appBar fixed' : 'appBar'} position="sticky">
      <Toolbar>
        <Button sx={{ mr: 2 }} color="inherit">
          <Link to="/edit"> Edit profile </Link>
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
        <Button onClick={openModal} color="inherit">
          Create new board
        </Button>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>EN</Typography>
          <Switch defaultChecked color="secondary" />
          <Typography>RU</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

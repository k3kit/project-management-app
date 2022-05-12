import React, { useState } from 'react';
import { AppBar, Button, Stack, Toolbar, Typography, Switch } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/slices/Auth';
import { logout } from '../store/slices/Auth';
import { ModalProfileSlice } from '../store/slices/header';
export const Header = () => {
  const [fix, setFix] = useState(false);
  const dispath = useAppDispatch();
  const { setOpenEditProfile } = ModalProfileSlice.actions;
  const { onedEditProfile } = useAppSelector((state) => state.modalReducer);
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
  return (
    <AppBar className={fix ? 'appBar fixed' : 'appBar'} position="sticky">
      <Toolbar>
        <Button color="inherit" onClick={() => dispath(setOpenEditProfile(true))}>
          Edit profile
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
        <Button color="inherit">create new board</Button>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>EN</Typography>
          <Switch defaultChecked color="secondary" />
          <Typography>RU</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

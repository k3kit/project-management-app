import React, { useState } from 'react';
import { AppBar, Button, Stack, Toolbar, Typography, Switch } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/slices/Auth';
import { logout } from '../store/slices/Auth';
import { deleteUsers, getUsers } from '../store/slices/user';
import { ModalProfileSlice } from '../store/slices/header';
import authHeader from '../services/auth-header';
import editProfile from './editProfile';
import { Link } from 'react-router-dom';
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
  const handeleUSers = () => {
    dispath(getUsers());
    dispath(deleteUsers());
    authHeader();
  };
  return (
    <AppBar className={fix ? 'appBar fixed' : 'appBar'} position="sticky">
      <Toolbar>
        <Button sx={{ mr: 2 }} color="inherit">
          <Link to="/edit"> Edit </Link>
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
        <Button onClick={handeleUSers} color="inherit">
          create new board
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
// onClick={() => dispath(setOpenEditProfile(true))}

import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  Typography,
  Switch,
  Container,
  Hidden,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useAppDispatch } from '../hooks/redux';
import { logout } from '../store/slices/Auth';
import { Link } from 'react-router-dom';
import { boardsSlice } from '../store/slices/boards';

export const Header = () => {
  const [fix, setFix] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const dispath = useAppDispatch();
  const { setOpen } = boardsSlice.actions;
  const pages = ['Edit profile', 'Logout', 'Create new board'];
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
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  return (
    <AppBar className={fix ? 'appBar fixed' : 'appBar'} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button color="inherit">
                    <Link to="/edit"> Edit profile </Link>
                  </Button>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button onClick={openModal} color="inherit">
                  Create new board
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ mr: 2 }} color="inherit">
              <Link to="/edit"> Edit profile </Link>
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Button onClick={openModal} color="inherit">
              Create new board
            </Button>
          </Box>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>EN</Typography>
              <Switch defaultChecked color="secondary" />
              <Typography>RU</Typography>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

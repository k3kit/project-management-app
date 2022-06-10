import React, { useEffect, useState } from 'react';
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
  createSvgIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/slices/Auth';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { boardsSlice } from '../../store/slices/boards';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddBoxIcon from '@mui/icons-material/AddBox';

const LogoApp = createSvgIcon(
  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7 12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v9zm7-4a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5z" />,
  'Logo'
);
export const Header = () => {
  const [fix, setFix] = useState(false);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const dispath = useAppDispatch();
  const { setOpen } = boardsSlice.actions;
  const location = useLocation();
  const { boardId } = useParams();
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setFixed = () => {
    if (window.scrollY >= 50) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener('scroll', setFixed);
  const handleLogout = () => {
    dispath(logout());
    setAnchorEl(null);
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
    <AppBar
      className={fix ? 'appBar fixed' : 'appBar'}
      sx={{ bgcolor: 'rgb(76 118 189 / 33%)' }}
      position="sticky"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none', justifyContent: 'space-between' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: 'rgba(0, 0, 0, 0.87)' }} />
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
              {`${location.pathname}` === `/board/${boardId}` ? (
                <Button variant="text" startIcon={<ArrowBackIosIcon />} size="small">
                  <Link to="/main">
                    <Typography>Go main</Typography>
                  </Link>
                </Button>
              ) : (
                ''
              )}

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
            <Box component={Link} to="/">
              <LogoApp sx={{ fontSize: 30, paddingTop: '15px', color: 'rgba(0, 0, 0, 0.87)' }} />
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            }}
          >
            <Box component={Link} to="/">
              <LogoApp sx={{ fontSize: 45, paddingTop: '15px', color: 'rgba(0, 0, 0, 0.87)' }} />
            </Box>
            {`${location.pathname}` === `/board/${boardId}` && (
              <Button
                color="primary"
                variant="text"
                sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                startIcon={<ArrowBackIosIcon />}
                size="small"
              >
                <Link to="/main">Go main</Link>
              </Button>
            )}
            {`${location.pathname}` === `/main` && (
              <Button
                color="primary"
                variant="text"
                sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                startIcon={<AddBoxIcon />}
                size="small"
                onClick={openModal}
              >
                Create new board
              </Button>
            )}
            {`${location.pathname}` === `/edit` && (
              <Button
                color="primary"
                variant="text"
                sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                startIcon={<ArrowBackIosIcon />}
                size="small"
                onClick={() => navigate(-1)}
              >
                back
              </Button>
            )}
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
              size="large"
            >
              <AccountCircleIcon />
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {isLoggedIn ? (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link to="/edit"> Edit profile </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Link to="register" onClick={handleClose}>
                      Sign Up
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="login" onClick={handleClose}>
                      Sign In
                    </Link>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

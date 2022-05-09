import React from 'react';
import { AppBar, Button, Stack, Toolbar, Typography, Switch } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit">edit profile</Button>
        <Button color="inherit">logout</Button>
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

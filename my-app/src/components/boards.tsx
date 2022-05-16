/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { FC } from 'react';
type MyProps = {
  title: string;
  id: string;
};
export const Board: FC<MyProps> = ({ title, id }) => {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ width: 250, рeight: 150 }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{title}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

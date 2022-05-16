/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
type MyProps = {
  title: string;
  id: string;
};
export const Board: FC<MyProps> = ({ title, id }) => {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

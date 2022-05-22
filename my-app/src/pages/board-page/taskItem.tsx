import React, { FC } from 'react';
import { ITask } from '../../store/slices/task';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
export const TaskItem: FC<ITask> = ({ id, title, order, done, description, userId }) => {
  return (
    <Box
      sx={{
        bgcolor: '#383838',
        margin: 2,
        boxShadow: 'rgb(0 0 0 / 20%) 0px -1px 8px 0px;',
        cursor: 'grabbing',
        padding: '5px',
        m: '5px',
      }}
    >
      <Typography color="#ffffff">{title}</Typography>
    </Box>
  );
};

import React, { FC } from 'react';
import { Alert, AlertTitle } from '@mui/material';
interface MyProps {
  message: string | null;
}
export const Error: FC<MyProps> = ({ message }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>{message}</strong>
    </Alert>
  );
};

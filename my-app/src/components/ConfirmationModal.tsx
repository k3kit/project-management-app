/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmDialog = (props: {
  title: any;
  children: any;
  open: any;
  setOpen: any;
  onConfirm: any;
}) => {
  const { title, children, open, setOpen, onConfirm } = props;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)} size="small">
          No
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;

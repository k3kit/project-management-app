import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmDialog = (props: {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}) => {
  const { title, children, open, setOpen, onConfirm } = props;
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)} size="small">
          {t('confirm.no')}
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          {t('confirm.yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;

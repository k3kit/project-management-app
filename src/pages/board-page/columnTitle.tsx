import { ClickAwayListener, Typography, Box, Paper, IconButton, InputBase } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { updateTitleColumns } from '../../store/slices/columns';
import { IColumn } from '../../types';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const ColumnTitle: FC<IColumn> = ({ id, title, order }) => {
  const [titleInput, setTitleInput] = useState(title);
  const [titleEdit, setTitleEdit] = useState(false);
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  const toggleTitle = () => {
    if (!titleEdit) {
      setTitleEdit(true);
    }
  };

  const handleSubmit = (titleInput: string) => {
    if (boardId && id && titleInput) {
      dispatch(
        updateTitleColumns({
          boardId,
          columnsId: id,
          column: { title: titleInput, order: order },
        })
      );
    }
  };

  const handleClickAway = () => {
    if (titleEdit) {
      setTitleEdit(false);
    }
  };

  const handeleClickSub = () => {
    handleSubmit(titleInput);
    setTitleEdit(false);
  };

  const handleClickCancel = () => {
    setTitleEdit(false);
    setTitleInput(title);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Typography color="#FFFFFF" component="div" sx={{ padding: 0.8, width: '80%' }}>
          {!titleEdit ? (
            <Box onClick={toggleTitle} sx={{ cursor: 'pointer' }} color="#FFFFFF">
              {title}
            </Box>
          ) : (
            <Paper variant="elevation" sx={{ display: 'flex', height: 30 }}>
              <IconButton color="primary" size="small" onClick={handeleClickSub}>
                <CheckIcon />
              </IconButton>
              <IconButton color="primary" size="small" onClick={handleClickCancel}>
                <CancelOutlinedIcon />
              </IconButton>
              <InputBase
                color="secondary"
                placeholder={title}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Paper>
          )}
        </Typography>
      </ClickAwayListener>
    </>
  );
};

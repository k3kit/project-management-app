import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { columnsSlice, updateTitleColumns } from '../../store/slices/columns';
import { Col } from './boardPage';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const BoardItem: FC<Col> = ({ id, title, order }) => {
  const [titleInput, setTitleInput] = useState(title);
  const [titleEdit, setTitleEdit] = useState(false);
  const dispath = useAppDispatch();
  const {} = columnsSlice.actions;
  const { columns } = useAppSelector((state) => state.columnsReducer);
  const { boardId } = useParams();

  const handleSubmit = (titleInput: string) => {
    if (boardId && id && titleInput) {
      dispath(
        updateTitleColumns({
          boardId,
          columnsId: id,
          column: { title: titleInput, order: order },
        })
      );
    }
  };
  const toggleTitle = () => {
    if (!titleEdit) {
      setTitleEdit(true);
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
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };
  return (
    <Grid item xs={2}>
      <Paper
        sx={{
          minHeight: 300,
          minWidth: 200,
          maxWidth: 200,
          backgroundColor: '#1A2027',
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Typography color="#FFFFFF">
            {!titleEdit ? (
              <Box onClick={toggleTitle} sx={{ cursor: 'pointer' }} color="#FFFFFF">
                {title}
              </Box>
            ) : (
              <Paper variant="elevation" component="form" sx={{ display: 'flex', height: 30 }}>
                <IconButton color="primary" size="small" onClick={handeleClickSub}>
                  <CheckIcon />
                </IconButton>
                <IconButton color="primary" size="small" onClick={handleClickCancel}>
                  <CancelOutlinedIcon />
                </IconButton>
                <InputBase color="secondary" placeholder={title} onChange={handleOnChange} />
              </Paper>
            )}
          </Typography>
        </ClickAwayListener>
      </Paper>
    </Grid>
  );
};

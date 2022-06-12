import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1" component="div">
        404
      </Typography>
      <Typography variant="h3" component="div">
        {t('page_not_found.part1')}
      </Typography>
    </Box>
  );
};

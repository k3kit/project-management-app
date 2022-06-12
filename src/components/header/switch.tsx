import * as React from 'react';
import Switch from '@mui/material/Switch';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ControlledSwitches() {
  const lang = localStorage.getItem('i18nextLng');
  const [checked, setChecked] = React.useState<boolean>(lang === 'ru');
  const { t, i18n } = useTranslation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(checked ? 'en' : 'ru');
    setChecked(event.target.checked);
  };
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
          En
        </Typography>
        <Switch checked={checked} onChange={handleChange} color="default" />
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.87)' }} variant="h6">
          Ru
        </Typography>
      </Stack>
    </>
  );
}

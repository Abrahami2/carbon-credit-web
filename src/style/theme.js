import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E8B57',
    },
    secondary: {
      main: '#3CB371',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Open Sans", sans-serif',
  },
});

export default theme;
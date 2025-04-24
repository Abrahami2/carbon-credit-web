import React, { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ConfigProvider } from 'antd';

import { SetAuthToken } from './config/axios-configuration';
import GlobalStyles from './style/GlobalStyles';
import PrivateRoutes from './routes/private-route';
import PublicRoutes from './routes/public-route';

const muiTheme = createTheme({
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
    text: {
      primary: '#333333',
    },
    error: {
      main: '#FF6B6B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Open Sans", sans-serif',
    h1: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          '&:hover': {
            backgroundColor: '#2E8B57',
          },
        },
      },
    },
  },
});

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      SetAuthToken(token);
    } else {
      SetAuthToken(null);
    }
  }, [token, dispatch]);

  const router = createBrowserRouter([
    token ? PrivateRoutes() : {},
    PublicRoutes()
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MuiThemeProvider theme={muiTheme}>
        <StyledThemeProvider theme={muiTheme}>
          <CssBaseline />
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'Source Sans 3'
              }
            }}
          >
            <GlobalStyles />
            <RouterProvider router={router} />
          </ConfigProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </Suspense>
  );
};

export default App;
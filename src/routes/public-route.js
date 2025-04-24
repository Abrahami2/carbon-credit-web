import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const Main = lazy(() => import('../pages/main/main'));
const PageNotFound = lazy(() => import('../pages/not-found'));

const PublicRoutes = () => ({
  path: '/',
  children: [
    {
      path: '/', element: <Navigate to="app" replace />
    },
    {
      path: 'app', element: <Main />
    },
    {
      path: 'login', element: <Login />
    },
    {
      path: 'register', element: <Register />
    },
    {
      path: '*', element: <PageNotFound />
    }
  ]
});

export default PublicRoutes;

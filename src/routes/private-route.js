import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/dashboard/dashboard'));
const PageNotFound = lazy(() => import('../pages/not-found'));

const PrivateRoutes = () => ({
  path: '/',
  children: [
    {
      path: '/', element: <Navigate to="dashboard" replace />
    },
    {
      path: 'dashboard', element: <Dashboard />
    },
    {
      path: '*', element: <PageNotFound />
    }
  ]
});

export default PrivateRoutes;

// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Main from './Client/Layout/Main';
import Home from './Client/Layout/Home/Home';
import AuthProviders from './Client/Providers/Providers';
import Profile from './Client/Layout/Pages/Profile';
import Dashboard from './Dashboard/Dashboard';
import RegisterPage from './Client/Layout/Pages/RegisterPage';
import LoginPage from './Client/Layout/Pages/LoginPage';
import DashboardHomeSohozDjr from './Dashboard/DashboardHomeSohozDjr';
import UsersListSohozDjr from './Dashboard/UsersListSohozDjr/UsersListSohozDjr';
import UsersSohozDjr from './Dashboard/UsersSohozDjr/UsersSohozDjr';
import CollectDataSohozDjr from './Dashboard/CollectDataSohozDjr/CollectDataSohozDjr';
import RidersOrdersSohozDjr from './Dashboard/RidersOrdersSohozDjr/RidersOrdersSohozDjr';
// import DashboardHome from './Dashboard/DashboardHomeSohozDjr';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "profile",
        element: <Profile></Profile>
      },
      {
        path: "loginPage",
        element: <LoginPage></LoginPage>
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>
      },
      {
        path: "registerPage",
        element: <RegisterPage></RegisterPage>
      },
      {
        path: "dashboardHomeSohozDjr",
        element: <DashboardHomeSohozDjr></DashboardHomeSohozDjr>
      },
      {
        path: "usersListSohozDjr",
        element: <UsersListSohozDjr></UsersListSohozDjr>
      },
      {
        path: "usersSohozDjr",
        element: <UsersSohozDjr></UsersSohozDjr>
      },
      {
        path: "collectDataSohozDjr",
        element: <CollectDataSohozDjr></CollectDataSohozDjr>
      },
      {
        path : "ridersOrderrdersSohozDjr",
        element:<RidersOrdersSohozDjr/>,
      }

    ]

  },


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProviders>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProviders>
)

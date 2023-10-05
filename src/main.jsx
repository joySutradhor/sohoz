import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SubmitData from './Client/SubmitData/SubmitData';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Admin from './Dashboard/Admin/Admin';
import Admincopy from './Client/Shared/Footer';
import Main from './Client/Layout/Main';
import Home from './Client/Layout/Home/Home';
import AuthProviders from './Client/Providers/Providers';
import Profile from './Client/Layout/Pages/Profile';
import Login from './Client/Layout/Pages/Login';
// import Register from './Client/Layout/Pages/Register';
// import RegisterTest from './Client/Layout/Pages/RegisterTest';
import Register from './Client/Layout/Pages/Register';
import Dashboard from './Client/Layout/Pages/Dashboard';
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
        path : "profile",
        element : <Profile></Profile>
      },
      {
        path : "login",
        element : <Login></Login>
      },
      {
        path : "register" ,
        element : <Register></Register>
      },
      {
        path : "dashboard" ,
        element : <Dashboard></Dashboard>
      }
    ]

  },
  {
    path: "submitData",
    element: <SubmitData></SubmitData>
  },
  {
    path: "admin",
    element: <Admin></Admin>
  },
  {
    path: "Admincopy",
    element: <Admincopy></Admincopy>
  },

  {
    path: "marketing",
    element: <p>dailm is marketing </p>
  },
  {
    path: "management",
    element: <p>ripon is management </p>
  }

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProviders>
  </React.StrictMode>,
)

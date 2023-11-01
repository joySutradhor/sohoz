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
// import Dashboard from './Dashboard/Dashboard';
import RegisterPage from './Client/Layout/Pages/RegisterPage';
import LoginPage from './Client/Layout/Pages/LoginPage';
import DashboardHomeSohozDjr from './Dashboard/DashboardHomeSohozDjr';
import UsersListSohozDjr from './Dashboard/UsersListSohozDjr/UsersListSohozDjr';
import UsersSohozDjr from './Dashboard/UsersSohozDjr/UsersSohozDjr';
import CollectDataSohozDjr from './Dashboard/CollectDataSohozDjr/CollectDataSohozDjr';
import RidersOrdersSohozDjr from './Dashboard/RidersOrdersSohozDjr/RidersOrdersSohozDjr';
// import CompletedRiderOrderSohozDjr from './Dashboard/RidersOrdersSohozDjr/src/Dashboard/RidersOrdersSohozDjr/RidersAcceptedOrdersSohozDjr.jsx';
import CustomerDataSohozDjr from './Dashboard/CustomerDataSohozDjr/CustomerDataSohozDjr';
import RidersAcceptedOrdersSohozDjr from './Dashboard/RidersOrdersSohozDjr/RidersAcceptedOrdersSohozDjr/RidersAcceptedOrdersSohozDjr';
import CompletedRiderOrderSohozDjr from './Dashboard/RidersOrdersSohozDjr/CompletedRiderOrderSohozDjr';
import CheckOutSohozDjr from './Client/Layout/Home/OrderProcess/CheckOutSohozDjr/CheckOutSohozDjr';
// import SubmitRiderOderSohozDjr from './Dashboard/RidersOrdersSohozDjr/CompletedRiderOrderSohozDjr';
// import DashboardHome from './Dashboard/DashboardHomeSohozDjr';
// import PrivateRoute from './Client/Shared/PrivateRoute'
import MyProfileSohozDjr from './Dashboard/UserDashboard/MyProfileSohozDjr';
import OrdersStatusSohozDjr from './Dashboard/UserDashboard/OrdersStatusSohozDjr';
// import TrackRiderSohozDjr from './Dashboard/UserDashboard/TrackRiderSohozDjr';
import CostDetailsSohozDjr from './Dashboard/CostDetailsSohozDjr/CostDetailsSohozDjr';
import SummerySohozDjr from './Dashboard/SummerySohozDjr/SummerySohozDjr';
// import SubmitRiderLocationSohozDjr from './Dashboard/SubmitRiderLocationSohozDjr/SubmitRiderLocationSohozDjr';
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
        path: "ridersOrderrdersSohozDjr",
        element: <RidersOrdersSohozDjr />,
      },
      {
        path: "completedRiderOrderSohozDjr/:orderId",
        element: <CompletedRiderOrderSohozDjr></CompletedRiderOrderSohozDjr>,
      },
      {
        path: "customerDataSohozDjr",
        element: <CustomerDataSohozDjr></CustomerDataSohozDjr>
      },
      {
        path: "ridersAcceptedOrdersSohozDjr",
        element: <RidersAcceptedOrdersSohozDjr></RidersAcceptedOrdersSohozDjr>
      },
      {
        path: "userPlaceOrderSohozDjr/:id",
        element: <CheckOutSohozDjr></CheckOutSohozDjr>
      },
      {
        path : "myprofileSohozDjr",
        element : <MyProfileSohozDjr></MyProfileSohozDjr>
      } ,
      {
        path : "ordersStatusSohozDjr",
        element : <OrdersStatusSohozDjr></OrdersStatusSohozDjr>
      },
      {
        path : "CostDetailsSohozDjr",
        element : <CostDetailsSohozDjr></CostDetailsSohozDjr>
      },
      {
        path : "SummerySohozDjr",
        element : <SummerySohozDjr></SummerySohozDjr>
      },

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

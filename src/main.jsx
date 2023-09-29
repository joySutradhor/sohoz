import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Client/Main';
import SubmitData from './Client/SubmitData/SubmitData';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Admin from './Dashboard/Admin/Admin';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,

  },
  {
    path: "submitData",
    element: <SubmitData></SubmitData>
  }, 
  {
    path : "admin" ,
    element : <Admin></Admin>
  },
  {
    path : "marketing",
    element : <p>dailm is marketing </p>
  },
  {
    path : "management",
    element : <p>ripon is management </p>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Client/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  
  },
  {
    path: "submitData",
    element : <p>submit data form</p>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
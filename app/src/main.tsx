import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  createRoutesFromElements,
  createHashRouter,
  Route,
  RouterProvider,
  HashRouter,
} from "react-router-dom";

import { AuthContextProvider } from './Context/AuthContext';

import { View } from './pages/View/View';
import { DragBar } from './components/DragBar/DragBar';

import './samples/node-api'
import './index.scss'

const rooter = createHashRouter(
  createRoutesFromElements([
    <Route path="/" element={<View />} />,
    <Route path="/signup" element={<View page="signup" />} />,
    <Route path="/home" element={<View page="home" />} />,
    <Route path="/server" element={<View page="server" />} />,
    <Route path="/server/:id" element={<View page="server" />} />,
    <Route path="/private" element={<View page="private" />} />,
    <Route path="/private/:id" element={<View page="private" />} />,
    <Route path="/premium" element={<View page="premium" />} />,
  ])
);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <DragBar />
      <RouterProvider router={rooter} />
    </AuthContextProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')

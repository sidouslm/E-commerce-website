import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import ShopContextProvider from './context/ShopContext.jsx'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ShopContextProvider>
      <App/>
    </ShopContextProvider>
  </HashRouter>,
)
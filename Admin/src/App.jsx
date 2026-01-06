import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import Add from './pages/Add.jsx'
import Login from './components/Login.jsx'
import { ToastContainer } from 'react-toastify';


export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'


const App = () => {


  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(()=> {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 h-screen flex flex-col'>
      <ToastContainer/>
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr className=' border text-slate-200' />
          <div className='flex flex-1 overflow-hidden'>
            <Sidebar />
            <div className='flex flex-col w-full mx-[max(5vw,25px)] my-8 text-slate-600 text-base overflow-y-auto p-3'>
              <Routes>
                <Route path='/' element={<Navigate to="/add" />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App

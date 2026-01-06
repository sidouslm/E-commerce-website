import React from 'react'
import { assets } from '../assets/assests.js'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <div className='w-30 h-15'>
      <img className='w-full h-full object-cover' src={assets.Adminlogo} alt="" />
      </div>
      <button onClick={()=>setToken('')} className='bg-slate-600 px-2 py-2 rounded-[10%] text-slate-50  sm:px-7 sm:py-2 sm:rounded-full hover:bg-slate-800 transition-all text-xs sm:text-sm cursor-pointer'>LogOut</button>
    </div>
  )
}

export default Navbar

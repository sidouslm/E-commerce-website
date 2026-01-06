import React from 'react'
import { Link } from 'react-router-dom'

const NewsLetterBox = () => {
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-slate-800'>Login now for 20% off</p>
        <p className='text-gray-400 mt-3'>lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        
        <Link to={'/login'}>
            <button className=' cursor-pointer hover:bg-slate-900 hover:text-gray-50 hover:shadow-md transition-all mt-5 mb-2 border border-black  bg-transparent p-2 rounded text-base text-slate-700'>Sign In</button>
        </Link> 
    </div> 
  )
}

export default NewsLetterBox

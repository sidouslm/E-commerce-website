import React from 'react'
import { assets } from '../assets/assests.js'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'



const Navbar = () => {
  const [visible, setVisible] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = React.useContext(ShopContext);

  const logOut = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  const location = useLocation();

  React.useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible]);



  return (
    <div className='flex items-center justify-between  font-medium'>

      <Link to={'/'}><img src={assets.logo} className='w-24' /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 flex-1 justify-center'>
        <NavLink to={'/'} className='flex flex-col items-center gap-1 group'>
          <p>Shop</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden  transition-all duration-300' />
        </NavLink>

        <NavLink to={'/collection'} className='flex flex-col items-center gap-1 group'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden  transition-all duration-300' />
        </NavLink>

        <NavLink to={'/about'} className='flex flex-col items-center gap-1 group'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden  transition-all duration-300' />
        </NavLink>

        <NavLink to={'/contact'} className='flex flex-col items-center gap-1 group'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden  transition-all duration-300' />
        </NavLink>

      </ul>
      <div className='flex items-center gap-6 z-10'>

        {location.pathname === '/collection' && <svg onClick={() => setShowSearch(true)} className=' w-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ pointerEvents: 'auto' }}>
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>}

        <div className='group relative'>
          <svg onClick={() => token ? null : navigate('/login')} className=' w-7 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16" style={{ pointerEvents: 'auto' }}>
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
          <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${token ? 'bg-green-500' : 'bg-red-500'}`}></div>
          {token && <div className='absolute dropdown-menu right-0 pt-4 z-20 opacity-0 translate-y-1 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 ease-out origin-top-right'>
            <div className='flex flex-col gap-2 w-36 py-3 px-3 bg-slate-100 text-gray-500 rounded shadow-md z-40'>
              <p onClick={() => navigate('/order')} className='cursor-pointer hover:text-black' >Orders</p>
              <p onClick={logOut} className='cursor-pointer hover:text-black' >Logout</p>
            </div>
          </div>}
        </div>
        <Link to='/cart' className='relative' >
          <svg className='w-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <svg onClick={() => setVisible(true)} className='block sm:hidden w-6 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
          <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg>
      </div>
      {/* side bar for Mobile Menu */}
      <div className={`absolute top-0 right-0 bottom-0 h-screen overflow-hidden transition-all duration-300 ease-out z-30 bg-white ${visible ? 'w-full' : 'w-0 '}`} >
        <div className='flex flex-col text-gray-600 overflow-hidden'>
          <div onClick={() => setVisible(false)} className='flex items-center w-max gap-4 p-3 cursor-pointer '>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="gray" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
            </svg>
            <p>Back</p>
          </div>
          <hr />
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 hover:text-black ' to={'/'}>Shop</NavLink> <hr />
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 hover:text-black ' to={'/collection'}>Collection</NavLink><hr />
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 hover:text-black ' to={'/about'}>About</NavLink><hr />
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 hover:text-black ' to={'/contact'}>Contact</NavLink><hr />
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 hover:text-black ' to={'/cart'}>Cart</NavLink><hr />
          {token && (
            <>
              <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 hover:text-black ' to={'/order'}>Orders</NavLink><hr />
              <p onClick={logOut} className='cursor-pointer border-slate-700 border mx-auto w-max mt-10 bg-slate-50 hover:bg-slate-700 hover:text-slate-50 py-2 px-5 rounded-xl transition-all ease-in-out text-center' >Logout</p>
            </>
          )}
          
        </div>

      </div>
    </div>
  )
}

export default Navbar

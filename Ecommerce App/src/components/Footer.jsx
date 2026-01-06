import React from 'react'
import assets from '../assets/assests'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm sm:items-center sm:min-h-[220px]'>

        <div>
            <img src={assets.logo} className=' w-32 ' />
            <p className='2-full md:w-2/3 text-left text-slate-500'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et soluta eaque voluptates ex doloribus velit impedit exercitationem. Molestiae, ipsum. Nesciunt, non eius? Corrupti hic quibusdam quos itaque aliquam velit at.
            </p>
        </div>

        <div className='flex flex-col '>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 font-medium text-gray-600'>
                <li className='hover:text-slate-900 cursor-pointer'>Shop</li>
                <li className='hover:text-slate-900 cursor-pointer'>About Us</li>
                <li className='hover:text-slate-900 cursor-pointer'>Delivery</li>
                <li className='hover:text-slate-900 cursor-pointer'>Privacy Policy</li>
            </ul>
        </div>



    <div>
        <p className='text-xl font-medium mb-16'>GET IN TOUCH</p>
        <ul className='flex flex-col  font-medium gap-2 text-gray-600'>
            <li>0474747474</li>
            <li>Test@gmail.com</li>
        </ul>
    </div>
      </div>
        <div>
        <hr  className=' outline-none border-none bg-slate-100 h-px w-full'/>
            <p className='py-5 text-sm text-center '>Copyright 2025@ GalaxyDz.com - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer

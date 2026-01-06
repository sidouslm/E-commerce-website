import React from 'react'
import assets from '../assets/assests'

const Hero = () => {
    return (
        <div className='flex flex-col relative sm:flex-row border border-gray-400 overflow-hidden'>
            {/* Backdrop Blur Overlay */}
            <div className='absolute inset-0 backdrop-blur-sm pointer-events-none' style={{ backgroundColor: '#cbd5e130' }}></div>

            {/* Hero Left Section */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 relative z-3'>
                <div className='text-slate-600'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-0.5 bg-slate-800'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLER</p>
                    </div>
                    <h1 className=' text-3xl sm:py-3 lg:text-5xl leading-relaxed' style={{fontFamily: 'Bespoke Slab'}}>Latest Arrivales</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-px bg-slate-800'></p>
                    </div>
                </div>

            </div>

            {/* Hero Right Section */}
            <img src={`${assets.hero_img}`} className='w-full sm:w-1/2 h-64 sm:h-80 md:h-96 object-cover relative z-0' />
        </div>
    )
}

export default Hero

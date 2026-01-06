import React from 'react'
import Title from '../components/Title'
import assets from '../assets/assests.js'
import NewsLetterBox from '../components/NewsLetterBox.jsx'

const about = () => {
  return (
    <div className='animate-fadeIn'>
      <div className=' text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div> 
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] object-cover rounded-2xl' src={assets.AboutImg} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-500 font-light'>
        <p>Welcome to GalaxyDZ, your premier destination for luxury watches. We specialize in selling high-quality timepieces from top brands around the world.</p>
        <p>At GalaxyDZ, we are committed to providing exceptional customer service and ensuring that every watch meets the highest standards of craftsmanship and style.</p>
        <b className='text-slate-800 text-xl'>Our Mission</b>
        <p>Our mission at GalaxyDZ is to make luxury watches accessible to everyone, offering a curated selection of premium timepieces that combine timeless elegance with modern innovation.</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOUSE US'} />
      </div>
      <div className=' flex flex-col md:flex-row text-sm mb-20 '>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-400'>We ensure every product undergoes rigorous testing to meet the highest quality standards.</p>
        </div>
        <div className='border border-gray-300  ps-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinience</b>
          <p className='text-gray-400'>Enjoy easy online shopping with fast delivery and hassle-free returns.</p>
        </div>
        <div className='border border-gray-300  ps-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>exceptional customer service:</b>
          <p className='text-gray-400'>Our dedicated team is here to assist you with personalized support and quick resolutions.</p>
        </div>
      </div>

      <NewsLetterBox/>

    </div>
  )
}

export default about

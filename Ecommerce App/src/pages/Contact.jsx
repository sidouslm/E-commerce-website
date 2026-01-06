import React from 'react'
import Title from '../components/Title'
import assets from '../assets/assests'
import NewsLetterBox from '../components/NewsLetterBox'

const contact = () => {
  return (
    <div className='animate-fadeIn'>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] object-cover' src={assets.ContactImg} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-slate-600'>Our Store</p>
          <p className='text-slate-500'>23423 Ali-menjeli <br /> Constantine</p>
          <p className='text-slate-500'> Tel : 0474746746 <br /> Email : Test@gmail.com</p>
          <p className='font-medium text-xl text-slate-600'>Careers at Galaxy</p>
          <p className='text-slate-500'>Learn more about our teams and job openning.</p>
          <button className='border border-slate-900 px-8 py-4 text-sm hover:bg-slate-900 hover:text-slate-50 transition-all ease-in-out duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default contact

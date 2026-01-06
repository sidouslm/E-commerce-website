import React from 'react'
import Hero from '../components/Hero.jsx'
import LatestCollection from '../components/LatestCollection.jsx'
import BesteSeller from '../components/BesteSeller.jsx'
import OurPolicy from '../components/OurPolicy.jsx'
import NewsLetterBox from '../components/NewsLetterBox.jsx'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BesteSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home

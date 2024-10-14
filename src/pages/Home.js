import React from 'react'
import Banner from '../components/Banner/Banner'
import LatestCollections from '../components/Latest-collections/Latest-collections'
import BestSeller from '../components/BestSeller/BestSeller'
import Policy from '../components/OurPolicy/Policy'
import Newsletter from '../components/Newsletter/Newsletter'

const Home = () => {
  return (
    <div>
      <Banner/>
      <LatestCollections/>
      <BestSeller/>
      <Policy/>
      <Newsletter/>
    </div>
  )
}

export default Home

import React from 'react'
import About from '../../components/Home/About'
import Banner from '../../components/Home/Banner'
import Download from '../../components/Home/Download'
import Feature from '../../components/Home/Feature'
import How from '../../components/Home/How'
import Serviecs from '../../components/Home/Serviecs'

const Home = () => {
  return (
    <>
      <Banner/>
      <How/>
      <About/>
      <Serviecs/>
      <Feature/>
      <Download/>
    </>
  )
}

export default Home
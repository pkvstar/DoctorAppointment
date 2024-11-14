import React from 'react'
import Header from '../Components/Header'
import Speciality from '../Components/Speciality'
import TopDoctors from '../Components/TopDoctors'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
const Home = () => {
  return (
    <div>
       <Navbar />
        <Header />
        <Speciality />
        <TopDoctors />
        <Footer />
    </div>
  )
}

export default Home
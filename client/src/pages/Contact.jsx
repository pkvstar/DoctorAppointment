import React from 'react'
import Footer from '../Components/Footer'
import ContactUs from '../assets/ContactUs/Contact.jpg'
import Navbar from '../Components/Navbar'
const Contact = () => {
  return (
    <>
    <Navbar />
    <div className='min-h-[51.5vh] w-full max-md:px-10 px-40 font-Outfit'>
        <p className=' text-2xl py-2 px-3  uppercase text-center mb-5 font-semibold'>Contact us</p>
        <div className='max-md:flex-col w-full flex flex-row items-center gap-6'>
          <img src={ContactUs} className='max-md:w-full w-1/2 rounded-xl' />
          <div className='md:w-full w-1/2 h-full'>
            <h1 className=' text-xl font-medium mb-2'>Location</h1>
            <p className=' mb-5'>00000 Los Angeles <br/>
            XYZ Street 32 , California , USA</p>
            <h1 className='text-xl font-medium mb-2'>Phone No.</h1>
            <p className=' mb-5'>+1 123 456 7890</p>
            <h1 className='text-xl font-medium mb-2'>Email Id</h1>
            <p>healthlink@gmail.com</p>
          </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Contact
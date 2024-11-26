import React from 'react'
import Facebook from '../assets/SocialIcons/Facebook.png'
import Instagram from '../assets/SocialIcons/Instagram.png'
import linkedin from '../assets/SocialIcons/LinkedIn.png'
import Twitter from '../assets/SocialIcons/X.png'

const Upper = () => {
  return (
    <div className=' w-full min-h-[20vh] mt-10'>
      <div className='w-full flex md:flex-row flex-col mb-3'>
        <div className='w-full md:w-1/2 flex flex-col gap-3 pr-2 mb-3'>
          <h1 className=' text-2xl font-Poppins font-semibold'><span className=' text-red-700'>H</span>EALTH <span className=' text-red-700'>L</span>INK</h1>
          <p>Our mission is to simplify healthcare access by connecting patients with qualified doctors. We provide a seamless experience to manage your health needs, ensuring convenience, security, and care at every step.</p>
          <b>Your Health, Our Priority</b>
        </div>
        <div className='w-full md:w-1/2 flex flex-col gap-3 md:pl-[20%]'>
          <p className=' text-xl font-medium text-black'>GET IN TOUCH</p>
          <p>+91 1000100099</p>
          <p>healthlink@gmail.com</p>
          <div className=' flex gap-3'>
            <img className=' w-12 filter hover:scale-110' src={Facebook}/>
            <img className=' w-12 filter hover:scale-110' src={Instagram}/>
            <img className=' w-12 filter hover:scale-110' src={linkedin}/>
            <img className=' w-12 filter hover:scale-110' src={Twitter}/>
          </div>
        </div>
      </div>
      <hr className=' border-none outline-none h-[1px] bg-black m-auto'/>
      <div className='p-3 w-full flex items-center justify-center font-Poppins'>Copyright 2024 @HEALTHLINK - All Right Reserved</div>
    </div>
  )
}

export default Upper
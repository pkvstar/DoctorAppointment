import React from 'react'
import HeaderImage from '../assets/Header/headerImg.png'
import GroupProfiles from '../assets/Header/GroupProfiles.png'
const Header = () => {
  return (
    <div className='flex flex-col md:flex-row w-full h-auto md:h-[80vh] '>
    <div className='w-full md:w-1/2 pt-12 md:pt-24'>
        <div className='w-full flex flex-col gap-6 md:gap-12'>
            <h1 className='font-extrabold font-Poppins text-3xl md:text-5xl text-center md:text-left'>
                Your <span className='text-skyBlue'>Health</span>, Your Schedule : <span className='text-skyBlue'>Appointments</span> Made Easy!
            </h1>
            <div className='w-full flex flex-col md:flex-row gap-3 items-center md:items-start'>
                <img src={GroupProfiles} className='w-24 md:w-34' />
                <p className='font-Poppins text-center md:text-left px-4 md:px-0'>
                    Effortlessly explore our comprehensive directory of trusted doctors and book your appointment with ease.
                </p>
            </div>
            <a href="#speciality" className=' mb-5 self-center md:self-start px-4 py-2 bg-darkBlue text-white rounded-md'>
                Book appointment
            </a>
        </div>
    </div>
    <div className='w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0'>
        <div className='w-full flex justify-center md:justify-end'>
            <div className='w-40 md:w-full rounded-full relative overflow-hidden bg-darkBlue'>
                <img src={HeaderImage} className='w-52 md:w-[38vw]' />
            </div>
        </div>
    </div>
</div>

  )
}
{/* <div className='flex flex-col md:flex-row w-full h-[80vh] '>
        <div className=' w-full md:w-1/2 pt-24'>
            <div className='w-full flex gap-12 flex-col'>
                <h1 className=' font-extrabold font-Poppins text-5xl'>
                Your <span className=' text-skyBlue'>Health</span>, Your Schedule : <span className=' text-skyBlue'>Appointments</span> Made Easy!
                </h1>
                <div className='w-full flex flex-col md:flex-row gap-3 items-center'>
                    <img src={GroupProfiles} className='w-34' />
                    <p className=' font-Poppins'>Effortlessly explore our comprehensive directory of trusted doctors and book your appointment with ease.</p>
                </div>
                <button className='mb-5 md:self-start px-3 py-2 bg-darkBlue text-white rounded-md'>Book appointment</button>
            </div>
        </div>
        <div className=' w-1/2 flex justify-center items-center'>
            <div className='w-full rounded-full relative overflow-hidden bg-darkBlue'>
                <img src={HeaderImage} className='w-[38vw]' />
            </div>
        </div>
    </div> */}

export default Header
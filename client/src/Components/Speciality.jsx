import React from 'react'
import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assetData'

const Speciality = () => {
  return (
    <div id="speciality" className='h-auto mt-3 w-full flex flex-col gap-10 md:h-[50vh] justify-center items-center'>
    <h1 className='text-2xl md:text-3xl font-semibold text-center'>
        Search Doctor by <span className='text-skyBlue'>Speciality</span>
    </h1>
    <div className='w-full h-full flex flex-col md:flex-row items-center justify-center gap-10 max-xl:gap-5'>
        {specialityData.map((data, index) => {
            return (
                <Link key={index} onClick={()=>scrollTo(0,0)} to={`/doctors/${data.speciality}`} className=' flex flex-col items-center gap-3 flex-shrink-0 hover:translate-y-[-12px] transition-all duration-500'>
                    <img src={data.image} alt={data.speciality} className='w-24 max-xl:w-18' />
                    <h2 className='text-center text-lg'>{data.speciality}</h2>
                </Link>
            );
        })}
    </div>
</div>

  )
}
    // <div id="speciality" className='h-auto mt-3 w-full flex flex-col gap-10 md:h-[40vh] justify-center items-center'>
    //     <h1 className=' text-3xl font-semibold'>Search Doctor by <span className=' text-skyBlue'>Speciality</span></h1>
    //     <div className='flex-col w-full h-full flex items-center justify-center gap-14 md:flex-row'>
    //         {specialityData.map((data,index)=>{
    //             return <Link key={index} to={`/doctors/${data.speciality}`} className=' flex flex-col md:items-center'>
    //                 <img src={data.image} alt={data.speciality} />
    //                 <h2>{data.speciality}</h2>
    //             </Link>
    //         })}
    //     </div>
    // </div>

export default Speciality
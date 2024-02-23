import React from 'react'
import { Header } from './header'
import { Footer } from './footer'
import Profilelogo from "../assets/lapndesk.png"

export const Profile = () => {
  return (
    <div className='flex flex-col min-h-[100vh] w-[100%]'>
      <Header />
      <div className='text-black flex flex-col lg:pl-24 xl:pl-0 items-center mt-32'>
        <h1 className='text-4xl text-white'>Profile</h1>
        <div className=''>
          <div className='mt-10 grid  lg:grid-cols-3 text-lg  bg-[#ffffff] rounded-3xl'>
            <div className='w-[400px] h-[300px] p-5'>
              <div className='flex gap-16'>
                <img src={Profilelogo} className='w-[125px] h-[50px]' alt="lgoo"/>
              
              </div>
              <h1 className='mt-8 text-[#00203f] font-bold' >About</h1>
              <p className='mt-1 text-justify'>
              We are one of the upcoming retailers committed to carter the local market inside Chennai Aiming to become the most loved and trusted store for all IT Products like computer components, laptops, Branded computers, assembled computers, accessories, antivirus, ups, CCTV, Networking etc.
              </p>
            </div>
            <div className='w-[400px] h-[450px] lg:p-5 space-y-5'>
              <div className='mt-12 text-center space-y-10'>
                <div className='flex flex-col'>
                  <div className='space-y-1 '>
                    <h1 className='text-[#00203f] font-bold' >
                      Company
                    </h1>
                    <label>LAPNDESK NO: 84</label>
                    Medavakkam Main Road
                    Ullagaram,Chennai – 600091
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='space-y-2'>
                    <h1 className='text-[#00203f] font-bold' >
                      Website
                    </h1><div>
                    <a href='https://www.lapndesk.in/'>www.lapndesk.in</a></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-[400px] h-[300px] lg:p-5 space-y-5'>
              <div className='mt-12 text-center space-y-10'>
                <div className='flex flex-col'>
                  <div className='space-y-2 '>
                    <h1 className='text-[#00203f] font-bold' >
                      E-mail
                    </h1>
                    <h1>lapndesk.com@gmail.com</h1>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='space-y-2'>
                    <h1 className='text-[#00203f] font-bold' >
                      Phone
                    </h1>
                    <h1>+91-9841680079</h1>
                    <h1>+91-9841680080</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  )
}

import React from 'react'
import Footerlogo from "../assets/logo-white.svg"

export const Footer = () => {
  return (
    <div className='text-white text-sm p-10 flex mt-auto justify-center space-x-20'>
        <img src={Footerlogo} alt="footer-logo"/>
        <h1>© 2023 Paxel - All Rights Reserved</h1>
    </div>
  )
}

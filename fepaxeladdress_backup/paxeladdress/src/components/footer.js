import React from 'react'
import mannitlogo from "../assets/mannitlogo.png"
export const Footer = () => {
  return (
    <div className='text-white text-sm p-10 flex mt-auto justify-center space-x-20'>
        <img src={mannitlogo} alt="footer-logo"/>
        <h1>© 2023 Mannit - All Rights Reserved</h1>
    </div>
  )
}

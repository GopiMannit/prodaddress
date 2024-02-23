import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sonny from "../assets/lapndesk.png"
import UI from "../assets/location.png"
import GRAPHIC from "../assets/user.png"
import SOFTWARE from "../assets/clipboard.png"
import APPLICATION from "../assets/subscription.png"
import ServiceComponent from "./serviceComponent"
import { Header } from "./header"
import { Footer } from "./footer"
import bcpllogo from "../assets/bcpllogo.jpeg"
// import React, { useEffect, useState } from 'react';
// import randomColor from 'randomcolor';
// import BackgroundColor from "../BackgroundColor"
//import { Subscription } from "./subscription"
// import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate();
  useEffect(()=>{
    let username=sessionStorage.getItem('username');
    // console.log(username);
    if(username===''||username===null){
      navigate('/login');
    }
  },[navigate]);
  // const [backgroundColor, setBackgroundColor] = useState('');
  const companyname = sessionStorage.getItem('companyname');

  return (
    <div className={companyname==="PAXEL" ? 'bg-[#ffc107]' : 'bg-[#00203f]'}>
    <div className= " min-h-[100vh] flex flex-col" >
      <Header />
      <div>
      {companyname === "BCPL" ? (
  <div className="flex justify-center gap-24 items-center">
  <img src={bcpllogo} alt="bcpl"  className="mt-32 w-[1000px] h-[100px]" />
</div>
) : (
  <div className="flex justify-center gap-24 items-center">
  <img src={Sonny} alt="sonny" className="mt-32 w-[200px] h-[100px]" />
  <h1 className="mt-32 text-center text-[#ffffff] text-3xl sm:text-4xl font-semibold">PAXEL</h1>
</div>
  
      )}
        <div className="mt-24 grid sm:grid md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 place-items-center">
          <div><ServiceComponent title="PROFILE" icon={GRAPHIC} route={'/Profile'} /></div>
          <div><ServiceComponent title="ADDRESS" icon={UI} route={'/Address'} /></div>
          <div><ServiceComponent title="SUMMARY" icon={SOFTWARE} route={'/Summary'} /></div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  )
}







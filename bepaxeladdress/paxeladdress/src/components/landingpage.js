import React, { useEffect } from "react"
import Sonny from "../assets/lapndesk.png"
import UI from "../assets/location.png"
import GRAPHIC from "../assets/user.png"
import SOFTWARE from "../assets/clipboard.png"
import APPLICATION from "../assets/subscription.png"
import ServiceComponent from "./serviceComponent"
import { Header } from "./header"
import { Footer } from "./footer"
//import { Subscription } from "./subscription"
import { useNavigate } from "react-router-dom"
export default function Landing() {
   const navigate = useNavigate();
  useEffect(()=>{
    let username=sessionStorage.getItem('username');
    if(username===''||username===null){
      navigate('/login');
    }
  },[navigate]);
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Header/>
      <div className="">
        <div className="flex justify-center gap-24 items-center ">
        <img src={Sonny} alt="sonny" className="mt-32 w-[200px] h-[100px] "/>
        </div>
        <div className="mt-24 grid sm:grid md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 place-items-center">
          <div><ServiceComponent title="PROFILE" icon={GRAPHIC} route={'/Profile'}/></div>
          <div><ServiceComponent title="ADDRESS" icon={UI} route={'/Address'}/></div>
          <div><ServiceComponent title="SUMMARY" icon={SOFTWARE} route={'/Summary'}/></div>
         
        </div>
        </div>
        <Footer/>
    </div>
  )
}







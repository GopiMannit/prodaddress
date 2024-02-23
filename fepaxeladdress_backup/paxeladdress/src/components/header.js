import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from "../assets/logout.png"
import Language from "../assets/translate.png"
import Paxelhome from '../assets/lapndesk.png'
export const Header = () => {
    const navigate = useNavigate();
    const logout = () =>{navigate('/login')}
    const home=()=>{navigate('/');window.scrollTo(0, 0)}
  return (
    <div className=' bg-white flex justify-between text-2xl p-5 fixed w-[100%] h-[75px] top-0 z-10'>
        <button onClick={home}><img src={Paxelhome} className="w-[150px]" alt="homelogo"/></button>
        <div className='space-x-16'>
            <button>
            <img src={Language} alt="language" className='w-[35px] h-[35px] '/>
            </button>
            <button onClick={logout}>
                <img src={Logout} alt="logout" className='w-[35px] h-[35px] rounded-full'/>
            </button>
        </div>
    </div>
  )
}

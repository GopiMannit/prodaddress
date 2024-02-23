
import React, { useEffect, useState } from 'react';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Login() {

  const [username, usernameUpdate] = useState('');
  const [password, passwordUpdate] = useState('');

  useEffect(()=>{
    sessionStorage.clear()
  },[]);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("https://paxeladdressbe.paxel.co/user/" + username).then((res) => {
        return res.json();
      }).then((resp) => {
        // console.log(resp)
        if(Object.keys(resp).length===0){
          toast.error('Please enter  valid username');
        }
        else{
          if(resp.password===password){
            toast.success('Logged in');
            sessionStorage.setItem('username',username);
            navigate('/');
          }
          else{
            toast.error('Incorrect Password');
          }
        }
      }).catch((err) => {
        toast.error('Login Failed due to :' + err.message);
      })
    }
  }

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  }

  const navigate = useNavigate();
  // const navitodash = () => { navigate('/DashBoard') };
  const navitoforgot = () => { navigate('/ForgotPassword') };
  const navitoregister = () => { navigate('/Register') };

  return (
    <div className="bg-[#00203F] flex flex-col h-screen items-center justify-center">
      <div className="h-[450px] w-[330px] bg-white bg-opacity-10 rounded-2xl shadow-5xl border-r-0 border-b-0 border-opacity-30">
        <div className="flex flex-col items-center justify-center m-10">
          <div className="bg-[#808080] p-1 rounded-full">
            <div className="rounded-full ">
              <img className="h-[5rem] w-[5rem] rounded-full bg-blue-500" src={require('../assets/userimg.png')} alt="user" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-[30px]">
          <div>
            <form onSubmit={ProceedLogin} className="flex flex-col items-center justify evenly space-y-[25px] m-5">
              <input value={username} onChange={e => usernameUpdate(e.target.value)} type="text" placeholder="Email ID" className="w-[230px] text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0" />
              <input value={password} onChange={e => passwordUpdate(e.target.value)} type="password" placeholder="Password" className="w-[230px]  text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0" />
              <button className="text-[#00203F] font-bold  h-8 w-52 text-sm cursor-pointer  font-poppins rounded-xl px-5 py-1 bg-white bg-opacity-50 hover:bg-[#ADEFD1]" >
            LOGIN
          </button>
            </form>
          </div>
          <div className="flex flex-row space-x-[45px] ">

            <div className="flex flex-row space-x-[3px]">
              <input type="checkbox" />
              <p className="text-[#808080] text-sm">Remember me</p>
            </div>
           
          </div>
          
          <div className='flex flex-row space-x-[10px]'>
         
          </div>
        </div>
      </div>

    </div>
  );
}
export default Login;

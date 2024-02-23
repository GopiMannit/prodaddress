import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  // const tohome = () => { navigate('/DashBoard') };
  const options = [
    {
      value: "retailer",
      label: "Retailer",
    },
    {
      value: "distributor",
      label: "Distributor",
    },
    {
      value: "manufacturer",
      label: "Manufacturer",
    },

  ];

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [compname, compnamechange] = useState("");
  const [role, rolechange] = useState("");
  const [website, websitechange] = useState("");
  const [password, passwordchange] = useState("");


  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the value in ';
    if (id === null || id === '') {
      isproceed = false;
      errormessage += ' Username';
    }
    if (name === null || name === '') {
      isproceed = false;
      errormessage += ' Name';
    }
    if (compname === null || compname === '') {
      isproceed = false;
      errormessage += ' Company';
    }
    if (password === null || password === '') {
      isproceed = false;
      errormessage += ' Password';
    }
    if (!isproceed) {
      toast.warning(errormessage)
    }
    return isproceed;
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    let dobj = { id, name, compname, role, website, password };
    // console.log(dobj);
    if (IsValidate()) {
      fetch("https://paxeladdressbe.paxel.co/user", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(dobj)
      }).then((res) => {
        toast.success('Registered successfully.')
        navigate('/login');
      }).catch((err) => {
        toast.error('Failed :' + err.message);
      });
    }
  }

  return (
    <div className="bg-[#00203F] flex flex-col h-screen items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col h-[650px] w-[360px] items-center justify-center bg-white bg-opacity-10 rounded-3xl shadow-5xl border-r-0 border-b-0 border-opacity-30">
          <div className="flex flex-col items-center justify-center m-6 ">
            <div className=" p-1 rounded-full m-5">
              <div className="rounded-full m-1">
                <img className="h-[5.5rem] w-[5.5rem] rounded-full bg-blue-500" src={require('../assets/circle.png')} alt="user" />
              </div>
            </div>
            <div>
              <p className="text-xl text-white"> Business Account</p>
            </div>
          </div>
          <div className="flex flex-col space-y-[25px]">
            <input value={id} onChange={e => idchange(e.target.value)} type="text" placeholder="Enter username" className="p-1.5 text-[15px] w-64 text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0" />
            <input value={name} onChange={e => namechange(e.target.value)} type="text" placeholder="Enter your name" className="p-1.5 text-[15px] w-64 text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0" />
            <input value={compname} onChange={e => compnamechange(e.target.value)} type="text" placeholder="Company name" className="p-1.5 text-[15px] w-64 text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0" />
            <div>
              <select value={role} onChange={e => rolechange(e.target.value)} className="p-1.5 text-[15px] w-64 text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0 space-y-[5px]">
                {options.map((option) => (
                  <option value={option.value} className="bg-[#00203F]">{option.label}</option>
                ))}

              </select>
            </div>
            <input value={website} onChange={e => websitechange(e.target.value)} type="text" placeholder="Website" className="p-1.5 text-[15px] w-64 text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0" />
            <input value={password} onChange={e => passwordchange(e.target.value)} type="password" placeholder="Password" className="p-1.5 text-[15px] w-64 text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0" />
          </div>
          <div className="flex flex-row m-8 space-x-[5px]">
            <input type="checkbox" className="rounded-full" />
            <p className="text-white text-[13px]">Agree with</p>
            <button className="text-[#ADEFD1FF] text-[13px]">Terms&Conditions</button>
          </div>
          <div className="mb-10">
            <button className="text-[#00203F] font-bold  h-8 w-40 text-sm cursor-pointer font-poppins rounded-xl px-5 py-1 bg-white bg-opacity-50 hover:bg-[#ADEFD1] hover:bg-opacity-80" >
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Register;

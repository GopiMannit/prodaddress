import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Header } from './header';
import { Footer } from './footer';
export const Address = () => {

  const prefix = [
    {
      label:"Title",
      value:""
    },
    {
      label:"Mr",
      value:"Mr"
    },
  {
    value: "Mrs",
    label: "Mrs",
  },
  {
    value: "Dr",
    label: "Dr",
  },
  {
    value: "Shri",
    label: "Shri",
  }, 
  {
    value: "Miss",
    label: "Miss",
  }, 
  
];
const groupfix = [
  {
    label:"Select Relationship",
    value:""
  },
  {
    label:"Family",
    value:"Family"
  },
  {
    label:"Friend",
    value:"Friend"
  },
{
  value: "Customer",
  label: "Customer",
},
];
  const options = [
    {
      label: "Select country",
      value: "",
    },
    {
      value: "INDIA",
      label: "India",
    },
    {
      value: "CANADA",
      label: "Canada",
    },
  ];

  const [pre,prefixchange] = useState("");
  const [fullname, fullnamechange] = useState("");
  const [address1, address1change] = useState("");
  const [address2, address2change] = useState("");
  const [city, citychange] = useState("");
  const [region, regionchange] = useState("");
  const [zipcode, zipcodechange] = useState("");
  const [country, countrychange] = useState("");
  const [phone, phonechange] = useState("");
  const [phone1, phonechange1] = useState("");
  const [group,prefixgroup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const adddobj = { pre,fullname, address1, address2, city, region, zipcode, country, phone,phone1,group };
  
    // Check if the phone number already exists in the address list
    fetch("https://paxeladdressbe.paxel.co/address")
      .then((res) => res.json())
      .then((data) => {
        const phoneNumberExists = data.some((address) => address.phone === phone);
        if (phoneNumberExists) {
          toast.error('Phone number already exists in address list.');
        } else {
          // If phone number does not exist, add the new address
          fetch("http://localhost:8000/address", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(adddobj)
          })
            .then((res) => {
              toast.success('Address Added.');
              prefixchange("");
              fullnamechange("");
              address1change("");
              address2change("");
              citychange("");
              regionchange("");
              zipcodechange("");
              countrychange("");
              phonechange("");
              phonechange1("");
              prefixgroup("");
            })
            .catch((err) => {
              toast.error('Failed :' + err.message);
            });
        }
      })
      .catch((err) => {
        toast.error('Failed :' + err.message);
      });
  }
  
  return (

    <div className="bg-[#00203f] h-auto lg:h-screen ">
      <Header />
      <div className="flex justify-center pt-28">
        <p className=" text-3xl text-[#adefd1] text-center text-red">ADD ADDRESS</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="pt-16 flex flex-col items-center  justify-center lg:flex lg:flex-row lg:gap-20 ">
          <div className="space-y-5">
            <div className="flex  pb-3">
            <select value={pre} onChange={e => prefixchange(e.target.value)} required className="p-2 text-[16px] text-sm w-15 text-black focus:outline-none border-gray-400 border-r-3 border-t-3 border-l-3 space-y-[5px]">
                  {prefix.map((pref) => (
                    <option value={pref.value} className="bg-white" >{pref.label}</option>
                  ))}
                </select>
              <input value={fullname} onChange={e => fullnamechange(e.target.value)} required className="p-3 border-gray-400 border-2 h-10 w-56 " type="text" placeholder="Enter your full name" />
            </div>
            <div className="flex flex-col pb-3">
              <input value={address1} onChange={e => address1change(e.target.value)} required className="p-3 border-gray-400 border-2 h-10 w-72" type="text" placeholder="Addres Line1" />
            </div>
            <div className="flex flex-col pb-3">
              <input value={address2} onChange={e => address2change(e.target.value)} className="p-3 border-gray-400 border-2 h-10 w-72" type="text" placeholder="Address Line2" />
            </div>
            <div className="flex flex-col pb-3">
              <input value={city} onChange={e => citychange(e.target.value)} required className="p-3 border-gray-400 border-2 h-10 w-72" type="text" placeholder="Enter City" />
            </div>
            <div className="flex flex-col pb-3">
            <select value={group} onChange={e => prefixgroup(e.target.value)} required className="p-2 text-[16px] text-sm w-15 text-black focus:outline-none border-gray-400 border-r-3 border-t-3 border-l-3 space-y-[5px]">
                  {groupfix.map((group) => (
                    <option value={group.value} className="bg-white" >{group.label}</option>
                  ))}
                </select>
            </div>
          </div>
          <div className="pt-5 lg:pt-0 space-y-5">
            <div className="flex flex-col pb-3">
              <input value={region} onChange={e => regionchange(e.target.value)} required className="p-3 border-gray-400 border-2 h-10 w-72" type="text" placeholder="Enter State/ Region" />
            </div>
            <div className="flex flex-col pb-3">
              <input value={zipcode} maxLength={6} onChange={e => zipcodechange(e.target.value)} required className="p-3 border-gray-400 border-2 h-10 w-72" type="text" placeholder="Enter ZIP Code" />
            </div>
            <div className="flex flex-col pb-3">
              <div>
                <select value={country} onChange={e => countrychange(e.target.value)} required className="p-2 text-[16px] text-sm w-72 text-black focus:outline-none border-gray-400 border-r-3 border-t-3 border-l-3 space-y-[5px]">
                  {options.map((option) => (
                    <option value={option.value} className="bg-white" >{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col pb-3">
              <input value={phone} maxLength={11} onChange={e => phonechange(e.target.value)} required className="p-3 border-gray-400 border-2 h-10 w-72" type="text" placeholder="Enter the phone number" />
            </div>
            <div className="flex flex-col pb-3">
              <input value={phone1} maxLength={14} onChange={e => phonechange1(e.target.value)}  className="p-3 border-gray-400 border-2 h-10 w-72" type="text" placeholder="Enter the alternative number" />
            </div>
           
          </div>
        </div>
        <div className="flex mt-10 justify-center">
          <button className="p-3 text-center border-solid h-15 w-60 bg-[#adefd1] rounded-full">Add Address</button>
        </div>
      </form>

      <Footer />
    </div>

  )
}

import React,{useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import FG from "../assets/forgot-password.png"
const Forgot = () => {
    const navigate = useNavigate();
    const navitologin = () => {
        navigate('/')
    };
    const [inputValue, setInputValue] = useState('');
    const [passValue,setPassValue]=useState('');
    const [value,setValue] = useState([]);
    // const [data, setData] = useState(null);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassValue(event.target.value);
  };
  const verify = async (e) => {
    e.preventDefault();
        if (inputValue ==='' && passValue ==='') {
            toast.error('Please enter username and  password');
        }
        else if (passValue === '') {
            toast.error('Please enter password');
        } 
        else if (inputValue ==='') {
            toast.error('Please enter username');
        }
        else {
           await axios
             .get(`https://paxeladdressbe.paxel.co/user/${inputValue}`)
             .then((response) => {
                setValue(response.data) 
                // console.log(value);
             })
            .catch((err)=>{
                toast.warning('User Not Found');
            });   
           await axios 
            .patch(`https://paxeladdressbe.paxel.co/user/${inputValue}`, {
                
                password: passValue,

            })
            .then(() => {
                        toast.success("Password Changed Successfully");  
                })
            .catch()
         }

      
    };
    return (

        <div className='sm:flex sm:flex-row items-center justify-center sm:h-screen sm:space-x-48 sm:text-xl h-screen flex flex-col'>
            <div className='invisible lg:visible sm:visible'>
                <img src={FG} alt="forgotpassword" className='md:w-[300px] md:h-[300px] w-[0px] h-[0px] lg:w-[350px] lg:h-[350px]' />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col space-y-8 ">
                    <h1 className='text-[#ADEFD1] '>FORGOT YOUR PASSWORD?</h1>
                    <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Username" className="w-[300px] text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0" />
                    <input type="password" value={passValue} onChange={handlePassChange}placeholder="Reset Password" className="w-[300px] text-sm text-white bg-transparent focus:outline-none border border-r-0 border-t-0 border-l-0" />
                </div>
                <button className="text-[13px] text-[#00203f] bg-[#ADEFD1] mt-10 bg- h-10 w-72 sm:w-72 rounded-xl sm:p-1 p-2 " onClick={verify}>RESET PASSWORD</button>
                <div className="flex flex-row items-center justify-center">
                    <button className='text-[#ADEFD1] text-sm m-5' onClick={navitologin}>Back to signin</button>
                </div>
            </div>
        </div>
    )
}
export default Forgot;
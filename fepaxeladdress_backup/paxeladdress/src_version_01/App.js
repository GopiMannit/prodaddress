import React from 'react';
// import  {Header}  from './components/header';
import Register from './components/register';
import Login from './components/login';
import Forgot from './components/forgotpassword';
import Landing from './components/landingpage';
import { Subscription } from './components/subscription';
import { Profile } from './components/profile';
import Summary from './components/summary'
import { Address } from './components/address';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function App() {
  
  return (
        <>
        {/* <Header/> */}
        <ToastContainer></ToastContainer>
        <BrowserRouter>
        
          <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/Register" element={<Register/>} />
                <Route path="/ForgotPassword" element={<Forgot/>}/>
                <Route path="/" element={<Landing/>}/>
                <Route path="/Subscription" element={<Subscription/>}/>
                <Route path="/Profile" element={<Profile/>}/>
                <Route path="/Address" element={<Address/>}/>
                <Route path="/Summary" element={<Summary/>}/>
          </Routes>
        </BrowserRouter></>
  );
}
export default App;

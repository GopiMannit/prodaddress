import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
export const Subscription = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    let username=sessionStorage.getItem('username');
    // console.log(username);
    if(username===''||username===null){
      navigate('/login');
    }
  },[navigate]);

  // const navigate = useNavigate();
  const [selectedPack, setSelectedPack] = useState(null);
  const [subscriptionError, setSubscriptionError] = useState(null);

  const handlePaymentSuccess = async (token) => {
    try {
      const response = await axios.post('/api/subscriptions', {
        token: token.id,
        packId: selectedPack.id,
        email: token.email,
        name: token.card.name,
      });
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      setSubscriptionError('Failed to create subscription. Please try again later.');
    }
  };

  const packs = [
    {
      id: 'basic',
      name: 'Basic Pack',
      description: 'Get access to basic features for $10/month',
      price: 400, // price is in cents
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      description: 'Get access to premium features for $20/month',
      price: 500,
    },
    {
      id: 'ultimate',
      name: 'Ultimate Pack',
      description: 'Get access to all features for $30/month',
      price: 600,
    },
  ];
  const companyname = sessionStorage.getItem('companyname');
  return (
    <div className={companyname==="PAXEL" ? 'bg-[#ffc107]' : 'bg-[#00203f]'} >
    <div className='flex flex-col min-h-[100vh]'>
      <Header />
      <h1 className='mt-36 text-white text-3xl text-center'>Subscription Plans</h1>

      <div className='text-white mt-24 flex lg:flex-row sm:flex-col justify-around px-20'>
        <div className='w-[350px] h-[550px] flex flex-col items-center' key={packs[0].id} >
          <h1 className='w-[50%] h-[10%] text-3xl rounded-t-2xl bg-pink-600 text-center flex flex-col justify-center'>Basic</h1>
          <div className=' bg-white w-full h-full flex flex-col text-black items-center rounded-3xl text-center gap-10 hover:border-8 hover:border-pink-600'>
            <h1 className='text-2xl mt-10'>$ 99<br />monthly</h1>
            <p className='text-xl text-justify px-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className='text-xl text-justify px-10'>✅ Lorem ipsum dolor</p>
            <p className='text-xl text-justify px-10'>✅ Lorem ipsum dolor</p>
          </div>
          <stripe-buy-button
            buy-button-id="buy_btn_1MqWf4SFfgArvhIUaYs541nF"
            publishable-key="pk_test_51MpDzhSFfgArvhIUpVLWDAjh4IRaSSepideHNYxjgosLVRtakzxDjJkkZvyuNo43dOo3f9KiKuLiJSDtMJpTXMvQ00NV0So6nP"
          >
          </stripe-buy-button>
        </div>
        <div className='w-[350px] h-[600px] flex flex-col items-center' key={packs[1].id} >
          <h1 className='w-[50%] h-[10%] text-3xl rounded-t-2xl bg-indigo-700 text-center flex flex-col justify-center'>Pro</h1>
          <div className='bg-white w-full h-full flex flex-col text-black items-center rounded-3xl text-center gap-10 hover:border-8 hover:border-indigo-700'>
            <h1 className='text-2xl mt-10'>$ 129.99<br />monthly</h1>
            <p className='text-xl text-justify px-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className='text-xl text-justify px-10'>✅ Lorem ipsum dolor</p>
            <p className='text-xl text-justify px-10'>✅ Lorem ipsum dolor</p>
            <p className='text-xl text-justify px-10'>✅ Lorem ipsum dolor</p>
          </div>
          <stripe-buy-button
            buy-button-id="buy_btn_1MqWZFSFfgArvhIU9jkT4VkS"
            publishable-key="pk_test_51MpDzhSFfgArvhIUpVLWDAjh4IRaSSepideHNYxjgosLVRtakzxDjJkkZvyuNo43dOo3f9KiKuLiJSDtMJpTXMvQ00NV0So6nP"
          >
          </stripe-buy-button>
        </div>
        <div className='w-[350px] h-[700px] flex flex-col items-center' key={packs[2].id} >
          <h1 className='w-[50%] h-[10%] text-3xl rounded-t-2xl bg-amber-500 text-center flex flex-col justify-center'>Corp</h1>
          <div className='bg-white w-full h-full flex flex-col text-black items-center rounded-3xl text-center gap-10 hover:border-8 hover:border-amber-500'>
            <h1 className='text-2xl mt-10'>$ 159.99<br />monthly</h1>
            <p className='text-xl text-justify px-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className='text-xl text-justify px-10'>✅ Lorem ipsum dolor</p>
            <p className='text-xl text-justify px-10'>✅ Lorem ipsum dolor</p>
            <p className='text-xl text-justify px-10'>✅ Lorem ipsum dolor</p>
            <p className='text-xl text-justify px-10'>✅ Lorem ipsum dolor</p>
          </div>
          <stripe-buy-button
            buy-button-id="buy_btn_1MqVXWSFfgArvhIU8boz1Fhu"
            publishable-key="pk_test_51MpDzhSFfgArvhIUpVLWDAjh4IRaSSepideHNYxjgosLVRtakzxDjJkkZvyuNo43dOo3f9KiKuLiJSDtMJpTXMvQ00NV0So6nP"
          >
          </stripe-buy-button>
        </div>
        {selectedPack && (
          <StripeCheckout
            stripeKey="pk_test_51MpDzhSFfgArvhIUpVLWDAjh4IRaSSepideHNYxjgosLVRtakzxDjJkkZvyuNo43dOo3f9KiKuLiJSDtMJpTXMvQ00NV0So6nP"
            token={handlePaymentSuccess}
            amount={selectedPack.price}
            name={selectedPack.name}
            description={selectedPack.description}
          />
        )}
      </div>
      <Footer />
    </div></div>
  )
}

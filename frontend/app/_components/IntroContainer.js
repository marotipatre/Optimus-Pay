import React from 'react';
import './IntroContainer.css';
import Button from './Button';

function IntroContainer(){
    return(
        <div className='introContainer'>
            <img src='images/illustration-intro.png' alt='illustration-intro' className='w-2/3 h-80'/>
            <h1> <br/> <span className='text-red-600 font-bold'>Seamless Web3 Payments</span> && <br/> <span className='text-white-600 font-bold'>Empower Your Business </span></h1>
            <p> Elevate your business without the tech headache; our intuitive account abstraction and easy SDK integration make accepting crypto a breeze.</p>
            <Button text='Become a Web3 Merchant' url={"/auth"} /*=classSize='email-btn'*//>
        </div>
    );
}
export default IntroContainer;
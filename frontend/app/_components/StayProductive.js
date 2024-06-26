import React from 'react';
import './StayProductive.css';


function StayProductive(){
    return(
        <div className='contanier'>
            <div className='stayProductive'>
                <div className='stay-l'>
                    <img src='images/blockchain.svg' alt='illustration-stay-productive'/>
                </div>
                <div className='stay-r'>
                    <h1>Unleash the power of <span className='text-red-600'>Optimism</span> </h1>
                    <p>Join the future of payments effortlessly, as Optimus Pay brings the power of blockchain to your fingertips with fast and efficient Optimism blockchain network. Streamline transactions, boost customer trust, and let your business thrive in the world of decentralized commerce.</p>
                    <p> Discover the joy of frictionless transactions with Optimus Pay!</p>
                    <a target="_blank" href='https://github.com/Kali-Decoder/Optimus_Pay/blob/main/README.md'>See how Optimus Pay works </a>
                </div>
            </div>
        </div>
    );
}
export default StayProductive;
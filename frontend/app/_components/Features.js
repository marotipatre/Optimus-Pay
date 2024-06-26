import React from 'react';
import './Features.css';
import Feature from './Feature';

function Features(){
    return(
        <div className='features'>
            <div className='contanier'>
                <div className='features-flex'>
                    <Feature 
                    img='images/cryptowallet.svg'
                    head='Easy Smart Wallet Creation'
                    text='Seamlessly step into the world of Web3 with Optimus Pay – hassle-free wallet creation through account abstraction. Eexperience Gasless transactions with AA'
                    />
                    <Feature 
                    img='images/DeFi circle.svg'
                    head='Integrated DeFi Hub'
                    text='Unlock the power of DeFi within Optimus Pay! From staking to borrowing, enhance your stores liquidity and engage in P2P  transactions effortlessly'
                    />
                </div>
                <div className='features-flex mob-marg'>
                    <Feature 
                    img='images/store.svg'
                    head='Get Your Store Web3 Ready in Just One-Click'
                    text='Elevate your store to the future with Optimus Pays APIs and seamless SDK integration. Your store, Web3 ready, in just a few clicks!'
                    />
                    <Feature 
                    img='images/Dashboard.svg'
                    head='Seamless Dashboard'
                    text='keep track of your expenses inside Optimus Pay app, Stay in control and gain valuable insights into your financial journey'
                    />
                </div>
            </div>
        </div>
    );
}
export default Features;
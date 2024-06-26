import React from 'react';
import './Testimonials.css';
import Testimonial from './Testimonial';

function Testimonials(){
    return(
        <div className='contanier'>
            <div className='testimonials'>
                <Testimonial
                    text='Seamless Web3 payments intuitive account abstraction and easy SDK integration are transforming the business landscape.'
                    img='images/profile-1.jpg'
                    auth='Vitalik Buterin'
                    job='Founder Ethereum'
                />
                <Testimonial
                    text='The simplicity and effectiveness in account abstraction and SDK integration make it a strategic move for businesses in the digital era.'
                    img='images/profile-2.jpg'
                    auth='Satoshi Nakamoto'
                    job='Founder Bitcoin'
                />
                <Testimonial
                    text='Intuitive features and SDK capabilities empower businesses to effortlessly embrace the future of finance with Web3 payments.'
                    img='images/profile-1.jpg'
                    auth='Silvio Micali'
                    job='Founder Algorand'
                />
            </div>
        </div>
    );
}
export default Testimonials;
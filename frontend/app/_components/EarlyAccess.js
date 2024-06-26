import React from 'react';
import './EarlyAccess.css';
import Button from './Button';

function EarlyAccess(){
    return(
        <div className='earlyAccess'>
            <h2>Get in touch with us</h2>
            <p>Get dedicated support for SDK integration and if you have any questions, our support tram would be happy to help you.</p>
            <input type='text' placeholder='email@example.com'/>
            <Button text='Get Started' classSize='email-btn'/>
        </div>
    );
}
export default EarlyAccess;
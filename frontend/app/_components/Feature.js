import React from 'react';
import './Feature.css';

function Feature({img,head,text}){
    return(
        <div className='feature'>
            <div className='flex justify-center items-center'>
            <img src={img} className='h-40 w-40' alt='img'/>
            </div>
            <h2>{head}</h2>
            <p>{text}</p>
        </div>
    );
}
export default Feature;
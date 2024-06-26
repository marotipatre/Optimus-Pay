import React from 'react';
import './Intro.css';
import Navbar from './Navbar';
import IntroContainer from './IntroContainer';

function Intro(){
    return(
        <div className='contanier'>
            <Navbar show={true} />
            <IntroContainer />
        </div>
    );
}
export default Intro;
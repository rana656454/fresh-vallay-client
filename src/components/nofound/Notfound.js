import React from 'react';
import oppsImg from '../../images/oops.png'
import './notfound.css'

const Notfound = () => {
    return (
        <div className="nofound-container">
        <div>
            <img src={oppsImg} alt=""/>
        </div>
 <div className="text-details">
               <h1>404</h1>
            <h1>page not found</h1>
 </div>       
    
        </div>
    );
};

export default Notfound;<h1>page not found</h1>
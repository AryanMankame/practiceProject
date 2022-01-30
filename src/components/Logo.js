import Tilt from 'react-tilt';
import React from 'react';
import './Logo.css';
const Logo = () => {
    return(
        <Tilt className="logo Tilt ba br2 shadow-2" options={{ max : 25 , scale:1.1}} style = {{marginLeft:'30px'}}>
        <div className="logo Tilt-inner pa3"> <img className = "logo-img" src = "brain.png" alt = ""></img> </div>
        </Tilt>
    )
}
export default Logo;
import 'tachyons';
import React from 'react';
const Navigation = (props) => {
    return(
    <a onClick = {props.changeRoute} className = "flex justify-end items-center underline f4" style ={{paddingRight:20,cursor: "pointer"}}>Sign Out</a>
    );
}
export default Navigation;
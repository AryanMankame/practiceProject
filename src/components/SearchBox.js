import React from 'react';
import './SearchBox.css'
const SearchBox = ({onDataInput,onClickDetect}) => {
    return(
    <div className="search">
        <input type = "text" className = "inputbox" onChange = {onDataInput}></input>
        <button className = "br-pill" onClick = {onClickDetect}>Detect</button>
    </div>
    );
}
export default SearchBox;
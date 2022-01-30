import React from 'react';
import {useState} from 'react';
import './Signup.css'
function Register(props){
    const [username,setUsername] = useState('');
    const [useremail,setUseremail] = useState('');
    const [userpassword,setUserpassword] = useState('');
    const RegisterFunction = () => {
        console.log(username,useremail,userpassword);
        console.log('Fetching ...');
        fetch('http://localhost:3000/register',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                name:username,
                email:useremail,
                password:userpassword
            })
        })  .then(response => {
            console.log(response);
            return response.json();
        })
            .then(data => {
                console.log(data);
                if(data === 'register is also doing its work'){
                    props.changeRoute();
                }
                else{
                    console.log('An Error is bound to occur');
                }
            })
        
    }
    return(
        <div>
        <h1>Register</h1>
        <div id = 'form'>
        <input type="text" placeholder="Name" onChange = {event => setUsername(event.target.value)}></input>
        <input type="text" placeholder ="Email" onChange = {event => setUseremail(event.target.value)}></input>
        <input type="password" placeholder ="Password" onChange = {event => setUserpassword(event.target.value)}></input>
        <a onClick = {RegisterFunction}>Register</a>
        </div>
        </div>
    );
}
export default Register;
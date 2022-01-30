import React from 'react';
import {useState} from 'react';
import Register from './Register';
import './Signup.css'
function Signup(props){
    const [emailId,setEmailId] = useState('');
    const [password,setPassword] = useState('');
    const signInFunction = () => {
        console.log('Fetching ...');
        fetch('http://localhost:3000/signup',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email:emailId,
                password:password
            })
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(user => {
                console.log('the user is -> ',user);
                if(user.id){ // does the user exist? Did we receive a user with a property of id?
                    props.loadUser(user);
                    props.changeRouteHome();
                }   
        }).catch(err => console.log("An ERROR -> ",err));
        
    }
    return(
        <div>
        <h1>SignIn</h1>
        <div id = 'form'>
        <input onChange = {(event) => setEmailId(event.target.value)} type="text" placeholder ="Email"></input>
        <input onChange = {(event) => setPassword(event.target.value)} type="password" placeholder ="Password"></input>
        <a onClick = {signInFunction}>Sign In</a>
        <a onClick = {props.changeRouteRegister}>Register</a>
        </div>
        </div>
    );
}
export default Signup;
import './App.css';
import 'tachyons';
import Navigation from './components/Navigation.js';
import Logo from './components/Logo.js';
import React,{Component} from 'react';
import SearchBox from './components/SearchBox';
import Clarifai from 'clarifai';
import TextContent from './components/TextContent';
import FaceRecignition from './components/FaceRecognition';
import Signup from './components/Signup';
import Register from './components/Register';
import Rank from './components/Rank.js';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input:'',
      url: '',
      box:{},
      visible:'hidden',
      route:'signin',
      user:{
        id:'',
        name:'',
        email:'',
        password:'',
        entries:'',
        joined:''
      }
    }
  }
  loadUser = (data) => {
    this.setState({
      user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }
    })
  }
  calculateFace = (face) => {
    const height = Number(document.getElementsByClassName('img-set')[0].height);
    const width = Number(document.getElementsByClassName('img-set')[0].width);
    const ph = window.screen.width;
    console.log(height, width , ph);
    return {
      topRow:face.top_row*height,
      bottomRow:face.bottom_row*height,
      leftCol:face.left_col*width,
      rightCol:face.right_col*width,
      heightimg:height,
      widthimg:width,
    }
  }
  displayFaceBox = (box) => {
    this.setState({box:box});
    this.setState({visible:'visible'});
    console.log(box);
  }
  loadUser = (data) => {
    this.setState({
      user:{
        id:data.id,
        name:data.name,
        email:data.email,
        password:data.password,
        enteries:data.enteries,
        joined:data.joined
      }
    })
  }
  onClickDetect = () => {
    fetch('http://localhost:3000/image',{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
          input:this.state.url
      })
  }).then(response => response.json()).then(
      (response) => {
      console.log('response //>', response);
      this.displayFaceBox(this.calculateFace(response.outputs[0].data.regions[0].region_info.bounding_box));
    }
    ).catch(err => console.log('ERRORS FOUND HERE -> ',err));
    console.log(Clarifai);
  }
  onInput = (event) => {
    this.setState({input:event.target.value});
    this.setState({url:event.target.value});
    console.log(this.state.url);
  }
  changeRoute(route){
    this.setState({route:route});
  } 
  render(){
  return (
    <div className = "App">
      {
      this.state.route === 'signin'?
      <Signup loadUser = {this.loadUser} changeRouteRegister = {() => this.changeRoute('register')}
      changeRouteHome = {() => this.changeRoute('home')}
      /> :
      this.state.route === 'home' ?
      <div>
      <Navigation changeRoute = {() => this.changeRoute('signin')}/>
      <Logo />
      <TextContent name = "Aryan" rank = "6" />
      <SearchBox onDataInput={this.onInput} onClickDetect={this.onClickDetect}/>
      <FaceRecignition link = {this.state.url} box = {this.state.box} visibility = {this.state.visible}/>
      </div>:
      <>
      <Register changeRoute = {() => this.changeRoute('home')} />
      </>
      }
    </div>
  );
  }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/Logo';
import Rank from '../components/rank/Rank';
import ImageLinkForm from '../components/image-link-form/ImageLinkForm';
import FaceRecognition from '../components/face-recognition/FaceRecognition';
import SignIn from '../components/sign-in/SignIn';
import Register from '../components/register/Register';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: 'polygon'
    },
    size: {
      value: 5,
      random: true
    }
  }
}

const initialState = { 
  input: '',
  imgUrl: '',
  box: [],
  route: 'signin',
  isSignedIn : false,
  user: {
    id: '',
    email: '',
    name: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entries,
      joined: data.joined
    }});
  }

  calculateFaceLocation = (data) => {
    let box = [];
    data.outputs.forEach(output => {
      output.data.regions.forEach(region => {
        let clarifaiFace = region.region_info.bounding_box;
        let image = document.getElementById('inputImg');
        let width = Number(image.width);
        let height = Number(image.height);
        box.push( {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        } )
      })
    })
    return box;
  }

  displayFaceBox = (box) => {
    this.setState({ box }); //box: box from ES6
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    fetch('http://localhost:3001/imageURL', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then((response) => {
      if(response){
        fetch('http://localhost:3001/image', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if(route === 'signin'){
      this.setState({state: initialState});
    }else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render(){
    const { isSignedIn, imgUrl, box } = this.state;
    const { name, entries } = this.state.user;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { this.state.route === 'home' ?
          <div><Logo />
            <Rank name={name} entries={entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmit}
            />
            <FaceRecognition imgUrl={imgUrl} box={box} />
          </div>
          : (
            this.state.route === 'signin' ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;

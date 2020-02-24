import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import particlesjsConfig from './particlesjs-config.json';

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

const particlesConfig = particlesjsConfig;

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = ({ id, name, email, entries, joined }) => {
        this.setState({user: {
            id: id,
            name: name,
            email: email,
            entries: entries,
            joined: joined
        }})
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage')
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol:clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol:width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box });
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch('http://localhost:3000/image', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response) {
                fetch('http://localhost:3000/image', {
                    method: 'put',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                }) 
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, {entries: count}));
                    })
                    .catch(console.log);
            }
            this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if(route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    }
    
    render() {
        const { imageUrl, box, route, user } = this.state;
        
        return (
            <div className='App'>
                <Particles className='particles' params={particlesConfig} />
                { route === 'home' 
                    ? <div>
                        <Navigation onRouteChange={this.onRouteChange} />
                        <Logo />
                        <Rank name={user.name} entries={user.entries} />
                        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />                
                        <FaceRecognition box={box} imageUrl={imageUrl}/>               
                    </div>
                    : ( 
                        this.state.route === 'signin' 
                            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                    )
                }
            </div>
        );
    }   
}

export default App;
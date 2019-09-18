import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn){ 
      return (
        <div 
          className=""
          style={{ display: 'flex', justifyContent: 'flex-end'}}
        >
          <p
            className="f6 link hover-bg-purple ph3 pv2 mb2 dib white bg-dark-gray pointer"
            onClick={() => onRouteChange('signin')}
          >
              Logout
          </p>
        </div>
      )
    } else {
      return (
        <div 
          className="" 
          style={{ display: 'flex', justifyContent: 'flex-end'}}
        >
          <p
            className="f6 link hover-bg-purple ph3 pv2 mb2 dib white bg-dark-gray pointer"
            onClick={() => onRouteChange('signin')}
          >
              Sign In
          </p>
          <p
            className="f6 link hover-bg-purple ph3 pv2 mb2 dib white bg-dark-gray pointer"
            onClick={() => onRouteChange('register')}
          >
              Register
          </p>
        </div>
      )
    }
}  

export default Navigation;
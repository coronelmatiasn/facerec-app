import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange }) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end', padding: '0 10px'}}>
            <p onClick={() => onRouteChange('signin')} className='nav-signout grow'>Sign Out</p>
        </nav>
    );
}

export default Navigation;
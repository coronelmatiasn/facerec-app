import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.svg'

const Logo = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
            <Tilt className="Tilt" options={{ max : 45 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt='logo' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
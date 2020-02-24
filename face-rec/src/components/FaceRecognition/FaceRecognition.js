import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div style={{position: 'relative', padding: 'auto', width: '800px', margin: '20px auto 20px'}}>
            <img id='inputimage' src={imageUrl} alt='' style={{width: '100%', height: 'auto'}} />
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
    );
}

export default FaceRecognition;
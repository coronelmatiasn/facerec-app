import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p style={{textAlign: 'center'}} className='f3 white'>
                {`Detect faces in your pictures.`}
            </p>
            <div className='w-50 center pa4 br3 shadow-5' style={{display: 'flex', justifyContent: 'center'}}>
                <input  className='form-el f4 pa2 w-70' type='text' onChange={onInputChange} />
                <button className='form-el detect-btn w-30 grow f4 link ph3 pv2 dib' onClick={onSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;
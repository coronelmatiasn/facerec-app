import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
    return (
        <div className="rank-container">
            <div className='white f3'>
                {`${name}`}
            </div>
            <div className='white f1'>
                {`Rank #${entries}`}
            </div>
        </div>
    );
}

export default Rank;
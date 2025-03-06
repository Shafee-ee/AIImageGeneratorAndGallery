import React from 'react';
import './ImageGenerator.css'

const ImageGenerator = () => {
    return (
        <div className="container">
            <div className="left-section">
                <h4>AI image generator</h4>
                <input
                    type="text"
                    placeholder='Enter Prompt....'
                />
                <button>Generate</button>
            </div>
            <div className="right-section">
                <p>Generated iamge will appear here</p>
            </div>
        </div>
    );
};

export default ImageGenerator
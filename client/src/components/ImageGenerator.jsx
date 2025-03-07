import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageGenerator.css'
import Gallery from './Gallery.jsx'

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);



    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/images/generate', {
                prompt,
            });

            if (response.data.imageBase64) {
                setImageUrl(response.data.imageBase64);

                //save generated image to database

                await axios.post('http://localhost:5000/api/images/save', {
                    imageBase64: response.data.imageBase64,
                    prompt,
                });


            } else {
                console.error("no image URL received");
            }

            setPrompt('');

        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="container">
                <div className="left-section">
                    <h4>AI image generator</h4>
                    <input
                        type="text"
                        placeholder='Enter Prompt....'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button onClick={handleGenerate}>Generate</button>
                </div>
                <div className="right-section">
                    {loading ? <p>Generating image....</p> : imageUrl ? (
                        <img className="gen-images" src={imageUrl} alt="Generated" />
                    ) : (
                        <p>Image result displayed here</p>
                    )}


                </div>

            </div>
            <Gallery />
        </>
    );

}

export default ImageGenerator
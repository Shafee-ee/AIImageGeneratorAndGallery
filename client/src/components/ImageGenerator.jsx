import React from 'react';
import { useState, useEffect } from 'react';
import Gallery from './Gallery.jsx'
import './ImageGenerator.css'
import axiosInstance from '../api.js';

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);



    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            const response = await axiosInstance.post('/images/generate', {
                prompt,
            });

            if (response.data.imageBase64) {
                setImageUrl(response.data.imageBase64);

                //save generated image to database

                await axiosInstance.post('/images/save', {
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
            <div className="page">
                <div className="container">
                    <div className="prompt">

                        <input
                            type="text"
                            placeholder='Describe what you want to see with phrases and commas...'
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <button onClick={handleGenerate}>Generate</button>
                    </div>
                    <div className="display-image">
                        {loading ? <p>Generating image....</p> : imageUrl ? (
                            <img className="gen-images" src={imageUrl} alt="Generated" />
                        ) : (
                            <p>...YOUR IMAGE HERE...</p>
                        )}


                    </div>

                </div>
                <Gallery />
            </div>
        </>
    );

}

export default ImageGenerator
import React from 'react';
import { useState, useEffect } from 'react';
import Gallery from './Gallery.jsx'
import './ImageGenerator.css'
import axiosInstance from '../api.js';

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState(''); // traking the input
    const [imageUrl, setImageUrl] = useState('');//storing the generated image URL
    const [loading, setLoading] = useState(false); // Track loading state


    // function to generate image based on prompts 
    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            const response = await axiosInstance.post('/images/generate', {
                prompt,
            });

            if (response.data.imageBase64) {
                setImageUrl(response.data.imageBase64);


                // await axiosInstance.post('/images/save', {
                //     imageBase64: response.data.imageBase64,
                //     prompt,
                // });


            } else {
                console.error("no image URL received");
            }

            setPrompt('');// clear the prompt after generation

        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setLoading(false);
        }
    }

    // function to save image after generation

    const handleSaveImage = async () => {
        if (!imageUrl) return;

        try {
            await axiosInstance.post('/images/save', {
                imageBase64: imageUrl,
                prompt,
            })
            alert('Image saved successfully');

        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    //function to clear the current image
    const handleClearImage = () => {
        setImageUrl('');
    };



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
                        <button onClick={handleGenerate}>Generate Your Image</button>
                    </div>
                    <div className="display-image">
                        {loading ? <p>Generating image....</p> : imageUrl ? (
                            <img className="gen-images" src={imageUrl} alt="Generated" />
                        ) : (
                            <p>...YOUR IMAGE HERE...</p>
                        )}
                    </div>

                    {imageUrl && (
                        <div className="buttons">
                            <button onClick={handleSaveImage}>Save Image</button>
                            <button onClick={handleClearImage}>Clear Image</button>
                        </div>
                    )}

                </div>
                <Gallery />
            </div>
        </>
    );

}

export default ImageGenerator
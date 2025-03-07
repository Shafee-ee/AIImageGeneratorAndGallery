import express from 'express';
import axios from 'axios';
import Image from '../models/Image.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// Route for generating an image
router.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        // Make a request to Hugging Face API
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                },
                responseType: 'arraybuffer',//handles binary response
            }
        );

        //Convert binary image to base64 format
        const imageBase64 = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;

        res.status(200).json({ imageBase64 });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Error generating image' });
    }
});

// Route to save an image to the database
router.post('/save', async (req, res) => {
    const { imageBase64, prompt } = req.body;

    try {
        const newImage = new Image({
            imageUrl: imageBase64,
            prompt: prompt,
        });

        await newImage.save();

        res.status(201).json({ message: 'Image saved successfully', newImage });
    } catch (error) {
        console.error('Error saving image:', error);
        console.error('Error generating image:', error.response ? error.response.data : error.message);

        res.status(500).json({ error: 'Error saving image' });
    }
});

// Route to get all saved images
router.get('/saved', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching saved images:', error);
        res.status(500).json({ error: 'Error fetching saved images' });
    }
});

export default router;

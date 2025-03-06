import express from 'express';
import axios from 'axios';
import Image from '../models/Image.js'; // Assuming you have a model for saved images
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// Route to generate an image
router.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        // Make a request to Hugging Face API
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/<your_model>',
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                },
            }
        );

        const imageUrl = response.data.url; // Assuming the response contains a URL to the generated image

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Error generating image' });
    }
});

// Route to save an image to the database
router.post('/save', async (req, res) => {
    const { imageUrl, prompt } = req.body;

    try {
        const newImage = new Image({
            imageUrl: imageUrl,
            prompt: prompt,
        });

        await newImage.save();

        res.status(201).json({ message: 'Image saved successfully', newImage });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({ error: 'Error saving image' });
    }
});

// Route to get all saved images
router.get('/saved', async (req, res) => {
    try {
        const images = await Image.find(); // Assuming you're using MongoDB and Mongoose
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching saved images:', error);
        res.status(500).json({ error: 'Error fetching saved images' });
    }
});

export default router;

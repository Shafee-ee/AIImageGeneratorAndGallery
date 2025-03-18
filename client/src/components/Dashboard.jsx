import React, { useEffect, useState } from 'react';
import axiosInstance from '../api';


const DashBoard = () => {
    const [gallery, setGallery] = useState([]);

    //fetch User's gallery

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axiosInstance.get('/gallery');
                setGallery(response.data);
            } catch (error) {
                console.error('failed to fetch gallery:', error.message);
            }
        };
        fetchGallery();

    }, [])

    return (
        <div>
            <h2>Welcome to your DashBoard!</h2>
            <h3>Your Gallery:</h3>
            <div className='gallery'>


            </div>
            );  
};